/*引入webpack*/
var webpack 			= require('webpack');
var ExtractTestPlugin	= require('extract-text-webpack-plugin');
var HtmlWebpackPlugin	= require('html-webpack-plugin');

//获取html-webpack-plugin参数的方法
var getHtmlConfig 		= function(name){
	return {
		template : './src/view/' + name + '.html',
		filename : 'view/' + name + '.html',
		inject 	 : true,
		hash	 : true,
		chunks	 : ['common', name] 
	}
}

//webpack config
var config = {
	entry: {
		'common': ['./src/page/common/index.js'],
		'index' : ['./src/page/index/index.js'],
		'login' : ['./src/page/login/index.js'],
	},
	output: {
		path: './dist',
		filename: 'js/[name].js'
	},
	externals : {
		'jquery' : 'window.jQuery'
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: ExtractTestPlugin.extract("style-loader","css-loader") },
			/*对于图片和字体文件的处理*/
			{ test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'}

		]
	},
	plugins : [
		//独立通用模块到js/base.js
		new webpack.optimize.CommonsChunkPlugin({
			name : 'common',
			filename : 'js/base.js' 
		}),
		//把css单独打包到文件里
		new ExtractTestPlugin("css/[name].css"),
		//html模板的处理
		new HtmlWebpackPlugin(getHtmlConfig('index')),
		new HtmlWebpackPlugin(getHtmlConfig('login')),
	]
};

module.exports = config;

