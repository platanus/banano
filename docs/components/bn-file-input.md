<script setup lang="ts">
import { ref } from 'vue';
import BnFileInput from '../../src/components/BnFileInput/BnFileInput.vue'
import { Form, ErrorMessage } from 'vee-validate';

const file = ref(undefined);
const fileList = ref(undefined);
const validate = ref(undefined);

const warningIcon = 'M11.9998 9.00006V12.7501M2.69653 16.1257C1.83114 17.6257 2.91371 19.5001 4.64544 19.5001H19.3541C21.0858 19.5001 22.1684 17.6257 21.303 16.1257L13.9487 3.37819C13.0828 1.87736 10.9167 1.87736 10.0509 3.37819L2.69653 16.1257ZM11.9998 15.7501H12.0073V15.7576H11.9998V15.7501Z';

function isRequired(val: File[] | File | undefined) {
  if (val === undefined || val.length === 0) {
    return 'This field is required';
  }

  return true;
}

const focused = ref(false);
const blurred = ref(false);

const validationSchema = {
  file: isRequired,
};
</script>

# BnFileInput

BnFileInput is a wrapper for `<input type="file"> ` elements, designed to work with `v-model` to simplify management. It returns a file list if it allows multiple files or a single file if it's not.

## Basic Usage

The only required prop for `BnFileInput` is `name`. The `name` prop is used to identify the input in the context of a `Form` or an `useForm`, or when submitting a form in the traditional way.

```html
<bn-file-input v-model="file" name="name" />
```
<code-preview>
  <bn-file-input v-model="file"  name="name" />
</code-preview>


## Input Attributes
The `BnFileInput` component inherits all attributes that a native `<input type="file">` element would accept but, since its appearance is customized, some attributes may not work as expected. Common attributes are `disabled` and `multiple`:

```html
<bn-file-input name="disabled" placeholder="Disabled" disabled />
<bn-file-input name="multiple" placeholder="Multiple" multiple />
```

<code-preview>
  <div class="grid gap-4">
    <bn-file-input name="disabled" placeholder="Disabled" disabled />
    <bn-file-input name="multiple" placeholder="Multiple" multiple />
  </div>
</code-preview>

## Variants

The `variant` prop can be used to change the appearance of the input. There are two variants included by default: `default` and `avatar`.

```html
<bn-file-input name="default" placeholder="Default" />
<bn-file-input name="avatar" variant="avatar" />
```

<code-preview>
  <div class="grid gap-4">
    <bn-file-input name="default" placeholder="Default" />
    <bn-file-input name="avatar" variant="avatar" />
  </div>
</code-preview>

### Default Appearance

The default appearance is a button with a text label. The `buttonText` prop can be used to change the text of the button. The `placeholder` prop can be used to change the text of the placeholder.

```html
<bn-file-input name="default" placeholder="Default" buttonText="Click me!" />
```

<code-preview>
  <bn-file-input name="default" placeholder="Default" buttonText="Click me!" />
</code-preview>

### Avatar

The `avatarShape` prop can be used to change the shape of the avatar. It can be `default` or `circle`.

```html
<bn-file-input name="default" variant="avatar" />
<bn-file-input name="circle" variant="avatar" avatar-shape="circle" />
```

<code-preview>
  <div class="grid gap-4">
    <bn-file-input name="default" variant="avatar" />
    <bn-file-input name="circle" variant="avatar" avatar-shape="circle" />
  </div>
</code-preview>

## Vee-Validate
BnFileInput works with vee-validate out of the box.

```vue
<script setup lang="ts">
import { Form } from 'vee-validate';
import isRequired from '../rules';

const validationSchema = {
  file: isRequired,
};
</script>

<template>
  <Form :validation-schema="validationSchema">
    <bn-file-input name="file"/>
  </Form>
</template>
```

<code-preview>
  <Form :validation-schema="validationSchema">
    <bn-file-input name="file"/>
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
  <bn-file-input
    v-model="validate"
    name="validation"
    :rules="isRequired"
  />
</template>
```

<code-preview>
  <bn-file-input
    v-model="validate"
    name="validation"
    :rules="isRequired"
  />
</code-preview>

## [TODO] Colors

You can change the color accent of the default variants of the file input using the `color` prop.

```html
  <bn-file-input name="input" color="lime" />
  <bn-file-input name="avatar" color="lime" variant="avatar" />
