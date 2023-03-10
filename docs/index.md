# Getting Started

## Introduction

Banano is a Vue 3 component library made with the express purpose of simplifying development by wrapping commonly used libraries in easily customizable components.

## Features
* A basic design, useful for quick prototypes and MVPs.
* Validation through vee-validate.
* A Tailwind plugin to make customization a breeze, both by adding classes directly to each component or by modifying its theme configuration.
* Components coded to be useful as-is but also simple to modify/copy to your own project if necessary.

## Installation

```bash
# Component Library
yarn add banano vee-validate

# If using the tailwind plugin
yarn add @headlessui/tailwindcss @tailwindcss/forms
```

```typescript
import { createApp } from 'vue';
import banano from 'banano';

const app = createApp({...});
app.use(banano);
app.mount();
```

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [
    require('banano').tailwindPlugin(),
    require('@tailwindcss/forms'),
    require('@headlessui/tailwindcss'),
  ],
};
```
