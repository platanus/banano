<script setup lang="ts">
import { ref } from 'vue';
import BnCheckbox from '../../src/components/BnCheckbox/BnCheckbox.vue';
import { Form, ErrorMessage } from 'vee-validate';

const input = ref(false);
const selectedInput = ref(true);
const validate = ref(false);

const letterIcon = 'M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z';

function isRequired(val: string) {
  if (!val) {
    return 'This field is required';
  }

  return true;
}

const validationSchema = {
  terms: isRequired,
};
</script>

# BnCheckbox

BnCheckbox is a wrapper for `<input type="checkbox">` elements.

## Basic Usage
```html
<bn-checkbox v-model="input" name="name">Name</bn-checkbox>
```
<code-preview>
  <bn-checkbox v-model="input" name="name">Name</bn-checkbox>
  <bn-checkbox v-model="input" name="name">Name</bn-checkbox>
  <bn-checkbox v-model="input" name="name">Name</bn-checkbox>
</code-preview>

## Input Attributes
The `BnCheckbox` component accepts all the attributes that a native `<input>` element accepts.

```html
<bn-checkbox v-model="input" name="disabled" disabled>
  Disabled Checkbox
</bn-checkbox>
```

<code-preview>
  <bn-checkbox v-model="input" name="disabled" disabled>
    Disabled Checkbox
  </bn-checkbox>
</code-preview>


## Value and Unchecked Value

By default, the `BnCheckbox` component will return `true` when checked and `false` when unchecked. You can customize this behavior by using the `value` and `uncheckedValue` props.

```html
<bn-checkbox v-model="input" name="name" value="SELECTED" uncheckedValue="UNSELECTED">
  Custom value
</bn-checkbox>
```

<code-preview>
  <bn-checkbox v-model="input" name="name" value="SELECTED" uncheckedValue="UNSELECTED">
    Custom value
  </bn-checkbox>
  {{ input }}
</code-preview>

## Vee-Validate
BnCheckbox works with vee-validate out of the box.

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
    <bn-checkbox name="terms">
      You accept our terms and conditions
    </bn-checkbox>
    <ErrorMessage name="terms" class="text-red-600"/>
  </Form>
</template>
```

<code-preview>
  <Form :validation-schema="validationSchema">
    <bn-checkbox name="terms">
      You accept our terms and conditions
    </bn-checkbox>
    <ErrorMessage name="terms" class="text-red-600"/>
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
  <bn-checkbox
    v-model="validate"
    name="validation"
    :rules="isRequired"
  >
    You accept our terms and conditions
  </bn-checkbox>
  <ErrorMessage name="validation" class="text-red-600"/>
</template>
```

<code-preview>
  <Form>
    <bn-checkbox
      v-model="validate"
      name="validation"
      :rules="isRequired"
    >
      You accept our terms and conditions
    </bn-checkbox>
    <ErrorMessage name="validation" class="text-red-600" />
  </Form>
</code-preview>

## Colors

You can change the color accent of the checkbox using the `color` prop.

```html
  <bn-checkbox name="selectedInput" color="lime" v-model="selectedInput">
    Color Checkbox
  </bn-checkbox>
```
<code-preview>
  <div class="grid col-span-1 gap-4">
    <bn-checkbox name="selectedInput" color="lime" v-model="selectedInput">
      Color Checkbox
    </bn-checkbox>
  </div>
</code-preview>

::: tip
The `color` prop only supports the colors set when configuring the library. See [Colors](../colors.md) for more information.
:::

## Slots

### default (label)

The underlying checkbox is wrapped by a `label` and the default slot gives it its text.

```html
  <bn-checkbox v-model="input"  name="name">
    <span class="text-xl">Name</span>
  </bn-checkbox>
```
<code-preview>
  <div class="grid col-span-1 gap-4">
    <bn-checkbox v-model="input"  name="name">
      <span class="text-xl text-red-600">N</span>ame
    </bn-checkbox>
  </div>
</code-preview>

## Customization

There are two ways to customize the appearance of the `BnCheckbox` component:

### `classes` prop

Every component has a `classes` prop that will accept an object where each key corresponds to an internal element of the component. The value of each key will be the classes that will be applied to that element. For the values, you can use strings, objects or arrays, the same way it works with [Vue's class binding](https://vuejs.org/guide/essentials/class-and-style.html).

```html
<bn-checkbox :classes="{ input: 'rounded-full' }">
  Name
</bn-checkbox>
```

<code-preview>
  <bn-checkbox :classes="{ input: 'rounded-full' }">
    Name
  </bn-checkbox>
</code-preview>

Default styles will still be applied, but the classes you provide will take precedence, so you can use this to override any existing style.

The available keys for this component are:

- `input`: The `<input type="checkbox">` element itself

### Theming

You can change the default appearance or even add variants by editing the configuration of the TailwindCSS plugin.

```javascript
  plugins: [
    require('@tailwindcss/forms'),
    require('@headlessui/tailwindcss'),
    banano.tailwindPlugin({
      theme: {
        BnCheckbox: {
          '.bn-checkbox': {
            '@apply bg-green-600': {},
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
type ValueType = undefined | boolean | string | number | Record<string, unknown>;
```

| Prop            | Default     | Description |
| --------------- | ----------- | ----------- |
| `modelValue`    | `undefined` | `ValueType \| ValueType[]` <br><br> The model value of the checkbox. |
| `value`         | `true`      | `ValueType` <br><br> The value of the checkbox. |
| `name`          | --          | `string` <br><br> The name of the checkbox. |
| `color`         | `'banano-base'` | `string` <br><br> The color of the checkbox. |
| `rules`         | `undefined` | `RuleExpression<ValueType \| ValueType[]>` <br><br> Validation rules for the checkbox. Usually a function that receives the value of the component and returns a boolean or a string if invalid. |
| `disabled`      | `false`     | `boolean` <br><br> Determines if the checkbox is disabled. |
| `uncheckedValue`| `undefined` | `ValueType` <br><br> The value of the checkbox when it is unchecked. |
| `classes`       | `{}`| `object` <br><br> Allows to customize the classes of the component. |

### Events

This component does not emit any events, but it emits all the events from the underlying `<input>` element.

### Slots

| Slot        | Slot Props | Description |
| ----------- | ---------- | ----------- |
| `default`   | --         | Use to input the content within the checkbox label. |