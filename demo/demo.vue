<template>
  <div class="container">
    <header>
      <h1>vue-use-typechat demo</h1>
    </header>

    <main>
      <div class="input-group">
        <input v-model="promptText" placeholder="Enter a prompt..." />
        <button @click="handleButtonClick">Send Prompt</button>
      </div>

      <div v-if="processing">Processing...</div>

      <div v-if="output" class="output">
        <h3>Output</h3>
        <pre>{{ JSON.stringify(output, null, 2) }}</pre>
      </div>

      <div v-if="error" class="error">
        <h3>Error</h3>
        <pre>{{ JSON.stringify(error, null, 2) }}</pre>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
  // @ts-nocheck - Ignoring all TypeScript errors for demo purposes
  import { ref } from "vue"
  import { useTypeChat } from "vue-use-typechat"
  import { createTypeScriptJsonValidator } from "typechat/ts"
  import { createProxyOpenAILanguageModel } from "@/typechat/proxyLanguageModel"

  import type { CustomerData } from "@/types/CustomerData"
  import CustomerDataSchema from "@/types/CustomerData.ts?raw" // Using Vite, this loads the type as a string

  // Important: It is highly recommended to create your own proxy language model to send requests to your own backend, so you don't expose your API key to the frontend.
  const { prompt, output, error, processing } = useTypeChat({
    model: createProxyOpenAILanguageModel("gpt-4o"),
    validator: createTypeScriptJsonValidator<CustomerData>(CustomerDataSchema, "CustomerData")
  })

  const promptText = ref("Give me a list of a few random customers with funny names")

  const handleButtonClick = async () => {
    await prompt(promptText.value)
  }
</script>

<style scoped>
  .container {
    max-width: 700px;
    margin: 2rem auto;
    font-family: Arial, sans-serif;
    padding: 1rem;
  }

  .input-group {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  input {
    flex: 1;
    padding: 0.5rem;
    font-size: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
  }

  .output,
  .error {
    background: #f8f8f8;
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 4px;
    font-family: monospace;
  }

  .error {
    border: 1px solid red;
    background: #ffe5e5;
  }
</style>
