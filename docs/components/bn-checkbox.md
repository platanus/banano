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
</script>

# BnCheckbox

BnCheckbox is a wrapper for `<input type="checkbox">` elements.

## Basic Usage
```html
<bn-checkbox v-model="input" name="name">Name</bn-checkbox>
```
<code-preview>
  <bn-checkbox v-model="input"  name="name">Name</bn-checkbox>
</code-preview>

## Input Attributes
The underlying `input` receives all attributes passed to the component.

```html
<bn-checkbox name="disabled" disabled>
  Disabled Checkbox
</bn-checkbox>
```

<code-preview>
  <div class="grid col-span-1 gap-4">
    <bn-checkbox name="disabled" disabled>
    Disabled Checkbox</bn-checkbox>
  </div>
</code-preview>

## Vee-Validate
BnCheckbox works with vee-validate out of the box.

```vue
<script setup lang="ts">
import { Form } from 'vee-validate';
import isRequired from '../rules';
</script>

<template>
  <Form>
    <bn-checkbox
      v-model="validate"
      name="validation"
      :rules="isRequired"
    >
      You accept our terms and conditions
    </bn-checkbox>
    <ErrorMessage name="validation" class="text-red-600"/>
  </Form>
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

Including support for custom checked and unchecked values

```vue
<script setup lang="ts">
import { Form } from 'vee-validate';
</script>

<template>
  <Form v-slot="{ values }" :initial-values="{ values: 'UNSELECTED' }">
    {{ values }}
    <bn-checkbox
      name="values" value="SELECTED" uncheckedValue="UNSELECTED"
    >
      Custom value
    </bn-checkbox>
  </Form>
</template>
```

<code-preview>
  <Form v-slot="{ values }" :initial-values="{ values: 'UNSELECTED' }">
    {{ values }}
    <bn-checkbox
      v-model="validate"
      name="values"
      value="SELECTED"
      uncheckedValue="UNSELECTED"
    >
      Custom value
    </bn-checkbox>
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

### [TODO] Complex Style for Single Elements

If you want to modify the style of something else, you can use the `classes` prop, which will accept an object with each element that can be modified.

```html
<template>
  <bn-checkbox name="complex" :classes="{ label: 'bg-red-300 text-white' }">
    Hello
  </bn-checkbox>
</template>
```

<code-preview>
  <bn-checkbox name="complex" :classes="{ label: 'bg-red-300 text-white' }">
    Hello
  </bn-checkbox>
</code-preview>

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
