const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: './client/Index.ts',
	output: {
		path: path.join(__dirname, './public/js/'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.ts', '.js'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		},
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader'
			}
		]
	},
	watchOptions: {
		poll: 500
	},
	devtool: 'source-map'
};
