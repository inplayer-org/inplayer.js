module.exports = {
  out: './docs/',
  readme: 'none',
  includes: './',
  exclude: [
    '**/__tests__/**/*',
    '**/factories/**/*',
    '**/extends/**/*',
    '**/constants/**/*',
  ],
  mode: 'file',
  excludeExternals: true,
  excludeNotExported: true,
  excludePrivate: true,
};
