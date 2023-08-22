# Colors

## Color Prop

Most components in this library have a `color` prop that can be used to change either the main color or the color accent of the component, however it requires a bit of setup before it can be used due to the way Tailwind works.

### Setup

To use the `color` prop, you need to configure the library to include the colors you want to use. This is done by passing an object to the `require('banano/tailwind')` function, with a `colors` property that is an array of the colors you want to include. For example, to include the `lime` color, you would do the following:

```js
// tailwind.config.js
{
  ...
  require('banano/tailwind')({ colors: ['lime']}),
}
```

The colors that can be included can be found in the [Tailwind Colors](https://tailwindcss.com/docs/customizing-colors#color-palette-reference) palette, plus any custom color added in the Tailwind config file. However, the custom colors need to have all their variants defined (100, 200, 300...)
, otherwise the `color` prop will not work. For example, if you add a custom color like this it will not work:

```js
// tailwind.config.js
{
  ...
  theme: {
    extend: {
      colors: {
        custom: '#ff0000',
      },
    },
  },
}
```

But if you add it like this, it will work:

```js
// tailwind.config.js
{
  ...
  theme: {
    extend: {
      colors: {
        custom: {
          100: '#ff0000',
          200: '#ff0011',
          300: '#ff0022',
          // ...
        },
      },
    },
  },
}
```

## Theme Colors

Banano extends the theme to include some custom colors that affect some components across this library. These colors can be overriden in your projects `tailwind.config.js` file. Some of these colors require a **object** of colors with their numbered variants, for example, `tailwindColors.purple`, and some require a **single string** color, for example `tailwindColors.purple['100']`.
The colors are as follows:

| Color | Default | Description |
| --- | --- | --- |
| banano&#x2011;base | `tailwindColors.blue`<br />(object) | Default color used in `color` props of all components, which affects things like checkbox, toggle and button fill colors, and input focus outline |
| banano&#x2011;text&#x2011;foreground | `tailwindColors.gray['900']`<br />(string) | Color used for regular texts inside inputs (regular, area, filet, etc.) |
| banano&#x2011;text&#x2011;muted | `tailwindColors.gray['500']`<br />(string) | Color used for placeholder texts inside inputs (regular, area, filet, etc.) |
| banano&#x2011;bg | `tailwindColors.white`<br />(string) | Color used for the background in inputs |
| banano&#x2011;error | `tailwindColors.red['500']`<br />(string) | Color used for all error related style changes: texts, borders, focus rings, etc. For rings in particular, a 25% opacity of this color is used |

A config that overrides these colors would look like this:

```js
// tailwind.config.js
const tailwindColors = require('tailwindcss/colors')

module.exports = {
  theme: {
    extend: {
      colors: {
        banano: {
          base: tailwindColors.purple,
          text: {
            foreground: tailwindColors.zinc['800'],
            muted: tailwindColors.zinc['300'],
          },
          bg: tailwindColors.lime['50'],
          error: tailwindColors.rose['500'],
        },
      },
    },
  },
}
```
