<script setup lang="ts">
import { ref } from 'vue';
import BnInput from '../../src/components/BnInput/BnInput.vue'
import { Form, ErrorMessage } from 'vee-validate';

const input = ref('');
const validate = ref('');

function isRequired(val: string) {
  if (!val) {
    return 'This field is required';
  }

  return true;
}
</script>

# BnInput

BnInput is a wrapper for `<input>` elements.

## Basic Usage
```html
<bn-input v-model="input" name="name" />
```
<code-preview>
  <bn-input v-model="input"  name="name" />
</code-preview>

## Input Attributes
The underlying `input` receives all attributes passed to the component.

```html
<bn-input name="disabled" disabled placeholder="Disabled">
<bn-input name="number" type="number" placeholder="Number" readonly>
<bn-input name="password" type="password" placeholder="Password">
```

<code-preview>
  <div class="grid col-span-1 gap-4">
    <bn-input name="disabled" disabled placeholder="Disabled" />
    <bn-input name="number" type="number" placeholder="Number" readonly />
    <bn-input name="password" type="password" placeholder="Password" />
  </div>
</code-preview>

## Vee-Validate
BnInput works with vee-validate out of the box.

```vue
<script setup lang="ts">
import { Form } from 'vee-validate';
import isRequired from '../rules';
</script>

<template>
  <Form>
    <BnInput
      v-model="validate"
      name="validation"
      :rules="isRequired"
    />
    <ErrorMessage name="validation" class="text-red-600"/>
  </Form>
</template>
```

<code-preview>
  <Form>
    <BnInput
      v-model="validate"
      name="validation"
      :rules="isRequired"
    />
    <ErrorMessage name="validation" class="text-red-600" />
  </Form>
</code-preview>

## Colors

Due to the way Tailwind compiles classes, to avoid generating CSS for every single color it includes, Banano only has access to the colors you define in its configuration:

```javascript
// tailwind.config.js
{
...
  require('banano').tailwindPlugin({ colors: ['orange']}),
}
```

```html
<bn-input name="input" color="orange" />
```
<code-preview>
  <div class="grid col-span-1 gap-4">
    <bn-input name="input" color="orange" />
  </div>
</code-preview>


## Prefix

```html
<BnInput
  v-model="phoneNumber"
  name="phone-number"
>
  <template #prefix>
	+56 9
  </template>
</BnInput>
```

### Suffix

```html
<BnInput
  v-model="email"
  name="email"
>
  <template #suffix>
	@gmail
  </template>
</BnInput>
```

## Customization
There are three ways to customize the appearance of the `BnInput` component:

### [TODO] Input Classes

If you only need to change the appearance of the `input` element you can use the prop `input-classes`:

```html
<bn-input name="name" input-classes="rounded-none" />
<bn-input name="pink" input-classes="bg-pink-300" />
```

<code-preview>
  <div class="grid col-span-1 gap-4">
    <bn-input name="name" input-classes="rounded-none" />
    <bn-input name="pink" input-classes="bg-pink-100" />
  </div>
</code-preview>

### [TODO] Complex Style for Single Elements

If you want to modify the style of something else, you can use the `classes` prop, which will accept an object with each element that can be modified.

```html
<template>
  <bn-input name="complex" :classes="{ prefix: 'bg-red-300 text-white' }">
    <slot #prefix>Hello</slot>
  </bn-input>
</template>
```

<code-preview>
  <bn-input name="complex" :classes="{ prefix: 'bg-red-300 text-white' }">
    <template #prefix>Hello</template>
  </bn-input>
</code-preview>

### Theming

You can change the default appearance or even add variants by editing the configuration of the TailwindCSS plugin.

```javascript
  plugins: [
    require('@tailwindcss/forms'),
    require('@headlessui/tailwindcss'),
    banano.tailwindPlugin({
      theme: {
        BnInput: {
          '.bn-input': {
            '@apply bg-white relative w-full': {},
          }
        }
      }
    }),
  ],
```


You can find more information about customizing the library in [Theme Customization](../theme-customization.md).
