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
			},
			{
				test: /\.(yml|yaml)$/,
				use: [
					{ loader: require.resolve('json-loader') },
					{ loader: require.resolve('yaml-loader') },
				]
			}
		]
	},
	watchOptions: {
		poll: 500
	},
	devtool: 'source-map',
	target: 'electron-renderer'
};
