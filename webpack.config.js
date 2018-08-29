const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const presetsConfig = require('./build-utils/loadPresets');
const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({mode, presets} = {mode: 'priduction', presets: []}) =>
	webpackMerge(
		{
			mode,
			entry: './src/index.js',
			output: {
				filename: 'main.js',
				path: path.resolve(__dirname, 'dist')
			},
			module: {
				rules: [
					{
						test: /\.jpe?g/,
						use: [{
							loader: "url-loader",
							options: {
								limit: 5000
							}
						}]
					},
					{
						test: /\.png/,
						use: [{
							loader: "url-loader",
							options: {
								limit: 5000
							}
						}]
					}
				]
			},
			plugins: [
				new HtmlWebpackPlugin({
					title: 'Image Gallery',
					template: './src/index.html',
					filename: './index.html'
				}),
				new webpack.ProgressPlugin()
			]
		},
		modeConfig(mode),
		presetsConfig({mode, presets})
	);

// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// module.exports = (env) => ({
// 	mode: env.mode,
// 	entry: './src/index.js',
// 	output: {
// 		filename: 'main.js',
// 		path: path.resolve(__dirname, 'dist')
// 	},
// 	module: {
// 			rules: [
// 			{
// 					test: /\.css$/,
// 					use: [
// 						MiniCssExtractPlugin.loader,
// 					'css-loader'
// 					]
// 			}
// 			]
// 	},
// 	plugins: [
// 		new HtmlWebpackPlugin(),
// 		new webpack.ProgressPlugin(),
// 		new MiniCssExtractPlugin()
// 	]
// });
