<script setup lang="ts">
import BnBtn from '../../src/components/BnBtn/BnBtn.vue';

function alert(text) {
  window.alert(text);
}
</script>

# BnBtn

BnBtn is a component that can act as a `button` or an `a` element.

## Basic Usage
```html
<bn-btn href="http://example.com" class="mr-2">Link</bn-btn>
<bn-btn @click="alert('Example')" variant="outline">Button</bn-btn>
```
<code-preview>
  <bn-btn href="http://example.com" class="mr-2">Link</bn-btn>
  <bn-btn @click="alert('Example')" variant="outline">Button</bn-btn>
</code-preview>

## Sizes

For smaller or larger buttons use the `size` prop. There are three sizes included by default: `sm`, `md` and `lg`.

```html
<bn-btn size="sm">sm</bn-btn>
<bn-btn size="md">md</bn-btn>
<bn-btn size="lg">lg</bn-btn>
```

<code-preview>
  <div class="flex gap-2 items-center">
    <bn-btn size="sm">sm</bn-btn>
    <bn-btn size="md">md</bn-btn>
    <bn-btn size="lg">lg</bn-btn>  
  </div>
</code-preview>

## Shapes

`BnBtn` has round corners by default, but you can change its shape using the `shape` prop. There are four different shapes included by default: `default`, `pill`, `rounded`, `circle`.

```html
<bn-btn>default</bn-btn>
<bn-btn shape="pill">pill</bn-btn>
<bn-btn shape="rounded">rounded</bn-btn>
<bn-btn shape="circle">⭕</bn-btn>
```

<code-preview>
  <div class="flex gap-2 items-center">
    <bn-btn>default</bn-btn>
    <bn-btn shape="pill">pill</bn-btn>
    <bn-btn shape="rounded">rounded</bn-btn>
    <bn-btn shape="circle">⭕</bn-btn>
  </div>
</code-preview>

## Variants

The `variant` prop is used to change the appearance of the button. There are three variants included by default: `default`, `outline`, and `no-border`.

```html
<bn-btn>default</bn-btn>
<bn-btn variant="outline">outline</bn-btn>
<bn-btn variant="no-border">no border</bn-btn>
```

<code-preview>
  <div class="flex gap-2 items-center">
    <bn-btn>default</bn-btn>
    <bn-btn variant="outline">outline</bn-btn>
    <bn-btn variant="no-border">no border</bn-btn>
  </div>
</code-preview>

## Loading State

The `loading` prop is used to indicate the loading state of the button. When `loading` is true, a spinner icon is displayed on the button.

```html
<bn-btn loading>loading</bn-btn>
```

<code-preview>
  <bn-btn loading>loading</bn-btn>
</code-preview>

## Loading with Content Replacement

If the `loadingReplacesContent` prop is set to true, the button's content will be replaced by the loading spinner when `loading` is true.

```html
<bn-btn loading loadingReplacesContent>loading with content replacement</bn-btn>
```

<code-preview>
  <bn-btn loading loadingReplacesContent>loading with content replacement</bn-btn>
</code-preview>

## Color

You can change the color of the button using the `color` prop.

```html
<bn-btn>base color</bn-btn>
<bn-btn color="lime">lime</bn-btn>
```

<code-preview>
  <div class="flex gap-2 items-center">
    <bn-btn>base color</bn-btn>
    <bn-btn color="lime">lime</bn-btn>
  </div>
</code-preview>

::: tip
The `color` prop only supports the colors set when configuring the library. See [Colors](../colors.md) for more information.
:::

## Slots

`BnBtn` provides two slots `icon-left` and `icon-right` for adding icons or any custom content to the left or right of the button text respectively.

### icon-left Slot

The `icon-left` slot is used to add an icon or any custom content to the left of the button text.

```html
<bn-btn>
  <template #icon-left>
    💖
  </template>
  Button
</bn-btn>
```

<code-preview>
  <bn-btn>
    <template #icon-left>
      💖
    </template>
    Button
  </bn-btn>
</code-preview>

### icon-right Slot

The `icon-right` slot is used to add an icon or any custom content to the right of the button text.

```html
<bn-btn>
  Button
  <template #icon-right>
    ✈️
  </template>
</bn-btn>
```

