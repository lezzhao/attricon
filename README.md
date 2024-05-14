# Attricon

Inspired by [unocss](https://unocss.dev/), Attricon is a util that allows you to use icons from [iconify](https://iconify.design/) in your project.

# Features

- #### support on demand
- #### support vite
- #### support all icon from [iconify](https://iconify.design/)

<br/>

## TODO
- #### support vite pack mode
- #### support custom icon
- #### publish packages

<br/>

<br/>

## Install

```bash
npm i @attricon/vite
```

<br/>

## Usage in vite

```ts
import { defineConfig } from 'vite'
import Attricon from '@attricon/vite'

export default defineConfig({
  plugins: [
    Attricon(),
  ],
})
```
