module.exports = (api) => {
  const isProduction = api.env('production');
  const isDevelopment = api.env('development');

  const config = {
    presets: [
      ['@babel/preset-env', {
        useBuiltIns: 'usage',
        modules: false,
        debug: isDevelopment,
        targets: isDevelopment && 'last 2 Chrome versions',
        ignoreBrowserslistConfig: isDevelopment,
      }],
      ['@babel/preset-react', {
        development: isDevelopment,
      }],
    ],
    plugins: [
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
      ['babel-plugin-styled-components', {
        displayName: isDevelopment,
        minify: isProduction,
      }],
    ],
  };

  if (isProduction) {
    config.plugins.push('babel-plugin-transform-react-remove-prop-types');
  } else if (isDevelopment) {
    config.plugins.push('react-hot-loader/babel');
  }

  return config;
};
