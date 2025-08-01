import { ref, type Ref } from "vue"
import { createJsonTranslator, PromptSection, type Result, type TypeChatJsonTranslator, type TypeChatLanguageModel } from "typechat"
import { type TypeScriptJsonValidator } from "typechat/ts"

export interface UseTypeChatOptions<T extends object> {
  /**
   * WARNING: Using the default OpenAI/Azure models that are provided by TypeChat is not recommended, as that will expose your API key to the frontend.
   * Rather, create your own model implementing the TypeChatLanguageModel interface that sends the request to your own backend and passes it to your preferred AI service.
   *
   * Represents a AI language model that can complete prompts.
   * TypeChat uses an implementation of this interface to communicate with an AI service that can translate natural language requests to JSON instances according to a provided schema.
   */
  model: TypeChatLanguageModel

  /** Represents an object that can validate JSON strings according to a given TypeScript schema. */
  validator: TypeScriptJsonValidator<T>

  /**
   * Defaults to a TypeChatJsonTranslator with the model and validator provided.
   * Represents an object that can translate natural language requests in JSON objects of the given type.
   */
  translator?: TypeChatJsonTranslator<T>
}

/** A lightweight Vue.js composable for type-safe AI integrations using Microsoft's TypeChat. */
export function useTypeChat<T extends object>(options: UseTypeChatOptions<T>) {
  const model: TypeChatLanguageModel = options.model
  const validator: TypeScriptJsonValidator<T> = options.validator
  const translator: TypeChatJsonTranslator<T> = options.translator ?? createJsonTranslator<T>(model, validator)

  const output: Ref<T | null> = ref(null)
  const error: Ref<string | null> = ref(null)
  const processing: Ref<boolean> = ref(false)

  /**
   * Sends a prompt to the language model.
   * Both returns the specified type, and sets the returned type in the output ref.
   */
  async function prompt(promptText: string, promptPreamble?: string | PromptSection[]): Promise<T | null> {
    processing.value = true

    try {
      const result: Result<T> = await translator.translate(promptText, promptPreamble)
      if (!result.success) throw new Error(result.message)

      output.value = result.data
      error.value = null
      return result.data
    } catch (err) {
      output.value = null
      error.value = err instanceof Error ? err.message : String(err ?? "Unexpected error")
      console.error(err)
      return null
    } finally {
      processing.value = false
    }
  }

  return { prompt, output, error, processing }
}
