/* eslint-disable max-statements */
/* eslint-disable max-len, vue/max-len*/
const mergeWith = require('lodash/mergeWith');
const isPlainObject = require('lodash/isPlainObject');
const tailwindColors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

const BnBtn = require('../components/BnBtn/BnBtn.styles.cjs');
const BnInput = require('../components/BnInput/BnInput.styles.cjs');
const BnTextarea = require('../components/BnTextarea/BnTextarea.styles.cjs');
const BnListbox = require('../components/BnListbox/BnListbox.styles.cjs');
const BnFileInput = require('../components/BnFileInput/BnFileInput.styles.cjs');
const BnCheckbox = require('../components/BnCheckbox/BnCheckbox.styles.cjs');
const BnToggle = require('../components/BnToggle/BnToggle.styles.cjs');
const BnModal = require('../components/BnModal/BnModal.styles.cjs');
const BnPagination = require('../components/BnPagination/BnPagination.styles.cjs');

const componentList = {
  BnBtn,
  BnInput,
  BnTextarea,
  BnListbox,
  BnFileInput,
  BnCheckbox,
  BnToggle,
  BnModal,
  BnPagination,
};

function parseColors(classes, colors = {}) {
  return Object.entries(colors).reduce((colorObj, [colorName, colorValue]) => {
    colorObj[colorName] = Object.entries(classes).reduce((prev, [cssString]) => {
      if (isPlainObject(colorValue)) {
        prev[cssString.replace(/varColor/g, colorName)] = {};
      }

      return prev;
    }, {});

    return colorObj;
  }, {});
}

function parseStyles(obj, colors, componentClass, elementClasses = []) {
  return Object.entries(obj).reduce((prev, [key, value]) => {
    const newElementClasses = [...elementClasses];
    if (key === 'colors') {
      const colorClasses = parseColors(value, colors);
      const newElementClass = newElementClasses.join('').replace(/&/g, '');
      const isBlock = !newElementClass.includes('--') && !newElementClass.includes('__');
      const isElement = !newElementClass.includes('--') && newElementClass.includes('__');
      const isModifier = newElementClass.includes('--');

      Object.keys(colorClasses).forEach((color) => {
        let colorClass;
        if (isBlock || isElement) {
          colorClass = `&--${color}`;
        } else if (isModifier) {
          colorClass = `&-${color}`;
        }
        prev[colorClass] = parseStyles(colorClasses[color], colors, componentClass, newElementClasses);
      });
    } else {
      if (!key.startsWith('@')) {
        newElementClasses.push(key);
      }
      prev[key] = parseStyles(value, colors, componentClass, newElementClasses);
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

function mergeArray(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }

  return undefined;
}

const themeColors = {
  'banano-base': tailwindColors.blue,
  'banano-text-foreground': tailwindColors.gray['900'],
  'banano-text-muted': tailwindColors.gray['500'],
  'banano-bg': tailwindColors.white,
  'banano-error': tailwindColors.red['500'],
};
const defaultOptions = { colors: themeColors, components: {} };

module.exports = plugin.withOptions(
  (options) => ({ addComponents }) => {
    const optionsWithDefaults = mergeWith({}, options, defaultOptions, mergeArray);
    const components = mergeWith({}, componentList, optionsWithDefaults.components);
    const parsedComponents = parseComponents(components, optionsWithDefaults.colors);
    addComponents(parsedComponents);
  },
  (options = {}) => {
    options.colors = (options.colors || []).reduce((prev, color) => {
      prev[color] = tailwindColors[color];

      return prev;
    }, {});
    const optionsWithDefaults = mergeWith({}, options, defaultOptions, mergeArray);
    const components = mergeWith({}, componentList, optionsWithDefaults.components);
    const parsedComponents = parseComponents(components, optionsWithDefaults.colors);

    return {
      theme: {
        extend: {
          colors: themeColors,
        },
      },
      safelist: mergeClasses(parsedComponents),
    };
  },
);
