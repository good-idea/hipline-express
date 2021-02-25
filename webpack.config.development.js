const path = require('path')
const webpack = require('webpack')

const config = () => ({
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/js/bundle.js',
  ],

  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'bundle.js',
    // publicPath: '/',
    publicPath: '/public/js',

    sourceMapFilename: 'bundle.js.map',
  },

  devtool: 'eval-source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },

  devServer: {
    // publicPath: "/public/",
    // contentBase: path.join(__dirname, 'public'),
    historyApiFallback: {
      index: 'index.local.html',
    },
    hot: true,
    proxy: [
      {
        context: ['/api', '/images'],
        target: 'http://localhost:3000',
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    // new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.WatchIgnorePlugin(['node_modules', './controllers', 'config', 'public', 'views']),
  ],
})

module.exports = config
