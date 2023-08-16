<script setup lang="ts">
import { ref } from 'vue';
import BnInput from '../../src/components/BnInput/BnInput.vue'
import { Form } from 'vee-validate';

const input = ref('');
const validate = ref('');
const phoneNumber = ref('');
const email = ref('');

const letterIcon = 'M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z';

function isRequired(val: string) {
  if (!val) {
    return 'This field is required';
  }

  return true;
}

const validationSchema = {
  input: isRequired,
};
</script>

# BnInput

BnInput is a wrapper for `<input>` elements.

## Basic Usage

The only required prop for `BnInput` is `name`. The `name` prop is used to identify the input in the context of a `Form` or an `useForm`, or when submitting a form in the traditional way.

```html
<bn-input v-model="input" name="name" />
```
<code-preview>
  <bn-input v-model="input"  name="name" />
</code-preview>

## Input Attributes
The `BnInput` component accepts all the attributes that a native `<input>` element accepts, such as `disabled` and `multiple`.

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

`BnInput` works with vee-validate out of the box.

```vue
<script setup lang="ts">
import { Form } from 'vee-validate';
import isRequired from '../rules';

const validationSchema = {
  input: isRequired,
};
</script>

<template>
  <Form :validation-schema="validationSchema">
    <bn-input
      name="input"
      placeholder="Click on me and then click out"
    />
  </Form>
</template>
```

<code-preview>
  <Form :validation-schema="validationSchema">
    <bn-input
      name="input"
      placeholder="Click on me and then click out"
    />
  </Form>
</code-preview>

### Rules

If you want to validate a field without being in the context of a `Form` or an `useForm`, you can use the `rules` prop.

::: warning
The `rules` prop will be ignored if the component is inside a `Form` or an `useForm` context with a `validationSchema`.
:::

```vue
<script setup lang="ts">
import isRequired from '../rules';
</script>

<template>
  <bn-input
    v-model="validate"
    name="input"
    :rules="isRequired"
    placeholder="Click on me and then click out"
  />
</template>
```

<code-preview>
  <bn-input
    v-model="validate"
    name="input"
    :rules="isRequired"
    placeholder="Click on me and then click out"
  />
</code-preview>

## Color

You can change the color accent of the input using the `color` prop.

```html
<bn-input name="input" color="lime" placeholder="Click on me" />
```

<code-preview>
  <div class="grid col-span-1 gap-4">
    <bn-input name="input" color="lime" placeholder="Click on me" />
  </div>
</code-preview>

Note: the color prop only supports the included colors when configuring the library.

```javascript
// tailwind.config.js
{
...
  require('banano/tailwind')({ colors: ['lime']}),
}
```

## Slots

`BnInput` provides five slots: `prefix`, `suffix`, `icon-left`, `icon-right` and `bottom` for adding additional content to the input.

### prefix

The `prefix` slot is used to add content before the input, in a div with different styling than the input itself. Useful for adding a country code to a phone number input or a currency symbol to a price input.

```html
<bn-input
  v-model="phoneNumber"
  name="phone-number"
>
  <template #prefix>
	+56 9
  </template>
</bn-input>
```
<code-preview>
  <div class="grid col-span-1 gap-4">
    <bn-input
      v-model="phoneNumber"
      name="phone-number"
    >
      <template #prefix>
      +56 9
      </template>
    </bn-input>
  </div>
</code-preview>

### suffix

The `suffix` slot is used to add content after the input, in a div with different style than the input itself. Useful for adding a domain to an email input or a unit of measurement to a quantity input.

```html
<bn-input
  v-model="email"
  name="email"
>
  <template #suffix>
	@gmail.com
  </template>
</bn-input>
```
<code-preview>
  <div class="grid col-span-1 gap-4">
    <bn-input
      v-model="email"
      name="email"
    >
      <template #suffix>
      @gmail.com
      </template>
    </bn-input>
  </div>
</code-preview>

### icon-left

The `icon-left` slot is used to add an icon or small content before the input but inside the input container. Useful for adding a letter icon to an email input or a lock icon to a password input.

```html
<bn-input
  v-model="email"
  name="email"
>
  <template #icon-left>
    <svg>
      <path
        fill="currentColor"
        :d="letterIcon"
      >
    </svg>
  </template>
</bn-input>
```
<code-preview>
  <div class="grid col-span-1 gap-4">
    <bn-input
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
    </bn-input>
  </div>
</code-preview>

### icon-right

The `icon-right` slot is used to add an icon or small content after the input but inside the input container. Useful for adding a letter icon to an email input or a lock icon to a password input.

```html
<bn-input
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
</bn-input>
```
<code-preview>
  <div class="grid col-span-1 gap-4">
    <bn-input
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
    </bn-input>
  </div>
</code-preview>

### bottom

The `bottom` slot is used to add content below the input. Useful for hints or errors. Includes the following slot props:
- `errorMessage`: `vee-validate` property, if the input is invalid
- `valid`: `vee-validate` meta property
- `touched`: `vee-validate` meta property

```html
<bn-input
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
</bn-input>
```
<code-preview>
  <div class="grid col-span-1 gap-4">
    <bn-input
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
    </bn-input>
  </div>
</code-preview>

## Customization

There are two ways to customize the appearance of the `bn-input` component:

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
        bn-input: {
          '.bn-input': {
            '@apply bg-white relative w-full': {},
          }
        }
      }
    }),
  ],
```


You can find more information about customizing the library in [Theme Customization](../theme-customization.md).

## API Reference

### Props

| Prop                    | Default     | Description |
| ----------------------- | ----------- | ----------- |
| `modelValue`            | `undefined` | `string \| number`<br><br>Initial value for the input field. |
| `name`                  | --          | `string` <br><br> The name attribute of the input field. |
| `color`                 | `'banano-base'` | `string` <br><br> Determines the color of the input field. |
| `rules`                 | `undefined` | `RuleExpression<string \| number>` <br><br> Validation rules for the input field. Usually a function that receives the value of the component and returns a boolean or a string if invalid. |
| `classes`               | `{}`        | `object` <br><br> Allows to customize the classes of the input field's elements. |

### Events

This component does not emit any custom events, but it emits all the events from the underlying `<input>` element.

### Slots

| Slot        | Slot Props | Description |
| ----------- | ---------- | ----------- |
| `prefix`    | --         | Use to input the content at the start of the input field. |
| `icon-left` | --         | Use to input the content at the left of the input field, usually an icon. |
| `icon-right`| --         | Use to input the content at the right of the input field, usually an icon. |
| `suffix`    | --         | Use to input the content at the end of the input field. |
| `bottom`    | <ul><li>`errorMessage: string`</li><li>`valid: boolean`</li><li>`touched: boolean`</li></ul> | Use to input the content at the bottom of the input field. <br><br> `errorMessage` is the validation error message. <br> `valid` is a boolean indicating whether the input field value is valid. <br> `touched` is a boolean indicating whether the input field has been touched. |