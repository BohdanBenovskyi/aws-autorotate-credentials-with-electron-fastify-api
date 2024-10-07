import { JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest';

const tsConfigMock = {
  compilerOptions: {
    paths: {
      '@/*': ['./src/*'],
    },
  },
};

const moduleNameMapper = pathsToModuleNameMapper(tsConfigMock.compilerOptions.paths, { prefix: '<rootDir>/' });

const jestConfig: JestConfigWithTsJest = {
  moduleNameMapper,
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/tests/setup-jest.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleDirectories: ['node_modules', 'src'],
  testRegex: '(/test/.*|(\\.|/)(test|spec))\\.(ts|js)x?$',
  coverageDirectory: 'coverage',
  collectCoverage: true,
  coverageReporters: ['lcov', 'json-summary'],
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}', '!src/**/*.d.ts', '!src/**/*.types.ts', '!src/**/*onfig.ts'],
  transform: {
    '^.+.tsx?$': ['ts-jest', { tsconfig: './tsconfig.json' }],
  },
};

export default jestConfig;
