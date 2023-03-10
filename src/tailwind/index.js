/* eslint-disable max-len, vue/max-len*/
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

const btn = require('../components/Btn/Btn.styles.js');

function parseClassName(prefix, className) {
  if (className === 'base') {
    return prefix;
  }

  return className.startsWith('[') ? `${prefix}${className}` : `${prefix}--${className}`;
}

function parseClasses(prefix, classObj, prevClassName, finalClasses = {}) {
  for (const [className, value] of Object.entries(classObj)) {
    const valueEntries = Object.entries(value);
    if (valueEntries.length > 0 && !className.includes('data-color')) {
      const classNamePrefix = className.startsWith('.') ? '' : '-';
      const parsedClassName = prevClassName ? `${prevClassName}${classNamePrefix}${className}` : className;
      parseClasses(prefix, value, parsedClassName, finalClasses);
    } else {
      const finalClass = parseClassName(prefix, prevClassName);
      finalClasses[finalClass] = finalClasses[finalClass] || {};
      finalClasses[finalClass][className] = {};
    }
  }

  return finalClasses;
}

const defaultOptions = { colors: ['base'] };
function getColors(userColors = [], defaultColors = []) {
  return [...defaultColors, ...userColors];
}

module.exports = {
  tailwindPlugin: plugin.withOptions(
    (options = defaultOptions) => ({ addComponents }) => {
      addComponents({
        ...parseClasses('.bn-btn', btn(getColors(options.colors, defaultOptions.colors))),
      });
    },
    (options = defaultOptions) => ({
      theme: {
        extend: {
          colors: {
            base: colors.blue,
          },
        },
      },
      safelist: [
        ...Object.keys(parseClasses('.bn-btn', btn(getColors(options.colors, defaultOptions.colors)))),
      ],
    }),
  ),
};