```

<code-preview>
  <div class="grid gap-4">
    <bn-file-input name="input" color="lime" />
    <bn-file-input name="avatar" color="lime" variant="avatar" />
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

### default

The `default` slot allows you to customize the appearance of the entire `BnFileInput` component. It includes the following slot props:

- `imagePreviewPath`: A function that takes a file as input and generates a URL to preview it
- `disabled`: A boolean indicating whether the input is disabled
- `openFileDialog`: A function that allows you to open the file upload window
- `removeFile`: A function that removes the provided file from the value. If the input allows a single file, it sets the value to `undefined`. If it allows multiple files, it removes the selected file from the list
- `addFile`: A function that adds a file. If the input allows a single file, it replaces the older file with the new one. If it allows multiple files, it adds the file to the list
- `value`: The input value. If it's a single file input, it returns a file object. If it's a multiple file input, it returns a file list

```html
<bn-file-input
  v-model="file"
  name="file"
>
  <template #default="{ imagePreviewPath, openFileDialog, value, addFile, removeFile, disabled }">
  <div class="w-full">
    <button
      v-if="value"
      class="mb-2 rounded border border-gray-300 py-1 px-2 text-sm shadow"
      @click="addFile()"
    >
      Add File
    </button>
    <button
      v-else
      class="mb-2 rounded border border-gray-300 py-1 px-2 text-sm shadow"
      @click="openFileDialog()"
    >
      Browse
    </button>
    <ul
      v-if="value"
      class="w-full"
    >
      <li
        class="flex w-full items-center border border-t-0 p-1 text-sm first:border-t"
      >
        <img
          :src="imagePreviewPath(value)"
          class="mr-2 h-6 w-6 rounded-full"
        >
        <span class="truncate">{{ value.name }}</span> ({{ value.size / 1000 }} KB)
        <button
          class="ml-auto"
          @click="removeFile(value)"
        >
          🗑
        </button>
      </li>
    </ul>
    </div>
  </template>
</bn-file-input>
```

<code-preview>
  <div class="grid col-span-1 gap-4">
    <bn-file-input
      v-model="file"
      name="file"
    >
      <template #default="{ imagePreviewPath, openFileDialog, value, addFile, removeFile, disabled }">
      <div class="w-full p-2">
        <button
          v-if="value"
          class="mb-2 rounded border border-gray-300 py-1 px-2 text-sm shadow"
          @click="addFile()"
        >
          Add File
        </button>
        <button
          v-else
          class="mb-2 rounded border border-gray-300 py-1 px-2 text-sm shadow"
          @click="openFileDialog()"
        >
          Browse
        </button>
        <ul
          v-if="value"
          class="w-full"
        >
          <li
            class="flex w-full items-center border border-t-0 p-1 text-sm first:border-t"
          >
            <img
              :src="imagePreviewPath(value)"
              class="mr-2 h-6 w-6 rounded-full"
            >
            <span class="truncate">{{ value.name }}</span> ({{ value.size / 1000 }} KB)
            <button
              class="ml-auto"
              @click="removeFile(value)"
            >
              🗑
            </button>
          </li>
        </ul>
        </div>
      </template>
    </bn-file-input>
  </div>
</code-preview>

### bottom

The `bottom` slot is used to add content below the input. Useful for hints or errors. Includes the following slot props:
- `errorMessage`: `vee-validate` property, if the input is invalid
- `valid`: `vee-validate` meta property
- `touched`: `vee-validate` meta property

```html
<bn-file-input
  v-model="file"
  name="required"
  :rules="isRequired"
>
  <template #bottom="{ errorMessage, valid, touched }">
    <div
      v-if="!valid && touched"
      class="mt-1 flex items-center text-rose-700"
    >
      <svg
        viewBox="0 0 24 24"
        class="fill-none mr-1 h-4 w-4 stroke-current stroke-2"
      >
        <path
          :d="warningIcon"
        />
      </svg>
      <span class="mr-1">
        {{ errorMessage }}
      </span>
      <svg
        viewBox="0 0 24 24"
        class="fill-none mr-1 h-4 w-4 stroke-current stroke-2"
      >
        <path
          :d="warningIcon"
        />
      </svg>
    </div>
  </template>
