<script setup lang="ts">
import { ref } from 'vue';
import BnModal from '../../src/components/BnModal/BnModal.vue';
import BnBtn from '../../src/components/BnBtn/BnBtn.vue';

const open = ref(false);
const startOpened = ref(true);
</script>

# BnModal

BnModal is a wrapper for the [Dialog component from HeadlessUI](https://headlessui.dev/vue/listbox) component. It provides a simple way to create a modal with a header and a body.

## Basic Usage

```html
<bn-btn @click="open = true">
  Open modal
</bn-btn>
<bn-modal :open="open" @close="open = false">
  Modal Content
</bn-modal>
```

<iframe data-why class="w-full h-96 border">
  <bn-btn @click="open = true">
    Open modal
  </bn-btn>
  <bn-modal :open="open" @close="open = false">
    Modal Content
  </bn-modal>
</iframe>

## Title and Description

You can set the title and description of the modal by using the `title` and `description` props.

If the `title` prop is not set, the modal will not display a header.

The `description` prop is also optional and will display a description below the title, setting the `aria-describedby` attribute of the modal (more information in the [HeadlessUI Dialog documentation](https://headlessui.com/vue/dialog#dialog-description)). If your modal has no special html content, you should use this prop instead of adding a paragraph inside the modal.

```html
<bn-modal
  :open="true"
  title="Modal Title"
  description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
/>
```

<iframe data-why class="w-full h-96 border">
  <bn-modal
    :open="true"
    title="Modal Title"
    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
  />
</iframe>

## Closing the modal

The modal emits a `close` event by default when pressing the escape key, clicking the close button or clicking outside the modal. You can use this event to close the modal by setting the `open` prop to `false`.

```html
<bn-modal :open="open" @close="open = false">
  Modal Content
</bn-modal>
```

<iframe data-why class="w-full h-96 border">
  <bn-btn @click="startOpened = true">
    Open modal
  </bn-btn>
  <bn-modal :open="startOpened" @close="startOpened = false">
    Modal Content
  </bn-modal>
</iframe>

### Close button

If the `show-close-button` is set to `false`, the modal will not display a close button.

```html
<bn-modal :open="startOpened" @close="startOpened = false" :show-close-button="false">
  Modal Content
</bn-modal>
```

<iframe data-why class="w-full h-96 border">
  <bn-modal :open="startOpened" @close="startOpened = false" :show-close-button="false">
    Modal Content
  </bn-modal>
</iframe>

### Close on overlay click

If the `close-on-overlay-click` is set to `false`, clicking outside the modal will not close it.

```html
<bn-modal
  :open="startOpened"
  @close="startOpened = false"
  :show-close-button="false"
  :close-on-overlay-click="false"
>
  Modal Content
</bn-modal>
```

<iframe data-why class="w-full h-96 border">
  <bn-modal
    :open="startOpened"
    @close="startOpened = false"
    :show-close-button="false"
    :close-on-overlay-click="false"
  >
    Modal Content
  </bn-modal>
</iframe>

## Full screen on mobile

If the `full-screen-on-mobile` prop is set to `true`, the modal will take up the full screen on mobile devices.

```html
<bn-modal
  :open="true"
  full-screen-on-mobile
>
  Modal Content
</bn-modal>
```

<iframe data-why class="h-96 border max-w-xl w-full">
  <bn-modal
    :open="true"
    full-screen-on-mobile
  >
    Modal Content
  </bn-modal>
</iframe>

## Slots

`BnModal` provides a default slot for adding content to the modal.

```html
<bn-modal :open="true">
  <h2 class="text-lg text-bold mb-4">Modal Content</h2>
  
</bn-modal>
```

<iframe data-why class="w-full h-96 border">
  <bn-modal :open="true">
    <h2 class="text-lg text-bold mb-4">Modal Content</h2>
    
  </bn-modal>
</iframe>

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


## API Reference

### Props

| Prop                    | Default     | Description |
| ----------------------- | ----------- | ----------- |
| `open`                  | `false`     | `boolean` <br><br> Determines whether the modal is open or closed.  |
| `title`                 | `undefined` | `string`  <br><br> Sets the title of the modal. If present, the modal will have a header.  |
| `description`           | `undefined` | `string`  <br><br> Sets the description of the modal. It should be preferred if the modal will have no other custom content.  |
| `fullScreenOnMobile`    | `false`     | `boolean` <br><br> If true, the modal will be displayed in full screen on mobile devices. Otherwise, it'll show as a normal modal.  |
| `showCloseButton`       | `true`      | `boolean` <br><br> Determines whether to show the close button on the modal.  |
| `closeOnOverlayClick`   | `true`      | `boolean` <br><br> If true, clicking on the overlay will close the modal. Otherwise, it won't.  |
| `classes`               | `{}`        | `object`  <br><br> Allows to customize the classes of the modal's elements.  |

### Events

| Event      | Payload | Description |
| ---------- | ------- | ----------- |
| `close`    | `boolean` | Emitted when the modal is closed. The modal won't close unless you handle this event to set `open` to false.` |

### Slots

| Slot        | Slot Props | Description |
| ----------- | ---------- | ----------- |
| `default`   | --         | Use to input the modal content. Not necessary if you're using the `description` prop and don't need to use html tags. |