/* eslint-disable max-len, vue/max-len*/
const tailwindColors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');
const mergeWith = require('lodash/mergeWith');

const btn = require('../components/Btn/Btn.styles.js');

const components = {
  '.bn-btn': {
    name: 'Btn',
    styles: btn,
  },
};

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

const defaultOptions = { colors: ['base'], styles: {} };

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

      addComponents({
        ...Object.entries(components)
          .map(([componentPrefix, component]) => parseClasses(
            { prefix: componentPrefix, colors: optionsWithDefaults.colors },
            mergeWith({}, component.styles, optionsWithDefaults.styles[component.name], mergeArray),
          ))
          .reduce((prev, curr) => ({ ...prev, ...curr }), {}),
      });
    },
    (options) => {
      const optionsWithDefaults = mergeWith({}, defaultOptions, options, mergeArray);

      return {
        theme: {
          extend: {
            colors: {
              base: tailwindColors.blue,
            },
          },
        },
        safelist: [
          ...Object.keys(
            Object.entries(components)
              .map(([componentPrefix, component]) => parseClasses(
                { prefix: componentPrefix, colors: optionsWithDefaults.colors },
                mergeWith(component.styles, optionsWithDefaults.styles[component.name], mergeArray),
              ))
              .reduce((prev, curr) => ({ ...prev, ...curr }), {}),
          ),
        ],
      };
    },
  ),
};