</bn-file-input>
```

<code-preview>
  <bn-file-input
    v-model="file"
    name="required"
    :rules="isRequired"
  >
    <template #bottom="{ errorMessage, valid, touched }">
      <div
        v-if="!valid && touched"
        class="mt-1 flex items-center text-rose-700"
      >
        <svg
          viewBox="0 0 24 24"
          class="fill-none mr-1 h-4 w-4 stroke-current stroke-2"
        >
          <path
            :d="warningIcon"
          />
        </svg>
        <span class="mr-1">
          {{ errorMessage }}
        </span>
        <svg
          viewBox="0 0 24 24"
          class="fill-none mr-1 h-4 w-4 stroke-current stroke-2"
        >
          <path
            :d="warningIcon"
          />
        </svg>
      </div>
    </template>
  </bn-file-input>
</code-preview>



## Customization

There are two ways to customize the appearance of the `BnFileInput` component:

### `classes` prop

Every component has a `classes` prop that will accept an object where each key corresponds to an internal element of the component. The value of each key will be the classes that will be applied to that element. For the values, you can use strings, objects or arrays, the same way it works with [Vue's class binding](https://vuejs.org/guide/essentials/class-and-style.html).

```html
<bn-file-input name="input" :classes="{ button: 'rounded-full' }" />
```

<code-preview>
  <div class="grid col-span-1 gap-4">
    <bn-file-input name="input" :classes="{ button: 'rounded-full' }" />
  </div>
</code-preview>

Default styles will still be applied, but the classes you provide will take precedence, so you can use this to override any existing style.

The available keys for this component are:

- `wrapper`: The element surrounding everything but the `bottom` slot
- `button`: The button that opens the file dialog
- `avatar`: The `<button>` element when using the `avatar` variant. It contains the preview when file is selected
- `label`: The element that contains either the placeholder or the file name and clear button
- `placeholder`: The element that contains the placeholder text when no file is selected
- `clear-button`: The button that clears the selected file(s)

### Theming

You can change the default appearance or even add variants by editing the configuration of the TailwindCSS plugin.

```javascript
  plugins: [
    require('@tailwindcss/forms'),
    require('@headlessui/tailwindcss'),
    banano.tailwindPlugin({
      theme: {
        BnInput: {
          '.bn-file-input': {
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

| Prop                    | Default     | Description |
| ----------------------- | ----------- | ----------- |
| `modelValue`            | `undefined` | `FileType` (`File[] \| File \| undefined`) <br><br> Initial value for the file input. Can be a single file, an array of files, or undefined. |
| `name`                  | --          | `string` <br><br> The name attribute of the file input. |
| `color`                 | `'banano-base'` | `string` <br><br> Determines the color of the file input. |
| `rules`                 | `undefined` | `RuleExpression<FileType>` <br><br> Validation rules for the checkbox. Usually a function that receives the value of the component and returns a boolean or a string if invalid. |
| `multiple`              | `false`     | `boolean` <br><br> If true, the file input will accept multiple files. |
| `disabled`              | `false`     | `boolean` <br><br> If true, the file input will be disabled. |
| `buttonText`            | `'Browse'`  | `string` <br><br> The text displayed on the file input button. |
| `placeholder`           | `'No file selected'` | `string` <br><br> The placeholder text for the file input when no file is selected. |
| `variant`               | `'default'` | `'default' \| 'avatar'` <br><br> The variant of the file input. |
| `avatarShape`           | `'default'` | `string` <br><br> The shape of the avatar in the file input. |
| `classes`               | `{}` | `object` <br><br> Allows to customize the classes of the file input's elements. |

### Events

| Event      | Payload | Description |
| ---------- | ------- | ----------- |
| `focus`    | `Event` | Emitted when the file input is focused. |
| `blur`     | `Event` | Emitted when the file input is blurred  |



### Slots

| Slot        | Slot Props | Description |
| ----------- | ---------- | ----------- |
| `default`   | <ul><li>`openFileDialog: Function`</li><li>`disabled: boolean`</li><li>`imagePreviewPath: Function`</li><li>`removeFile: Function`</li><li>`addFile: Function`</li><li>`value: FileType`</li></ul> | Use to input the content inside the file input wrapper. <br><br> `openFileDialog` function can be used to open the file dialog. <br> `disabled` is a boolean indicating whether the file input is disabled. <br> `imagePreviewPath` function can be used to get the preview path of a file. <br> `removeFile` function can be used to remove a file from the file input. <br> `addFile` function can be used to add a file to the file input. <br> `value` is the current value of the file input. |
| `bottom`    | <ul><li>`errorMessage: string`</li><li>`valid: boolean`</li><li>`touched: boolean`</li></ul> | Use to input the content at the bottom of the file input. <br><br> `errorMessage` is the validation error message. <br> `valid` is a boolean indicating whether the file input value is valid. <br> `touched` is a boolean indicating whether the file input has been touched. |
