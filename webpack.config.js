const path = require('path')
const webpack = require('webpack')

const config = () => (
	{
		entry: [
			'webpack-hot-middleware/client',
			'react-hot-loader/patch',
			'./src/js/bundle.js',
		],
		output: {
			path: path.resolve(__dirname, 'public/js'),
			filename: 'bundle.js',
			publicPath: '/',
			sourceMapFilename: 'bundle.js.map',
		},
		plugins: [
			new webpack.optimize.OccurrenceOrderPlugin(),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NamedModulesPlugin(),
			new webpack.NoEmitOnErrorsPlugin(),
			new webpack.WatchIgnorePlugin(['node_modules', './controllers', 'config', 'public', 'views']),
		],
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
	}
)

module.exports = config
