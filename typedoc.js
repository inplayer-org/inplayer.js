module.exports = {
  out: './docs/',
  includes: './',
  exclude: [
    '**/__tests__/**/*',
    '**/factories/**/*',
    '**/extends/**/*',
    '**/constants/**/*',
    '**/helpers/**/*',
  ],
  mode: 'file',
  excludeExternals: true,
  excludeNotExported: true,
  excludePrivate: true,
};
