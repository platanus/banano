# Colors

Banano extends the theme to include some custom colors that affect some components across this library. These colors can be overriden in your projects `tailwind.config.js` file. Some of these colors require a **object** of colors with their numbered variants, for example, `tailwindColors.purple`, and some require a **single string** color, for example `tailwindColors.purple['100']`.
The colors are as follows:

| Color | Default | Description |
| --- | --- | --- |
| banano&#x2011;base | `tailwindColors.blue`<br />(object) | Default color used in `color` props of all components, which affects things like checkbox, toggle and button fill colors, and input focus outline |
| banano&#x2011;text&#x2011;foreground | `tailwindColors.gray['900']`<br />(string) | Color used for regular texts inside inputs (regular, area, filet, etc.) |
| banano&#x2011;text&#x2011;muted | `tailwindColors.gray['500']`<br />(string) | Color used for placeholder texts inside inputs (regular, area, filet, etc.) |
| banano&#x2011;bg | `tailwindColors.white`<br />(string) | Color used for the background in inputs |

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
        },
      },
    },
  },
}
```
