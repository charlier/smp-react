import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import autoprefixer from 'autoprefixer';
import postAssets from 'postcss-assets';
import postUtils from 'postcss-utils';
import path from 'path';

const ENV = process.env.NODE_ENV || 'development';
const DEV_ENV = ENV !== 'production';

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: './index.js',

	output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: '/',
		filename: `assets/${DEV_ENV ? '[hash]' : '[chunkhash]'}.js`
	},

	resolve: {
		extensions: ['.jsx', '.js', '.scss'],
		modules: [
			path.resolve(__dirname, 'src/lib'),
			path.resolve(__dirname, 'node_modules'),
			'node_modules'
		],
		alias: {
			style: path.resolve(__dirname, 'src/style'),
			'react': 'preact-compat',
			'react-dom': 'preact-compat'
		}
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: [
					path.resolve(__dirname, 'src')
				],
				enforce: 'pre',
				use: 'source-map-loader'
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.(woff|woff2|ico)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'assets/[hash].[ext]'
						}
					}
				]
			},
			{
				test: /\.(scss|css)$/,
				include: [path.resolve(__dirname, 'src')],
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{
						loader: 'css-loader',
						options: {
							minimize: !DEV_ENV,
							modules: true,
							sourceMap: DEV_ENV,
							importLoaders: 1
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: DEV_ENV,
							plugins: () => [ autoprefixer, postAssets, postUtils ]
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: DEV_ENV
						}
					}]
				})
			},
			{
				test: /\.(svg)$/,
				use: 'svg-sprite-loader'
			}
		]
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new ExtractTextPlugin({
			filename: 'assets/[contenthash].css',
			allChunks: true,
			disable: DEV_ENV
		}),
		new HtmlWebpackPlugin({
			template: 'index.ejs',
			minify: {
				collapseWhitespace: true
			}
		})
	].concat(DEV_ENV ? [] : [
		new UglifyJsPlugin({sourceMap: DEV_ENV})
	]),
	devServer: {
		port: process.env.PORT || 8080,
		host: '0.0.0.0',
		disableHostCheck: true,
		contentBase: './src',
		hot: true,
		compress: true
	}
};
