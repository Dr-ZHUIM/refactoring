# Reading notes for 《Refactoring》

## configuration issues 

### node env libs

```
### For using fetch in node env
npm i node-fetch -D 

### For running .ts files like node
npm i ts-node -D

### For adapting windows env to set NODE_ENV
npm i cross-env -D

### Jest will run in commonJs which means meta.import will be undefined
### To solve it , I have several opnions
#### 1. mock importing progress
npm i ts-jest-mock-import-meta

#### 2. keep Jest run in ES Module
#### open --experimental-vm-modules in npm script
#### use jest-esm.config.mjs version configuration

#### 3. babel config 

#### 4. use vite + vitest framework


```

### tsconfig with ts-node

```
{
  "compilerOptions": {
    "target": "esnext", /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    "module": "esnext", /* Specify what module code is generated. */
    "outDir": "./dist",
    "allowJs": true,
    "baseUrl": "./",
    "checkJs": true, /* Enable error reporting in type-checked JavaScript files. */
    "esModuleInterop": true, /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    "forceConsistentCasingInFileNames": true, /* Ensure that casing is correct in imports. */
    "strict": true, /* Enable all strict type-checking options. */
    "skipLibCheck": true, /* Skip type checking all .d.ts files. */
    "moduleResolution": "node",
    "noEmit": true,
    "isolatedModules": true,
  },
  "ts-node": {
    "files": true,
    "esm": true,
    "experimentalSpecifierResolution": "node"
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ],
}
```

### ts-jest configuration

```
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: 'node',
  // Without this option,
  // error `The 'import.meta' meta-property is only allowed when ...` reveals
  extensionsToTreatAsEsm: ['.ts'],

  // No import resolution, otherwise
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  // Process infinitely run, if the option is not set
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [1343],
        },
        astTransformers: {
          before: [
            {
              path: 'ts-jest-mock-import-meta',
              options: {
                metaObjectReplacement: { url: '' },
              },
            },
          ],
        },
      },
    ],
  },
};

```

### ts-jest with esm configuration

```
import preset from 'ts-jest/presets/index.js';

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  ...preset.jsWithTsESM,
  transform: {
    '^.+.[tj]sx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        useESM: true,
      },
    ],
  },
};

```

### eslint with ts and prettier
