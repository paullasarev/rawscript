const { writeFileSync, readFileSync } = require('fs');
const { basename, dirname, join, resolve } = require('path');
const glob = require('glob');
const { parseSchema } = require('json-schema-to-flow-type');
const { inspect } = require('util');

const SCHEMA_EXT = '.schema.js';
const SCHEMA_FILES = `/**/*${SCHEMA_EXT}`;

const processFile = (filesExt, context) => (file) => {
  try {
    const fileDirname = dirname(file);
    const fileBasename = basename(file, filesExt);
    const jsonSchema = require(file); // eslint-disable-line import/no-dynamic-require
    const mainSchema = jsonSchema.default;
    const typeId = mainSchema.id;
    const arraySchema = {
      type: 'array',
      items: mainSchema,
      id: `${typeId}Array`,
    };

    const flowMainType = parseSchema(mainSchema);
    const flowArrayType = `export type ${typeId}Array = Array<${typeId}>;`;

    const flowText = `/* @flow */\n${flowMainType}\n\n${flowArrayType}\n`;
    const flowFilename = join(fileDirname, `${fileBasename}.flow.js`);
    console.log(flowFilename); // eslint-disable-line no-console
    writeFileSync(flowFilename, flowText);
    context.count++;
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
  }
};

const generate = (targetDir, filesGlob, filesExt) => {
  console.log('processs', filesGlob); // eslint-disable-line no-console
  const files = glob.sync(join(targetDir, filesGlob));
  const context = { count: 0 };
  files.forEach(processFile(filesExt, context));
  console.log(`done ${context.count} files`); // eslint-disable-line no-console
};

generate(resolve('.'), SCHEMA_FILES, SCHEMA_EXT);
