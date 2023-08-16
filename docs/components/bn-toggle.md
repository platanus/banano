<script setup lang="ts">
import { ref } from 'vue';
import { Form } from 'vee-validate';
import BnToggle from '../../src/components/BnToggle/BnToggle.vue';

const checked = ref(false);
const validate = ref(false);
const selected = ref(false);

function isRequired(val: string) {
  if (!val) {
    return 'This field is required';
  }

  return true;
}

const validationSchema = {
  toggleMe: isRequired,
};
</script>

# BnToggle

`BnToggle` is a component that can be used as a UI switch or checkbox.

The only required prop for `BnToggle` is `name`. The `name` prop is used to identify the input in the context of a `Form` or an `useForm`, or when submitting a form in the traditional way.

## Basic Usage
```html
<bn-toggle v-model="checked" name="exampleToggle" />
```
<code-preview>
  <bn-toggle v-model="checked" name="exampleToggle" />
</code-preview>

## Colors

You can change the color accent of the toggle using the `color` prop.

```html
  <bn-toggle name="selected" color="lime" v-model="selected">
    Color Toggle
  </bn-toggle>
```
<code-preview>
  <div class="grid col-span-1 gap-4">
    <bn-toggle name="selected" color="lime" v-model="selected">
      Color Toggle
    </bn-toggle>
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

`BnToggle` provides a slot for adding labels or any custom content to the toggle.

```html
<bn-toggle v-model="checked" name="exampleToggle">
  Toggle me
</bn-toggle>
```

<code-preview>
  <bn-toggle v-model="checked" name="exampleToggle">
    Toggle me
  </bn-toggle>
</code-preview>

## Vee-Validate
`BnToggle` works with vee-validate out of the box.

```vue
<script setup lang="ts">
import { Form, ErrorMessage } from 'vee-validate';
import isRequired from '../rules';

const validationSchema = {
  terms: isRequired,
};
</script>

<template>
  <Form :validation-schema="validationSchema">
    <bn-toggle name="toggleMe">
      You accept our terms and conditions
    </bn-toggle>
  </Form>
</template>
```

<code-preview>
  <Form :validation-schema="validationSchema">
    <bn-toggle name="toggleMe">
      You accept our terms and conditions
    </bn-toggle>
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
  <bn-toggle
    v-model="validate"
    name="validate"
    :rules="isRequired"
  >
    You accept our terms and conditions
  </bn-toggle>
</template>
```

<code-preview>
  <Form>
    <bn-toggle
      v-model="validate"
      name="validate"
      :rules="isRequired"
    >
      You accept our terms and conditions
    </bn-toggle>
  </Form>
</code-preview>

## Customization

There are two ways to customize the appearance of the `BnToggle` component:

### `classes` prop

Every component has a `classes` prop that will accept an object where each key corresponds to an internal element of the component. The value of each key will be the classes that will be applied to that element. For the values, you can use strings, objects or arrays, the same way it works with [Vue's class binding](https://vuejs.org/guide/essentials/class-and-style.html).

```html
<bn-toggle
  name="toggle"
  v-model="selected"
  :value="true"
  :classes="{
    ball: ['rounded-none', { 'bg-yellow-500': selected }],
    track: ['rounded-none', { 'bg-purple-200': selected }]
  }"
>
  This is a toggle
</bn-toggle>
```

<code-preview>
  <bn-toggle
    name="toggle"
    v-model="selected"
    :value="true"
    :classes="{
      ball: ['rounded-none', { 'bg-yellow-500': selected }],
      track: ['h-3', { 'bg-purple-200': selected }]
    }"
  >
    This is a toggle
  </bn-toggle>
</code-preview>

Default styles will still be applied, but the classes you provide will take precedence, so you can use this to override any existing style.

The available keys for this component are:

- `ball`: The ball of the toggle
- `track`: The track of the toggle

### Theming

You can change the default appearance or even add variants by editing the configuration of the TailwindCSS plugin.

```javascript
  plugins: [
    require('@tailwindcss/forms'),
    require('@headlessui/tailwindcss'),
    banano.tailwindPlugin({
      theme: {
        BnToggle: {
          '.bn-toggle__track--focus-visible': {
            '@apply ring-green-600': {},
          }
        }
      }
    }),
  ],
```

You can find more information about customizing the library in [Theme Customization](../theme-customization.md).

## API Reference

### Props

```typescript
type ValueTypes = undefined | boolean | string | number | Record<string, unknown>;
```

| Prop                    | Default     | Description |
| ----------------------- | ----------- | ----------- |
| `modelValue`            | `undefined` | `ValueType \| ValueType[]` <br><br> Initial value for the toggle. It can be a single value, an array of values, or undefined. |
| `value`                 | `undefined` | `ValueType` <br><br> The value attribute of the checkbox input. |
| `name`                  | --          | `string` <br><br> The name attribute of the checkbox input. |
| `color`                 | `'banano-base'` | `string` <br><br> Determines the color of the toggle. |
| `rules`                 | `undefined` | `RuleExpression<ValueType \| ValueType[]>` <br><br> Validation rules for the toggle. Usually a function that receives the value of the component and returns a boolean or a string if invalid. |
| `disabled`              | `false`     | `boolean` <br><br> If true, the toggle input will be disabled. |
| `classes`               | `{}`        | `object` <br><br> Allows to customize the classes of the component. |

### Events

This component does not emit any events, but it emits all the events from the underlying `<input>` element.

### Slots

| Slot        | Slot Props | Description  |
| ----------- | ----------- | ----------- |
| `default`   | --          | Use to input the content inside the toggle label. |
| `bottom`    | <ul><li>`errorMessage: string`</li><li>`valid: boolean`</li><li>`touched: boolean`</li></ul> | Use to input the content at the bottom of the toggle. <br><br> `errorMessage` is the validation error message. <br> `valid` is a boolean indicating whether the toggle value is valid. <br> `touched` is a boolean indicating whether the toggle has been touched. |
