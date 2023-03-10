/* eslint-disable max-len, vue/max-len*/
const tailwindColors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

const btn = require('../components/Btn/Btn.styles.js');

function parseClassName(prefix, className) {
  if (className === 'base') {
    return prefix;
  }

  return className.startsWith('[') ? `${prefix}${className}` : `${prefix}--${className}`;
}

function parseColors(classes, colors = []) {
  return colors.reduce((colorObj, color) => {
    colorObj[color] = Object.entries(classes).reduce((prev, [cssString]) => {
      prev[cssString.replace(/varColor/g, color)] = {};

      return prev;
    }, {});

    return colorObj;
  }, {});
}

function getClassName(className, prevClassName) {
  const classNamePrefix = className.startsWith('.') ? '' : '-';

  return prevClassName ? `${prevClassName}${classNamePrefix}${className}` : className;
}

function parseClasses(settings, classObj, prevClassName, finalClasses = {}) {
  for (const [className, value] of Object.entries(classObj)) {
    const valueEntries = Object.entries(value);
    if (valueEntries.length > 0) {
      if (className === 'colors') {
        parseClasses(settings, parseColors(value, settings.colors), prevClassName, finalClasses);
      } else {
        parseClasses(settings, value, getClassName(className, prevClassName), finalClasses);
      }
    } else {
      const finalClass = parseClassName(settings.prefix, prevClassName);
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
        ...parseClasses({ prefix: '.bn-btn', colors: getColors(options.colors, defaultOptions.colors) }, btn),
      });
    },
    (options = defaultOptions) => ({
      theme: {
        extend: {
          colors: {
            base: tailwindColors.blue,
          },
        },
      },
      safelist: [
        ...Object.keys(parseClasses({ prefix: '.bn-btn', colors: getColors(options.colors, defaultOptions.colors) }, btn)),
      ],
    }),
  ),
};
