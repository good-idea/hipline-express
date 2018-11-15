const path = require('path')
const webpack = require('webpack')

const config = () => ({
	entry: ['./src/js/bundle.js'],
	output: {
		path: path.resolve(__dirname, 'public/js'),
		filename: 'bundle.js',
		publicPath: '/',
		sourceMapFilename: 'bundle.js.map',
	},
	devtool: 'cheap-module-source-map',
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
		],
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.DefinePlugin({
			GA_ID: JSON.stringify('UA-124593968-1'),
			"process.env.NODE_ENV": JSON.stringify('production'),
		}),
	],
})

module.exports = config
