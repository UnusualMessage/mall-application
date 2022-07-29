const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../build-dev'),
		publicPath: "/"
	},

	mode: "development",

	devtool: "eval-source-map",

	performance: {
		hints: 'warning',
	},

	devServer: {
		port: 3000,

		static: {
			directory: path.resolve(__dirname, '../build-dev'),
		},

		proxy: {
			target: "http://localhost:4548",
			context: ["/api"]
		},

		client: {
			logging: 'error',
			overlay: {
				errors: true,
				warnings: false,
			},
		},

		compress: true,
		historyApiFallback: true,
		open: true,
		hot: true
	},

	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "../public"),
					to: "[path][name][ext]",
					noErrorOnMissing: true,
					globOptions: {
						dot: true,
						gitignore: true,
						ignore: ["**.html"]
					}
				},
			]
		}),
	],

	module: {
		rules: [
			{
				test: /\.(css|sass|scss)$/i,
				use: ["style-loader", "css-loader", "sass-loader"],
				exclude: /\.module\.(css|scss|sass)$/i,
			},

			{
				test: /\.(css|sass|scss)$/i,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
							modules: {
								mode: "local",
								localIdentName: '[name]__[local]',
							},
						},
					},
					"sass-loader"
				],
				include: /\.module\.(css|scss|sass)$/i,
			},
		]
	}
};