/* eslint-disable max-len, vue/max-len*/
const mergeWith = require('lodash/mergeWith');
const tailwindColors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

const Btn = require('../components/Btn/Btn.styles.js');

const specialCases = ['&', '@apply', '.'];

function parseColors(classes, colors = []) {
  return colors.reduce((colorObj, color) => {
    colorObj[color] = Object.entries(classes).reduce((prev, [cssString]) => {
      prev[cssString.replace(/varColor/g, color)] = {};

      return prev;
    }, {});

    return colorObj;
  }, {});
}

function parseStyles(styles, prefix = '', colors = []) {
  const classes = {};
  Object.keys(styles).forEach((key) => {
    if (specialCases.some((specialCase) => key.startsWith(specialCase))) {
      classes[key] = styles[key];
    } else if (key !== 'colors') {
      const colorClasses = styles[key].colors ? parseColors(styles[key].colors, colors) : {};
      classes[`${prefix}${key}`] = {
        ...parseStyles(styles[key], '&-', colors),
        ...parseStyles(colorClasses, '&-', colors),
      };
    }
  });

  return classes;
}

function mergeClasses(styles) {
  const classes = [];

  function merge(obj, parent = '') {
    Object.keys(obj).forEach((key) => {
      if (key.startsWith('@') || key.startsWith('.') && parent) return;
      const parsedKey = key.replace('&', '');
      const newKey = parent ? `${parent}${parsedKey}` : key;
      classes.push(newKey);
      if (typeof obj[key] === 'object') {
        merge(obj[key], newKey);
      }
    });
  }

  merge(styles);

  return classes;
}

function parseComponents(components, colors) {
  return Object.keys(components).reduce((prev, key) => {
    const component = components[key];
    prev[component.baseComponentClass] = {
      ...component.baseStyle,
      ...(component.modifiers ? parseStyles(component.modifiers, '&--', colors) : {}),
      ...(component.elements ? parseStyles(component.elements, '&__', colors) : {}),
    };

    return prev;
  }, {});
}

const defaultOptions = { colors: ['base'], components: {} };

function mergeArray(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }

  return undefined;
}

module.exports = {
  tailwindPlugin: plugin.withOptions(
    (options) => ({ addComponents }) => {
      const optionsWithDefaults = mergeWith({}, options, defaultOptions, mergeArray);

      const parsedComponents = parseComponents({ Btn, ...optionsWithDefaults.components }, optionsWithDefaults.colors);
      addComponents(parsedComponents);
    },
    (options) => {
      const optionsWithDefaults = mergeWith({}, options, defaultOptions, mergeArray);
      const parsedComponents = parseComponents({ Btn, ...optionsWithDefaults.components }, optionsWithDefaults.colors);

      return {
        theme: {
          extend: {
            colors: {
              base: tailwindColors.blue,
            },
          },
        },
        safelist: mergeClasses(parsedComponents),
      };
    },
  ),
};
