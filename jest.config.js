module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    testMatch: ['**/__tests__/**/*.test.ts'],
    globals: {
        'ts-jest': {
            tsconfig: './tsconfig.test.json',
        },
    },
    transformIgnorePatterns: [
        'node_modules/(?!(zustand|date-fns)/)',
    ],
    moduleNameMapper: {
        '@react-native-async-storage/async-storage': '<rootDir>/__mocks__/@react-native-async-storage/async-storage.js',
    },
    collectCoverageFrom: [
        'src/utils/**/*.ts',
        'src/store/**/*.ts',
    ],
};