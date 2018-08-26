const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => ({
	output: {
		filename: "[chunkhash].js",
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin(),
	],
});
