var path = require('path');
var webpack = require('webpack');


var IS_PRODUCTION = process.env.NODE_ENV === 'production';


// Switch API environment based on process.env.MKT_ENV.
var ENVS = {
  'altdev': {
    apiRoot: "'https://marketplace-altdev.allizom.org/api/v2/'",
    mediaRoot: "'https://marketplace-altdev-cdn.allizom.org/media/'",
  },
  dev: {
    apiRoot: "'https://marketplace-dev.allizom.org/api/v2/'",
    mediaRoot: "'https://marketplace-dev.mozflare.net/media/'",
  },
  local: {
    apiRoot: "'http://localhost:2600/api/v2/'",
    mediaRoot: "'https://marketplace-dev.mozflare.net/media/'",
  },
  stage: {
    apiRoot: "'https://marketplace.allizom.org/api/v2/'",
    mediaRoot: "'https://marketplace-stage.cdn.mozilla.net/media/'",
  },
  prod: {
    apiRoot: "'https://marketplace.firefox.com/api/v2/'",
    mediaRoot: "'https://marketplace.cdn.mozilla.net/media/'",
  },
};


var ENTRY_POINTS = [
  './src/media/js/app'
];
if (!IS_PRODUCTION) {
  // Hot-reload locally.
  ENTRY_POINTS = [
    'webpack-dev-server/client?http://localhost:8679',
    'webpack/hot/only-dev-server',
  ].concat(ENTRY_POINTS);
}


var JS_LOADERS = [
  'babel-loader?cacheDirectory&optional[]=runtime&stage=0',
];
if (!IS_PRODUCTION) {
  // Hot-reload locally.
  JS_LOADERS.unshift('react-hot-loader');
}


var PLUGINS = [
  // Small envify-like plugin.
  new webpack.DefinePlugin({
    'process.env': {
      MKT_API_ROOT: ENVS[process.env.MKT_ENV || 'dev'].apiRoot,
      MKT_MEDIA_ROOT: ENVS[process.env.MKT_ENV || 'dev'].mediaRoot,
      NODE_ENV: '"' + process.env.NODE_ENV + '"',
    }
  }),
]
if (IS_PRODUCTION && process.env.MKT_ENV !== 'dev') {
  // Uglify in production, but not -dev.
  PLUGINS.push(
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
          except: ['$super', '$', 'exports', 'require']
      }
    })
  );
}


module.exports = {
  entry: ENTRY_POINTS,
  output: {
    // Bundle will be served at /bundle.js locally.
    filename: 'bundle.js',
    // Bundle will be built at ./src/media/js.
    path: './src/media/js',
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        // JS.
        exclude: /(node_modules|bower_components)/,
        loaders: JS_LOADERS,
        test: /\.js$/,
      },
    ],
  },
  plugins: PLUGINS,
  resolve: {
    extensions: ['', '.js', '.json'],
    modulesDirectories: [
      'src/media/js',
      'node_modules',
    ],
  },
};
