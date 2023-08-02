<script setup lang="ts">
import { ref } from 'vue';
import BnPagination from '../../src/components/BnPagination/BnPagination.vue';

const currentPage = ref(21);
</script>

# BnPagination

BnPagination is a wrapper for [HeadlessUI's Dialog](https://headlessui.dev/vue/dialog) component.

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

There are two ways to customize the appearance of the `BnPagination` component:

### `classes` prop

Every component has a `classes` prop that will accept an object where each key corresponds to an internal element of the component. The value of each key will be the classes that will be applied to that element. For the values, you can use strings, objects or arrays, the same way it works with [Vue's class binding](https://vuejs.org/guide/essentials/class-and-style.html).

```html
<bn-pagination
  :total-pages="50"
  :current-page="currentPage"
  :classes="{ list: 'justify-between flex-1' }"
  @page-changed="currentPage = $event"
/>
```

<code-preview>
  <bn-pagination
    :total-pages="50"
    :current-page="currentPage"
    :classes="{ list: 'justify-between flex-1' }"
    @page-changed="currentPage = $event"
  />
</code-preview>

Default styles will still be applied, but the classes you provide will take precedence, so you can use this to override any existing style.

The available keys for this component are:

- `list`: The `<ul>` element that wraps the pagination buttons.

### Theming

You can change the default appearance or even add variants by editing the configuration of the TailwindCSS plugin.

```javascript
  plugins: [
    require('@tailwindcss/forms'),
    require('@headlessui/tailwindcss'),
    banano.tailwindPlugin({
      theme: {
        BnPagination: {
          '.bn-pagination': {
            '@apply text-green-600': {},
          }
        }
      }
    }),
  ],
```

You can find more information about customizing the library in [Theme Customization](../theme-customization.md).
