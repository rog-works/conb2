const webpack = require('webpack');

module.exports = {
	entry: {
		client: './client/Index.ts'
	},
	output: {
		path: `${__dirname}/assets/js/`,
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
	devtool: 'source-map',
	target: 'electron-renderer'
};
