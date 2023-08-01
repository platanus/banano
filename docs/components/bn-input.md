<script setup lang="ts">
import { ref } from 'vue';
import BnInput from '../../src/components/BnInput/BnInput.vue'
import { Form, ErrorMessage } from 'vee-validate';

const input = ref('');
const validate = ref('');

const letterIcon = 'M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z';

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
  require('banano/tailwind')({ colors: ['lime']}),
}
```

```html
<bn-input name="input" color="lime" />
```
<code-preview>
  <div class="grid col-span-1 gap-4">
    <bn-input name="input" color="lime" />
  </div>
</code-preview>

## Slots

### prefix

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
<code-preview>
  <div class="grid col-span-1 gap-4">
    <BnInput
      v-model="phoneNumber"
      name="phone-number"
    >
      <template #prefix>
      +56 9
      </template>
    </BnInput>
  </div>
</code-preview>

### suffix

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
<code-preview>
  <div class="grid col-span-1 gap-4">
    <BnInput
      v-model="email"
      name="email"
    >
      <template #suffix>
      @gmail
      </template>
    </BnInput>
  </div>
</code-preview>

### icon-left

```html
<BnInput
  v-model="email"
  name="email"
>
  <template #icon-left>
    <svg
      viewBox="0 0 24 24"
      class="h-4 w-4 text-gray-400"
    >
      <path
        fill="currentColor"
        :d="letterIcon"
      />
    </svg>
  </template>
</BnInput>
```
<code-preview>
  <div class="grid col-span-1 gap-4">
    <BnInput
      v-model="email"
      name="email"
    >
      <template #icon-left>
        <svg
          viewBox="0 0 24 24"
          class="h-4 w-4 text-gray-400"
        >
          <path
            fill="currentColor"
            :d="letterIcon"
          />
        </svg>
      </template>
    </BnInput>
  </div>
</code-preview>

### icon-right

```html
<BnInput
  v-model="email"
  name="email"
>
  <template #icon-right>
    <svg
      viewBox="0 0 24 24"
      class="h-4 w-4 text-gray-400"
    >
      <path
        fill="currentColor"
        :d="letterIcon"
      />
    </svg>
  </template>
</BnInput>
```
<code-preview>
  <div class="grid col-span-1 gap-4">
    <BnInput
      v-model="email"
      name="email"
    >
      <template #icon-right>
        <svg
          viewBox="0 0 24 24"
          class="h-4 w-4 text-gray-400"
        >
          <path
            fill="currentColor"
            :d="letterIcon"
          />
        </svg>
      </template>
    </BnInput>
  </div>
</code-preview>

### bottom

Useful for hints or errors. Includes the following slot props:
- `errorMessage`: `vee-validate` property, if the input is invalid
- `valid`: `vee-validate` meta property
- `touched`: `vee-validate` meta property

```html
<BnInput
  v-model="email"
  name="email"
  :rules="isRequired"
>
  <template #bottom="{ errorMessage, valid, touched }">
    <span
      class="mt-1 text-sm"
      :class="!valid && touched ? 'text-rose-700' : 'text-gray-500'"
    >
      {{ !valid && touched ? errorMessage : "We'll never share your email with anyone else." }}
    </span>
  </template>
</BnInput>
```
<code-preview>
  <div class="grid col-span-1 gap-4">
    <BnInput
      v-model="email"
      name="email"
      :rules="isRequired"
    >
      <template #bottom="{ errorMessage, valid, touched }">
        <span
          class="mt-1 text-sm"
          :class="!valid && touched ? 'text-rose-700' : 'text-gray-500'"
        >
          {{ !valid && touched ? errorMessage : "We'll never share your email with anyone else." }}
        </span>
      </template>
    </BnInput>
  </div>
</code-preview>

## Customization

There are two ways to customize the appearance of the `BnInput` component:

### `classes` prop

Every component has a `classes` prop that will accept an object where each key corresponds to an internal element of the component. The value of each key will be the classes that will be applied to that element. For the values, you can use strings, objects or arrays, the same way it works with [Vue's class binding](https://vuejs.org/guide/essentials/class-and-style.html).

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

Default styles will still be applied, but the classes you provide will take precedence, so you can use this to override any existing style.

The available keys for this component are:
- `input`: The `<input>` element
- `prefix`: The element surrounding the `prefix` slot
- `suffix`: The element surrounding the `suffix` slot

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
