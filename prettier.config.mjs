/** @type {import('prettier').Config} */
const config = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,

  semi: true,
  singleQuote: true,
  trailingComma: 'all',

  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  endOfLine: 'lf',
  importOrder: [
    '^node:$',
    '',
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/types$',
    '^@/types/(.*)$',
    '^@/config$',
    '^@/config/(.*)$',
    '^@/paths$',
    '^@/data/(.*)$',
    '^@/lib/(.*)$',
    '^@/locales/(.*)$',
    '^@/actions/(.*)$',
    '^@/contexts/(.*)$',
    '^@/hooks/(.*)$',
    '^@/components/(.*)$',
    '^@/styles/(.*)$',
    '',
    '^[./]',
  ],
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
};

export default config;
