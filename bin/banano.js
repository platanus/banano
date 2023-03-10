const fs = require('fs');
const path = require('path');
const babelTraverse = require('@babel/traverse');
const babelParser = require('@babel/parser');
const babelGenerator = require('@babel/generator');

const BASE_PATH = path.resolve(__dirname, '..', 'src', 'components');
const TAILWIND_CONFIG = path.resolve(__dirname, '..', 'tailwind.config.js');

function extractStyles() {
  const styles = {};
  fs.readdirSync(path.join(BASE_PATH)).forEach(compFolder => {
    // check if file is a directory
    if (fs.lstatSync(path.join(BASE_PATH, compFolder)).isDirectory()) {
      fs.readdirSync(path.join(BASE_PATH, compFolder)).forEach(compFile => {
        if (compFile.endsWith('styles.js')) {
          styles[compFolder] = require(path.join(BASE_PATH, compFolder, compFile));
        }
      });
    }
  });

  return JSON.stringify(styles);
}

function isModuleChild(nodePath) {
  try {
    return nodePath.parentPath.parentPath.container.left.object.name === 'module';
  } catch (e) {
    return false;
  }
}

function getLibraryIndexInArray(ast) {
  return ast.findIndex(node => node.type === 'CallExpression' && node.callee.name === 'banano');
}

function main() {
  if (!fs.existsSync(TAILWIND_CONFIG)) {
    // eslint-disable-next-line no-console
    console.error(`Tailwind config file not found at ${TAILWIND_CONFIG}`);

    return;
  }

  const tailwindConfig = fs.readFileSync(TAILWIND_CONFIG, 'utf8');
  const ast = babelParser.parse(tailwindConfig, { sourceType: 'module' });
  babelTraverse.default(ast, {
    ArrayExpression(nodePath) {
      if (nodePath.container.key.name === 'plugins' && isModuleChild(nodePath)) {
        const plugins = nodePath.container.value.elements;
        if (getLibraryIndexInArray(plugins) === -1) {
          plugins.push(babelParser.parseExpression(
            `banano.tailwindPlugin(
              { colors: [], styles: ${extractStyles()} }
            )`,
          ));
        }
      }
    },
  });

  fs.writeFileSync(TAILWIND_CONFIG, babelGenerator.default(ast).code);
}

main();
