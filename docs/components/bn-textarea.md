<script setup lang="ts">
import { Form } from 'vee-validate';
import { ref } from 'vue';
import BnTextarea from '../../src/components/BnTextarea/BnTextarea.vue';

const value = ref('');
const filledExample = ref('Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.');
const validate = ref('');

function isRequired(val: string) {
  if (!val) {
    return 'This field is required';
  }

  return true;
}

const validationSchema = {
  textarea: isRequired,
};
</script>

# BnTextarea

BnTextarea is a wrapper for a `<textarea>` element.

## Basic Usage

The only required prop for `BnTextarea` is `name`. The `name` prop is used to identify the input in the context of a `Form` or an `useForm`, or when submitting a form in the traditional way.

```html
<bn-textarea v-model="value" name="name" />
```
<code-preview>
  <bn-textarea v-model="value"  name="name" />
</code-preview>

## Textarea Attributes

The `BnTextarea` component accepts all the attributes that a native `<textarea>` element accepts.

```html
<bn-textarea name="disabled" disabled placeholder="Disabled" />
<bn-textarea name="readonly" v-model="filledExample" readonly />
```

<code-preview>
  <div class="grid col-span-1 gap-4">
    <bn-textarea name="disabled" disabled placeholder="Disabled" />
    <bn-textarea name="readonly" v-model="filledExample" readonly />
  </div>
</code-preview>

## Vee-Validate

`BnTextarea` works with vee-validate out of the box.

```vue
<script setup lang="ts">
import { Form } from 'vee-validate';
import isRequired from '../rules';

const validationSchema = {
  textarea: isRequired,
};
</script>

<template>
  <Form :validation-schema="validationSchema">
    <bn-textarea
      name="textarea"
      placeholder="Click on me and then click out"
    />
  </Form>
</template>
```

<code-preview>
  <Form :validation-schema="validationSchema">
    <bn-textarea name="textarea" placeholder="Click on me and then click out" />
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
  <bn-textarea
    v-model="validate"
    name="validation"
    :rules="isRequired"
    placeholder="Click on me and then click out"
  />
</template>
```

<code-preview>
  <bn-textarea
    v-model="validate"
    name="validation"
    :rules="isRequired"
    placeholder="Click on me and then click out"
  />
</code-preview>

## Color

You can change the color accent of the textarea using the `color` prop.

```html
<bn-textarea name="value" color="lime" placeholder="Click on me" />
```

<code-preview>
  <div class="grid col-span-1 gap-4">
    <bn-textarea name="value" color="lime" placeholder="Click on me" />
  </div>
</code-preview>


::: tip
The `color` prop only supports the colors set when configuring the library. See [Colors](../colors.md) for more information.
:::


## Slots

### bottom

The `bottom` slot is used to add content below the input. Useful for hints or errors. Includes the following slot props:
- `errorMessage`: `vee-validate` property, if the input is invalid
- `valid`: `vee-validate` meta property
- `touched`: `vee-validate` meta property

```html
<bn-textarea
  v-model="value"
  name="value"
  :rules="(value) => value.length > 5 || 'Your text is too short'"
>
  <template #bottom="{ errorMessage, valid, touched }">
    <span
      class="mt-1 text-sm"
      :class="!valid && touched ? 'text-rose-700' : 'text-gray-500'"
    >
      <template v-if="touched && !valid">
        {{ errorMessage }}
      </template>
      <template v-else-if="valid">
        ✅
      </template>
    </span>
  </template>
</bn-textarea>
```

<code-preview>
  <bn-textarea
    v-model="value"
    name="value"
    :rules="(value) => value.length > 5 || 'Your text is too short'"
  >
    <template #bottom="{ errorMessage, valid, touched }">
      <span
        class="mt-1 text-sm"
        :class="!valid && touched ? 'text-rose-700' : 'text-gray-500'"
      >
      <template v-if="touched && !valid">
        {{ errorMessage }}
      </template>
      <template v-else-if="valid">
        ✅
      </template>
      </span>
    </template>
  </bn-textarea>
</code-preview>

## Customization

There are two ways to customize the appearance of the `BnTextarea` component:

### `classes` prop

Every component has a `classes` prop that will accept an object where each key corresponds to an internal element of the component. The value of each key will be the classes that will be applied to that element. For the values, you can use strings, objects or arrays, the same way it works with [Vue's class binding](https://vuejs.org/guide/essentials/class-and-style.html).

```html
<bn-textarea
  name="textarea"
  v-model="value"
  :classes="{ textarea: 'border-4 rounded-none' }"
/>
```

<code-preview>
  <bn-textarea
    name="textarea"
    v-model="value"
    :classes="{ textarea: 'border-4 rounded-none' }"
  />
</code-preview>

Default styles will still be applied, but the classes you provide will take precedence, so you can use this to override any existing style.

The available keys for this component are:

- `textarea`: The `<textarea>` element itself

### Theming

You can change the default appearance or even add variants by editing the configuration of the TailwindCSS plugin.

```javascript
  plugins: [
    require('@tailwindcss/forms'),
    require('@headlessui/tailwindcss'),
    banano.tailwindPlugin({
      theme: {
        BnTextarea: {
          '.bn-textarea': {
            '@apply text-green-600': {},
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
| `modelValue`            | `undefined` | `string \| number` <br><br> Initial value for the textarea input. Can be a string or a number. |
| `name`                  | --          | `string` <br><br> The name attribute of the textarea input. |
| `color`                 | `'banano-base'` | `string` <br><br> Determines the color of the textarea input. |
| `rules`                 | `undefined` | `RuleExpression<string \| number>` <br><br> Validation rules for the textarea. Usually a function that receives the value of the component and returns a boolean or a string if invalid. |
| `classes`               | `{}` | `object` <br><br> Allows to customize the classes of the textarea input's elements. |

### Events

This component does not emit any events, but it emits all the events from the underlying `<input>` element.

### Slots

| Slot        | Slot Props | Description |
| ----------- | ---------- | ----------- |
| `bottom`    | <ul><li>`errorMessage: string`</li><li>`valid: boolean`</li><li>`touched: boolean`</li></ul> | Use to input the content at the bottom of the textarea. <br><br> `errorMessage` is the validation error message. <br> `valid` is a boolean indicating whether the textarea value is valid. <br> `touched` is a boolean indicating whether the textarea has been touched. |