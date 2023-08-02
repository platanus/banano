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

</script>

# BnFileInput

BnFileInput is a wrapper for `<input type="file"> ` elements, designed to work with `v-model` to simplify management. It returns a file list if it allows multiple files or a single file if it's not.

## Basic Usage

```html
<bn-file-input v-model="file" name="name" />
```
<code-preview>
  <bn-file-input v-model="file"  name="name" />
</code-preview>


## Input Attributes
The underlying `input` element inherits common attributes from both `input` and `fileinput`, such as `disabled`, `multiple`, and `name`.

```html
<bn-file-input name="disabled" placeholder="Disabled" disabled />
<bn-file-input name="multiple" placeholder="Multiple" multiple />
```

<code-preview>
  <div class="grid col-span-1 gap-4">
    <bn-file-input name="disabled" placeholder="Disabled" disabled />
    <bn-file-input name="multiple" placeholder="Multiple" multiple />
  </div>
</code-preview>

It also supports the following props:

- `buttonText`: The text that will appear on the button to open the window for file upload.
- `placeholder`: The text for the placeholder in the default appearance.
- `variant`: Can be 'default' or 'avatar'. If it is 'default', it uses a button; if it is 'avatar', it displays a preview image as the input.
- `avatarShape`: It can take the values 'default' or 'circle' and determines the shape of the preview image.


## Vee-Validate
BnFileInput works with vee-validate out of the box.

```vue
<script setup lang="ts">
import { Form } from 'vee-validate';
import isRequired from '../rules';
</script>

<template>
  <Form>
    <bn-file-input
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
    <bn-file-input
      v-model="validate"
      name="validation"
      :rules="isRequired"
    />
    <ErrorMessage name="validation" class="text-red-600" />
  </Form>
</code-preview>

## [TODO] Colors

Due to the way Tailwind compiles classes, to avoid generating CSS for every single color it includes, Banano only has access to the colors you define in its configuration:

```javascript
// tailwind.config.js
{
...
  require('banano/tailwind')({ colors: ['lime']}),
}
```

```html
<bn-file-input name="input" color="lime" />
```
<code-preview>
  <div class="grid col-span-1 gap-4">
    <bn-file-input name="input" color="lime" />
  </div>
</code-preview>

## Slots

### default

This slot allows you to customize the entire `FileInput` appearance. It includes the following slot props:

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

Useful for hints or errors. Includes the following slot props:
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
  <div class="grid col-span-1 gap-4">
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
  </div>
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
