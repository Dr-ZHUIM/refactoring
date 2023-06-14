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
