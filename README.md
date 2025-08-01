# vue-use-typechat
[![npm](https://img.shields.io/npm/v/vue-use-typechat.svg)](https://www.npmjs.com/package/vue-use-typechat)
>
A lightweight Vue 3 composable for type-safe AI integrations using Microsoft's TypeChat.

## What is vue-use-typechat?
`vue-use-typechat` is a small wrapper around Microsoft's TypeChat that makes it easy to use type-safe AI responses in Vue 3 applications.


## What is TypeChat?
[TypeChat](https://github.com/microsoft/TypeChat) is a library from Microsoft that uses TypeScript type definitions as schemas to make LLM responses safe and structured.  
It ensures that language learning models, such as ChatGPT, match your expected types by validating the JSON output against your schema.


## Prerequisites
- A Vue 3 project set up with Vite or a similar build tool (`npm create vue@latest`)
- Installed [TypeChat](https://www.npmjs.com/package/typechat) (`npm install typechat`)


## Installation
Install the package:

```bash
npm install vue-use-typechat
```


## Example Usage
> [!WARNING] 
> You must not use the default OpenAI/Azure `TypeChatLanguageModel` that are provided by TypeChat, as that will expose your API key to the frontend.
> 
> Rather, create your own model implementing the `TypeChatLanguageModel` interface that sends the request to your own backend, passes it to your preferred AI service, and returns the contents back to the frontend.


See the full example in `demo/Demo.vue`.  
A minimal example:

```ts
import { useTypeChat } from "vue-use-typechat"
import { createTypeScriptJsonValidator } from "typechat/ts"
import { createProxyOpenAILanguageModel } from "@/typechat/proxyLanguageModel"

import type { CustomerData } from "@/types/CustomerData"
import CustomerDataSchema from "@/types/CustomerData.ts?raw" // Using Vite, this loads the type as a string

const { prompt, output, error, processing } = useTypeChat({
    model: createProxyOpenAILanguageModel("gpt-4o"),
    validator: createTypeScriptJsonValidator<CustomerData>(CustomerDataSchema, "CustomerData")
})

const handleButtonClick = async () => {
    // Sends a prompt to our backend proxy, which will then send it to the AI service and return the result with the correct type
    await prompt("Give me a list of a few random customers with funny names")
    console.log(output.value)
}
```


## Author
Created by [Espen Steen](https://steen.cc) ([@ehs5](https://github.com/ehs5))

## License
MIT
A lightweight Vue 3 composable for type-safe AI integrations using Microsoft's TypeChat.


## What is vue-use-typechat?
`vue-use-typechat` is a small wrapper around Microsoft's TypeChat that makes it easy to use type-safe AI responses in Vue 3 applications.


## What is TypeChat?
[TypeChat](https://github.com/microsoft/TypeChat) is a library from Microsoft that uses TypeScript type definitions as schemas to make LLM responses safe and structured.  
It ensures that language learning models, such as ChatGPT, match your expected types by validating the JSON output against your schema.


## Prerequisites
- A Vue 3 project set up with Vite or a similar build tool (`npm create vue@latest`)
- Installed [TypeChat](https://www.npmjs.com/package/typechat) (`npm install typechat`)


## Installation
Install the package:

```bash
npm install vue-use-typechat
```


## Example Usage
> [!WARNING] 
> You must not use the default OpenAI/Azure `TypeChatLanguageModel` that are provided by TypeChat, as that will expose your API key to the frontend.
> 
> Rather, create your own model implementing the `TypeChatLanguageModel` interface that sends the request to your own backend, passes it to your preferred AI service, and returns the contents back to the frontend.


See the full example in `demo/Demo.vue`.  
A minimal example:

```ts
import { useTypeChat } from "vue-use-typechat"
import { createTypeScriptJsonValidator } from "typechat/ts"
import { createProxyOpenAILanguageModel } from "@/typechat/proxyLanguageModel"

import type { CustomerData } from "@/types/CustomerData"
import CustomerDataSchema from "@/types/CustomerData.ts?raw" // Using Vite, this loads the type as a string

const { prompt, output, error, processing } = useTypeChat({
    model: createProxyOpenAILanguageModel("gpt-4o"),
    validator: createTypeScriptJsonValidator<CustomerData>(CustomerDataSchema, "CustomerData")
})

const handleButtonClick = async () => {
    // Sends a prompt to our backend proxy, which will then send it to the AI service and return the result with the correct type
    await prompt("Give me a list of a few random customers with funny names")
    console.log(output.value)
}
```


## Author
Created by [Espen Steen](https://steen.cc) ([@ehs5](https://github.com/ehs5))

## License
MIT