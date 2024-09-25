const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { ProvidePlugin } = require("webpack");

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
	mode: devMode ? "development" : "production",
	entry: {
		index: "./src/scripts/index.js",
	},
	output: {
		filename: "[name][fullhash].bundle.js",
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: ["ts-loader"],
			},
			{
				test: /\.s[ac]ss$/,
				exclude: /node_modules/,
				use: [
					devMode ? "style-loader" : MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader",
				],
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					devMode ? "style-loader" : MiniCssExtractPlugin.loader,
					"css-loader",
					"postcss-loader",
				],
			},
			{
				test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
				exclude: /node_modules/,
				loader: "file-loader",
				options: {
					name: "res[contenthash].[ext]",
				},
			},
		],
	},
	optimization: {
		usedExports: true,
		chunkIds: "size",
		mangleExports: "size",
		moduleIds: "size",
		removeAvailableModules: true,
		minimizer: [
			new TerserWebpackPlugin({
				parallel: true,
				terserOptions: {
					compress: {
						passes: 2,
					},
				},
			}),
			new CssMinimizerPlugin({
				parallel: true,
				minify: CssMinimizerPlugin.cssnanoMinify,
			}),
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		}),
		new ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",

			gsap: "gsap",
		}),
	].concat(devMode ? [] : [
		new MiniCssExtractPlugin({
			filename: "style.css",
		}),
	]),
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		compress: true,
		port: 9000,
	},
};
