const dev = !!(process.env['NODE_ENV'] && process.env['NODE_ENV'].trim() === 'debug');
const coverage = !dev;

const webpackConfig = require('./webpack.config');
webpackConfig.module.loaders[0].options = {
  configFileName: 'test/tsconfig-testing.json'
};

if (coverage) {
  webpackConfig.module.loaders.push({
    test: /\.ts(x?)$/,
    enforce: 'post',
    loader: 'istanbul-instrumenter-loader',
    exclude: [
      'node_modules'
    ]
  });
}
module.exports = function (config) {
  const newConfig = {
    basePath: '',
    browsers: ['Chrome'],
    frameworks: ['mocha'],
    reporters: ['progress', 'mocha'],
    files: [
      'test/**/*.test.ts',
      'test/**/*.test.tsx'
    ],
    preprocessors: {
      'test/**/*.ts': ['webpack', 'sourcemap'],
      'test/**/*.tsx': ['webpack', 'sourcemap'],
      'src/**/*.tsx': ['webpack', 'sourcemap'],
      'src/**/*.ts': ['webpack', 'sourcemap']
    },
    webpack: {
      devtool: 'inline-source-map',
      module: webpackConfig.module,
      resolve: webpackConfig.resolve
    },
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      reporters: [
        {
          type: 'json',
          dir: 'coverage/json',
          subdir: '.'
        }
      ]
    },
    mochaReporter: {
      output: 'full'
    },
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    },
    port: 9876,
    colors: true,
    logLevel: dev ? config.LOG_INFO : config.LOG_ERROR,
    autoWatch: dev === true,
    singleRun: dev === false
  };

  if (coverage) {
    newConfig.reporters.push('coverage');
  }

  config.set(newConfig);
};
