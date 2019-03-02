const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const StringReplacePlugin = require('string-replace-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  resolve: {
		alias: {
			fs: path.join(__dirname, './virtual-fs.js')
		}
  },
  module: {    
    rules: [            
      { enforce: 'post', test: /fontkit[/\\]index.js$/, loader: "transform-loader?brfs" },
      { enforce: 'post', test: /unicode-properties[/\\]index.js$/, loader: "transform-loader?brfs" },
      { enforce: 'post', test: /linebreak[/\\]src[/\\]linebreaker.js/, loader: "transform-loader?brfs" },
      {
				test: /fontkit[/\\]index.js$/, loader: StringReplacePlugin.replace({
					replacements: [
						{
							pattern: /fs\./g,
							replacement: function () {
								return 'require(\'fs\').';
							}
						}
					]
				})
			},
      { test: /src[/\\]assets/, loader: 'arraybuffer-loader'},
      { test: /\.afm$/, loader: 'raw-loader'}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html')
    })
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        exclude: /src[/\\]index\.js$/ // not working
      })
    ]
  },
  devtool: 'sourcemap'
}