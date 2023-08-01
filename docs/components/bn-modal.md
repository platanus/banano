<script setup lang="ts">
import { ref } from 'vue';
import BnModal from '../../src/components/BnModal/BnModal.vue';
import BnBtn from '../../src/components/BnBtn/BnBtn.vue';

const open = ref(false);
</script>

# BnModal

BnModal is a wrapper for [HeadlessUI's Dialog](https://headlessui.dev/vue/dialog) component.

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

There are two ways to customize the appearance of the `BnModal` component:

### `classes` prop

Every component has a `classes` prop that will accept an object where each key corresponds to an internal element of the component. The value of each key will be the classes that will be applied to that element. For the values, you can use strings, objects or arrays, the same way it works with [Vue's class binding](https://vuejs.org/guide/essentials/class-and-style.html).

```html
<bn-btn @click="state.open = true">
  Open modal
</bn-btn>
<bn-modal
  title="This is the header"
  description="This is the body"
  :open="state.open"
  :classes="{ overlay: 'bg-yellow-500/30' }"
  @close="state.open = false"
>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismod interdum orci eget ornare.</p>
</bn-modal>
```

<code-preview>
  <bn-btn @click="open = true">
    Open modal
  </bn-btn>
  <bn-modal
    title="This is the header"
    description="This is the body"
    :open="open"
    :classes="{ overlay: 'bg-yellow-500/30' }"
    @close="open = false"
  >
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismod interdum orci eget ornare.</p>
  </bn-modal>
</code-preview>

Default styles will still be applied, but the classes you provide will take precedence, so you can use this to override any existing style.

The available keys for this component are:

- `overlay`: The overlay/backdrop rendered behind the modal
- `content`: The modal itself, a `DialogPanel` element
- `close-button`: The close button
- `header`: The `DialogTitle` element containing the title prop
- `body`: The `DialogDescription` element containing the description prop

### Theming

You can change the default appearance or even add variants by editing the configuration of the TailwindCSS plugin.

```javascript
  plugins: [
    require('@tailwindcss/forms'),
    require('@headlessui/tailwindcss'),
    banano.tailwindPlugin({
      theme: {
        BnModal: {
          '.bn-modal': {
            '@apply bg-green-600': {},
          }
        }
      }
    }),
  ],
```

You can find more information about customizing the library in [Theme Customization](../theme-customization.md).
