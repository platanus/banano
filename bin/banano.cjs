const fs = require('fs');
const path = require('path');

const BASE_PATH = path.resolve(__dirname, '..', 'src', 'components');
const TAILWIND_CONFIG = path.resolve(__dirname, '..', 'tailwind.config.cjs');

function extractStyles() {
  const styles = {};
  fs.readdirSync(path.join(BASE_PATH)).forEach(compFolder => {
    // check if file is a directory
    if (fs.lstatSync(path.join(BASE_PATH, compFolder)).isDirectory()) {
      fs.readdirSync(path.join(BASE_PATH, compFolder)).forEach(compFile => {
        if (compFile.endsWith('styles.cjs')) {
          styles[compFolder] = require(path.join(BASE_PATH, compFolder, compFile));
        }
      });
    }
  });

  // eslint-disable-next-line no-magic-numbers
  return JSON.stringify(styles, null, 2);
}

function main() {
  if (!fs.existsSync(TAILWIND_CONFIG)) {
    // eslint-disable-next-line no-console
    console.error(`Tailwind config file not found at ${TAILWIND_CONFIG}`);

    return;
  }

  fs.writeFileSync('./banano.json', extractStyles());
}

main();
