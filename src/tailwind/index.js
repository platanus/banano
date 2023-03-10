/* eslint-disable max-statements */
/* eslint-disable max-len, vue/max-len*/
const mergeWith = require('lodash/mergeWith');
const tailwindColors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

const Btn = require('../components/Btn/Btn.styles.js');
const BnInput = require('../components/BnInput/BnInput.styles.js');
const BnTextarea = require('../components/BnTextarea/BnTextarea.styles.js');
const BnListbox = require('../components/BnListbox/BnListbox.styles.js');
const BnFileInput = require('../components/BnFileInput/BnFileInput.styles.js');
const BnCheckbox = require('../components/BnCheckbox/BnCheckbox.styles.js');
const BnToggle = require('../components/BnToggle/BnToggle.styles.js');
const BnModal = require('../components/BnModal/BnModal.styles.js');
const BnPagination = require('../components/BnPagination/BnPagination.styles.js');

const componentList = {
  Btn,
  BnInput,
  BnTextarea,
  BnListbox,
  BnFileInput,
  BnCheckbox,
  BnToggle,
  BnModal,
  BnPagination,
};

function parseColors(classes, colors = []) {
  return colors.reduce((colorObj, color) => {
    colorObj[color] = Object.entries(classes).reduce((prev, [cssString]) => {
      prev[cssString.replace(/varColor/g, color)] = {};

      return prev;
    }, {});

    return colorObj;
  }, {});
}

function parseStyles(obj, colors, componentClass, elementClasses = []) {
  return Object.entries(obj).reduce((prev, [key, value]) => {
    const newElementClasses = [...elementClasses];
    if (key !== 'colors') {
      if (!key.startsWith('@')) {
        newElementClasses.push(key);
      }
      prev[key] = parseStyles(value, colors, componentClass, newElementClasses);
      const colorClasses = value.colors ? parseColors(value.colors, colors) : {};
      if (colorClasses) {
        const isElement = newElementClasses[1] && newElementClasses[1].startsWith('&__');
        const newElementClass = newElementClasses.join('').replace(/&/g, '');

        Object.keys(colorClasses).forEach((color) => {
          prev[`@at-root ${componentClass}--${color}${isElement ? ' ' : ''}${newElementClass}`] = parseStyles(colorClasses[color], colors, componentClass, newElementClasses);
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
    Object.keys(component).forEach((componentKey) => {
      const elementClass = component[componentKey];
      const parsedStyles = parseStyles(elementClass, colors, componentKey, [componentKey]);
      prev[componentKey] = parsedStyles;
    });

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

      const parsedComponents = parseComponents(componentList, optionsWithDefaults.colors);
      addComponents(parsedComponents);
    },
    (options) => {
      const optionsWithDefaults = mergeWith({}, options, defaultOptions, mergeArray);
      const parsedComponents = parseComponents(componentList, optionsWithDefaults.colors);

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
