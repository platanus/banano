/* eslint-disable max-len, vue/max-len*/
const mergeWith = require('lodash/mergeWith');
const tailwindColors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

const Btn = require('../components/Btn/Btn.styles.js');
const BnInput = require('../components/BnInput/BnInput.styles.js');

function parseColors(classes, colors = []) {
  return colors.reduce((colorObj, color) => {
    colorObj[color] = Object.entries(classes).reduce((prev, [cssString]) => {
      prev[cssString.replace(/varColor/g, color)] = {};

      return prev;
    }, {});

    return colorObj;
  }, {});
}

function parseStyles(obj, colors, componentClass, elementClass) {
  return Object.entries(obj).reduce((prev, [key, value]) => {
    let element;
    if (elementClass) {
      element = elementClass;
    } else if (key.startsWith('&__')) {
      element = key;
    }

    if (key !== 'colors') {
      prev[key] = parseStyles(value, colors, componentClass, element);
      const colorClasses = value.colors ? parseColors(value.colors, colors) : {};
      if (colorClasses) {
        Object.keys(colorClasses).forEach((color) => {
          prev[`@at-root ${componentClass}--${color}${element ? ` ${componentClass}${element.replace('&', '')}${key.replace('&', '')}` : `${componentClass}${key.replace('&', '')}`}`] = parseStyles(colorClasses[color], colors, componentClass, element);
        });
      }
    }

    return prev;
  }, {});
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
    const componentClass = Object.keys(component)[0];
    prev[componentClass] = {
      ...parseStyles(component[componentClass], colors, componentClass),
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

      const parsedComponents = parseComponents({ Btn, BnInput }, optionsWithDefaults.colors);
      addComponents(parsedComponents);
    },
    (options) => {
      const optionsWithDefaults = mergeWith({}, options, defaultOptions, mergeArray);
      const parsedComponents = parseComponents({ Btn, BnInput }, optionsWithDefaults.colors);

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
