const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
	entry: path.resolve(__dirname, '../src', 'index.tsx'),

	output: {
		clean: true,
	},

	plugins: [
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: path.resolve(__dirname, "../public", "index.html"),
		}),

		new MiniCssExtractPlugin({
			filename: "./static/css/style.[contenthash].css",
		}),

		new ESLintPlugin({
			extensions: ["js", "jsx", "ts", "tsx"],
		})
	],

	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx", ".css", ".scss"],
	},

	stats: "minimal",

	module: {
		rules: [
			{
				test: /\.(ts|tsx|js|jsx)$/,
				exclude: /node_modules/,
				use: [{
					loader: "ts-loader",
					options: {
						transpileOnly: true
					}
				}],
			},
		]
	}
};