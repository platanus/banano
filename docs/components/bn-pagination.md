<script setup lang="ts">
import { ref } from 'vue';
import BnPagination from '../../src/components/BnPagination/BnPagination.vue';

const currentPage = ref(10);
function handlePageChange(newPage) {
  currentPage.value = newPage;
}
</script>

# BnPagination

BnPagination is a component to handle the pagination of content.

## Basic Usage

```html
<bn-pagination
  :total-pages="20"
  :current-page="currentPage"
  @page-changed="handlePageChange"
/>
```
<code-preview>
  <bn-pagination :total-pages="20" :current-page="currentPage" @page-changed="handlePageChange" />
</code-preview>


## Total Pages and Current Page

The pagination component receives two props to configure its behavior:

- `total-pages`: The total number of pages.
- `current-page`: The current page.

```html
<bn-pagination
  :total-pages="100"
  :current-page="30"
/>
```

<code-preview>
  <bn-pagination :total-pages="100" :current-page="30" />
</code-preview>


### Delta

The `delta` prop allows you to configure the number of pages to display on either side of the current page. The default value is `1`.

```html
<bn-pagination
  :total-pages="100"
  :current-page="30"
  :delta="3"
/>
```

<code-preview>
  <bn-pagination :total-pages="100" :current-page="30" :delta="3" />
</code-preview>

## Page Changed Event

When the user clicks a page button, the pagination component will emit the `page-changed` event with the number of the new page. You can handle this event to update the current page either by using a function or by assigning the value directly.

```javascript
const currentPage = ref(10);

function handlePageChange(newPage) {
  currentPage.value = newPage;
}
```

```html
<bn-pagination
  :total-pages="20"
  :current-page="currentPage"
  @page-changed="handlePageChange"
/>
```

<code-preview>
  <bn-pagination :total-pages="20" :current-page="currentPage" @page-changed="handlePageChange" />
</code-preview>

```html
<bn-pagination
  :total-pages="20"
  :current-page="currentPage"
  @page-changed="currentPage = $event"
/>
```

<code-preview>
  <bn-pagination :total-pages="20" :current-page="currentPage" @page-changed="currentPage = $event" />
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
<bn-pagination
  :total-pages="20"
  :current-page="currentPage"
  color="lime"
/>
```

<code-preview>
  <bn-pagination :total-pages="20" :current-page="currentPage" color="lime" />
</code-preview>

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


## API Reference

### Props

| Prop                    | Default     | Description |
| ----------------------- | ----------- | ----------- |
| `as`                    | `'nav'`     | `string` <br><br> Determines the HTML element that will wrap the pagination elements. |
| `templateUrl`           | `undefined` | `string` <br><br> If provided, the buttons of the pagination will be anchors (`<a>` tags) and this value should be a URL template where `{page}` will be replaced by the page number. If not provided, the buttons will be `<button>` tags. |
| `totalPages`            | --          | `number` <br><br> The total number of pages. |
| `currentPage`           | --          | `number` <br><br> The current page number. |
| `delta`                 | `1`         | `number` <br><br> The number of page buttons to show before and after the current page. |
| `color`                 | `undefined` | `string` <br><br> Determines the color of the pagination buttons. |
| `classes`               | `{}`        | `object` <br><br> Allows you to customize the classes of the elements of the component. |

### Events

| Event          | Payload | Description |
| -------------- | ------- | ----------- |
| `page-changed` | `number` | Emitted when a page button is clicked. The payload is the number of the page clicked. |