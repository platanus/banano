<script setup lang="ts">
import { ref } from 'vue';
import BnToggle from '../../src/components/BnToggle/BnToggle.vue';

const selected = ref(false);
</script>

# BnToggle

BnToggle is a wrapper for a `<input type="checkbox">` element, but with the appearance of a toggle switch.

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
