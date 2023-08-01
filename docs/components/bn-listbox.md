<script setup lang="ts">
import { ref } from 'vue';
import BnListbox from '../../src/components/BnListbox/BnListbox.vue';

const selected = ref(undefined);
</script>

# BnListbox

BnListbox is a wrapper for a `<select>` element. It is built on top of [HeadlessUI's Listbox](https://headlessui.dev/vue/listbox) component.

## Basic Usage

TODO

## Input Attributes

TODO

## Vee-Validate

TODO

## Colors

TODO

## Slots

TODO

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
