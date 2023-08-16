<script setup lang="ts">
import { ref } from 'vue';
import { ErrorMessage, Form } from 'vee-validate';
import BnListbox from '../../src/components/BnListbox/BnListbox.vue';

const value = ref();
const selected = ref('Option 1');
const validate = ref(undefined);
const options = ['Option 1', 'Option 2', 'Option 3'];
const optionsWithEmpty = ['', 'Option 1', 'Option 2', 'Option 3'];
const multiple = ref([]);

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

# BnListbox

BnListbox is a wrapper for the  [Listbox component from HeadlessUI](https://headlessui.dev/vue/listbox). It is a form component that allows you to select one or more options from a list of options, like a `select` element.

## Basic Usage

The only required props are `name` and `options`. The `name` prop is used to identify the listbox in the form, and the `options` prop is an array of strings or objects that will be used to populate the listbox.

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { BnListbox } from 'banano';

const optionsWithEmpty = ['', 'Option 1', 'Option 2', 'Option 3']
const value = ref<string>();
</script>

<template>
  <bn-listbox
    v-model="value"
    :options="optionsWithEmpty"
    name="listbox"
  />
  <p>Selected value: {{ value }}</p>
</template>
```

<code-preview>
  <bn-listbox
    v-model="value"
    :options="optionsWithEmpty"
    name="listbox"
  />
  <p>Selected value: {{ value }}</p>
</code-preview>

## Input Attributes

While the component is not a native `select` element, it is built to mostly behave like one. The following props are supported: `disabled`, `placeholder` and `multiple`

```html
<bn-listbox
  name="disabled"
  disabled
  :options="options"
  placeholder="Disabled"
/>
```

<code-preview>
  <bn-listbox
    name="disabled"
    disabled
    :options="options"
    placeholder="Disabled"
  />
</code-preview>

### Multiple

When the `multiple` prop is set to `true`, the listbox will allow multiple options to be selected. The `v-model` prop (and the value of the field in vee-validate) will be an array of the selected options.

```html
<bn-listbox
  name="multiple"
  :options="options"
  placeholder="Multiple"
  v-model="multiple"
  multiple
/>
<p>Selected values: {{ multiple }}</p>
```

<code-preview>
  <bn-listbox
    name="multiple"
    :options="options"
    placeholder="Multiple"
    v-model="multiple"
    multiple
  />
  <p>Selected values: {{ multiple }}</p>
</code-preview>

## Vee-Validate
`BnListbox` works with vee-validate out of the box.

```vue
<script setup lang="ts">
import { Form } from 'vee-validate';
import isRequired from '../rules';

const validationSchema = {
  input: isRequired,
};
</script>

<template>
  <Form :validation-schema="validationSchema" v-slot="{ values }">
    <bn-listbox
      name="input"
      :options="optionsWithEmpty"
    />
    Selected value: {{ values.input }}
  </Form>
</template>
```

<code-preview>
  <Form :validation-schema="validationSchema" v-slot="{ values }">
    <bn-listbox
      name="input"
      :options="optionsWithEmpty"
      placeholder="Click on me"
    />
    Selected value: {{ values.input }}
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
  <bn-listbox
    :rules="isRequired"
    name="input"
    :options="optionsWithEmpty"
    placeholder="Click on me"
  />
</template>
```

<code-preview>
  <bn-listbox
    :rules="isRequired"
    name="input"
    :options="optionsWithEmpty"
    placeholder="Click on me"
  />
</code-preview>

## Color

You can change the color accent of the listbox using the `color` prop.

```html
<bn-listbox
  name="listbox"
  color="lime"
  :options="options"
  placeholder="Click me!"
/>
```

<code-preview>
  <bn-listbox
    name="listbox"
    color="lime"
    :options="options"
    placeholder="Click me!"
  />
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

`BnListbox` provides two slots: `selected-template` and `option-template` for adding additional content to the listbox.

### selected-template

The `selected-template` slot is used to customize how a selected option is displayed in the listbox button.

```html
<bn-listbox
  v-model="selected"
  name="selected-template-example"
  :options="options"
>
  <template #selected-template="{ value }">
    <span class="text-green-600 w-full text-left">
      🚩 {{ value }} 🚩
    </span>
  </template>
</bn-listbox>
```
<code-preview>
  <bn-listbox
    v-model="selected"
    name="selected-template-example"
    :options="options"
  >
    <template #selected-template="{ value }">
      <span class="text-green-600 w-full text-left">
        🚩 {{ value }} 🚩
      </span>
    </template>
  </bn-listbox>
</code-preview>

### option-template

The `option-template` slot is used to customize how options are displayed in the dropdown list.

```html
<bn-listbox
  placeholder="Click me!"
  name="option-template-example"
  :options="options"
>
  <template #option-template="{ option, selected }">
    <span class="text-white" :class="[selected === option ? 'bg-pink-600' : 'bg-blue-600']">
      {{ option }}
    </span>
  </template>
</bn-listbox>
```
<code-preview>
  <bn-listbox
    placeholder="Click me!"
    name="option-template-example"
    :options="options"
  >
    <template #option-template="{ option, selected }">
      <span class="text-white" :class="[selected ? 'bg-pink-600' : 'bg-blue-600']">
        {{ option }}
      </span>
    </template>
  </bn-listbox>
</code-preview>

## Customization

There are two ways to customize the appearance of the `BnListbox` component:

### `classes` prop

Every component has a `classes` prop that will accept an object where each key corresponds to an internal element of the component. The value of each key will be the classes that will be applied to that element. For the values, you can use strings, objects or arrays, the same way it works with [Vue's class binding](https://vuejs.org/guide/essentials/class-and-style.html).

```html
<bn-listbox
  v-model="selected"
  :classes="{ button: 'border-4 border-purple-500' }"
  :options="['Option 1', 'Option 2', 'Option 3']"
>
  Name
</bn-listbox>
```

<code-preview>
  <bn-listbox
    v-model="selected"
    name="classes"
    :classes="{ button: 'border-8 rounded-full' }"
    :options="['Option 1', 'Option 2', 'Option 3']"
  >
    Name
  </bn-listbox>
</code-preview>

Default styles will still be applied, but the classes you provide will take precedence, so you can use this to override any existing style.

The available keys for this component are:

- `button`: The `ListboxButton` element
- `tag`: Every individual tag when using the `multiple` prop
- `options`: The `ListboxOptions` element
- `option`: Every individual `ListboxOption` element

### Theming

You can change the default appearance or even add variants by editing the configuration of the TailwindCSS plugin.

```javascript
  plugins: [
    require('@tailwindcss/forms'),
    require('@headlessui/tailwindcss'),
    banano.tailwindPlugin({
      theme: {
        BnListbox: {
          '.bn-listbox': {
            '@apply bg-green-600': {},
          }
        }
      }
    }),
  ],
```

You can find more information about customizing the library in [Theme Customization](../theme-customization.md).

## API Reference

```typescript
type InputValue = number | string | Record<string, unknown> | undefined;
```

### Props

| Prop                    | Default     | Description |
| ----------------------- | ----------- | ----------- |
| `modelValue`            | `undefined` | `InputValue \| InputValue[]` <br><br> Initial value for the dropdown. Can be a single value, an array of values, or undefined. |
| `options`               | --          | `string[] \| Record<string, unknown>[]` <br><br> Options to be displayed in the dropdown. Can either be an array of strings or an array of objects. |
| `name`                  | --          | `string` <br><br> The name attribute of the dropdown. |
| `color`                 | `'banano-base'` | `string` <br><br> Determines the color of the dropdown. |
| `rules`                 | `undefined` | `RuleExpression<InputValue \| InputValue[]>` <br><br> Validation rules for the dropdown. Usually a function that receives the value of the component and returns a boolean or a string if invalid. |
| `disabled`              | `false`     | `boolean` <br><br> If true, the dropdown will be disabled. |
| `multiple`              | `false`     | `boolean` <br><br> If true, the dropdown will accept multiple values. |
| `trackBy`               | `undefined` | `string` <br><br> If using an array of objects for `options`, `trackBy` can be used to specify which property of the objects to use for comparison. |
| `optionLabel`           | `undefined` | `string` <br><br> If using an array of objects for `options`, `optionLabel` can be used to specify which property of the objects to use for displaying. |
| `keepObjectValue`       | `false`     | `boolean` <br><br> If true, when an object option is selected, the object itself will be emitted instead of just the `trackBy` value. |
| `placeholder`           | `undefined` | `string` <br><br> The placeholder text for the dropdown when no value is selected. |
| `classes`               | `{}` | `object` <br><br> Allows to customize the classes of the dropdown's elements. |

### Events

| Event      | Payload | Description |
| ---------- | ------- | ----------- |
| `focus`    | `Event` | Emitted when the dropdown is focused. |
| `blur`     | `Event` | Emitted when the dropdown is blurred. |
| `update:modelValue` | `InputValue \| InputValue[]` | Emitted when the selected value(s) in the dropdown changes. |

### Slots

| Slot        | Slot Props | Description |
| ----------- | ---------- | ----------- |
| `selected-template` | <ul><li>`value: InputValue`</li></ul> | Use to customize how the selected value is displayed in the unopened Listbox. `value` is the currently selected value. |
| `selected-multiple-template` | <ul><li>`value: InputValue`</li></ul> | Use to customize how the selected values are displayed when `multiple` is true. `value` is the currently selected value. |
| `option-template` | <ul><li>`option: string \| Record<string, unknown>`</li><li>`selected: boolean`</li></ul> | Use to customize how the options are displayed when the dropdown is opened. `option` is the current option, `selected` is a boolean indicating whether the option is currently selected. |
| `bottom` | <ul><li>`errorMessage: string`</li><li>`valid: boolean`</li><li>`touched: boolean`</li></ul> | Use to input the content at the bottom of the dropdown. `errorMessage` is the validation error message. `valid` is a boolean indicating whether the dropdown value is valid. `touched` is a boolean indicating whether the dropdown has been touched. |