<code-preview>
  <bn-btn>
    Button
    <template #icon-right>
      ✈️
    </template>
  </bn-btn>
</code-preview>

### Loading State with Slots

If you're using slots and the loading state is active, the content inside the slots will be hidden and replaced with the loading spinner if `loadingReplacesContent` is set to true.

```html
<bn-btn loading loadingReplacesContent>
  <template #icon-left>
    💖 <!-- This will be hidden when loading -->
  </template>
  Loading button
  <template #icon-right>
    ✈️ <!-- This will be hidden when loading -->
  </template>
</bn-btn>
```

<code-preview>
  <bn-btn loading loadingReplacesContent>
    <template #icon-left>
      💖
    </template>
    Loading button
    <template #icon-right>
      ✈️ 
    </template>
  </bn-btn>
</code-preview>

### `classes` prop

Every component has a `classes` prop that will accept an object where each key corresponds to an internal element of the component. The value of each key will be the classes that will be applied to that element. For the values, you can use strings, objects or arrays, the same way it works with [Vue's class binding](https://vuejs.org/guide/essentials/class-and-style.html).

```html
<bn-btn
  class="bg-purple-600"
  :loading="true"
  :classes="{ loading: 'text-yellow-500' }"
>
  Name
</bn-btn>
```

<code-preview>
  <bn-btn
    class="bg-purple-600"
    :loading="true"
    :classes="{ loading: 'text-yellow-500' }"
  >
    Name
  </bn-btn>
</code-preview>

Default styles will still be applied, but the classes you provide will take precedence, so you can use this to override any existing style.

The available keys for this component are:

- `loading`: The loading indicator svg element

### Theming, Variants and other props

You can change the default appearance or even add variants by editing the configuration of the TailwindCSS plugin.

```javascript
  plugins: [
    require('@tailwindcss/forms'),
    require('@headlessui/tailwindcss'),
    banano.tailwindPlugin({
      theme: {
        BnBtn: {
          '.bn-btn': {
            '@apply bg-green-600': {},
          }
        }
      }
    }),
  ],
```

### Variants and other props

Variants, shapes and sizes are simple CSS classes, and you can add more by extending the TailwindCSS configuration.

For example, if you want to add an `xs` size to the button, you can do so by adding the following:

```javascript
plugins: [
  require('@tailwindcss/forms'),
  require('@headlessui/tailwindcss'),
  banano.tailwindPlugin({
    theme: {
      BnBtn: {
        '.bn-btn': {
          '&--sizes-xs': {
            '@apply text-xs': {},
            '@apply px-1 py-1': {},
          },
        }
      }
    }
  }),
],
```

You can find more information about customizing the library in [Theme Customization](../theme-customization.md).


## API Reference

### Props

| Prop                    | Default      | Description |
| ----------------------- | ------------ | ----------- |
| `as`                    | `button`     | `'a' \| 'button' \| string` <br><br> Determines the tag the component will use. It should be `a` or `button` but it can be any HTML tag. |
| `variant`               | `default`    | `'default' \| 'outline' \| 'no-border' \| string` <br><br> Specifies the variant of the button. |
| `size`                  | `md`         | `'sm' \| 'md' \| 'lg' \| string` <br><br> Specifies the size of the button. |
| `shape`                 | `default`    | `'default' \| 'pill' \| 'rounded' \| 'circle' \| string` <br><br> Specifies the shape of the button. |
| `color`                 | `banano-base`| `string` <br><br> Specifies the color of the button. |
| `loading`               | `false`      | `boolean` <br><br> Determines whether to show a loading spinner. |
| `loadingReplacesContent`| `false`      | `boolean` <br><br> If true, the loading spinner will replace the button content. |
| `classes`               | `{}`         | `object` <br><br> Allows you to customize the classes of the button's elements. |

### Slots

| Slot        | Slot Props | Description |
| ----------- | ---------- | ----------- |
| `icon-left` | -- | Slot for inputting an icon on the left side of the button text/content. |
| `icon-right`| -- | Slot for inputting an icon on the right side of the button text/content. |
| `default`   | -- | Slot for inputting the button text/content. |