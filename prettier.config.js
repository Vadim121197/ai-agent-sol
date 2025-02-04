export default {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  singleQuote: true,
  jsxSingleQuote: true,
  printWidth: 100,
  trailingComma: 'all',
  arrowParens: 'avoid',
  importOrder: ['^react$', '^next', '<THIRD_PARTY_MODULES>', '^~/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
