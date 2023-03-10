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
    if (valueEntries.length > 0) {
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

const btnClasses = parseClasses('.bn-btn', btn);

module.exports = {
  tailwindPlugin: plugin(({ addComponents }) => {
    addComponents({
      ...btnClasses,
    });
  }, {
    theme: {
      extend: {
        colors: {
          base: colors.blue,
        },
      },
    },
    safelist: [
      ...Object.keys(btnClasses),
    ],
  }),
};
