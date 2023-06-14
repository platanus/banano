# Classes and Components

Every component uses normal CSS classes inside, with no actual styling applied until a second layer is applied. This second layer is what allows the library to be visually customized at will and allows the library to not necessarily depend* on TailwindCSS.

To check the existent CSS, run the following inside your project folder.

```bash
npx banano
```

This will generate a `banano.json` file with all the current classes and components. You can then either edit that file and require it in the TailwindCSS configuration file or copy paste the what you need.

```js
// tailwind.config.js
{
  plugins: [
    require('@tailwindcss/forms'),
    require('@headlessui/tailwindcss'),
    require('banano/tailwind')({
      colors: ['lime'],
      components: require('./banano.json') // [!code ++]
    }),
  ],
}
```

```js
// tailwind.config.js
{
  plugins: [
    require('@tailwindcss/forms'),
    require('@headlessui/tailwindcss'),
    require('banano/tailwind')({
      colors: ['lime'],
      components: {
        BnInput: { // [!code ++]
          '.bn-input': { // [!code ++]
            '@apply bg-white relative w-full': {}, // [!code ++]
          } // [!code ++]
        } // [!code ++]
      }
    }),
  ],
}
```
