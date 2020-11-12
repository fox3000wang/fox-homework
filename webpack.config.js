const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/LazyImage/index.js',
  //   devtool: 'cheap-module-eval-source-map',

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },

  devServer: {
    port: 8888,
    open: true,
    compress: true,
    contentBase: path.resolve(__dirname, 'static'),
    hot: true,
  },

  plugins: [
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true,
      minify: {
        minifyJS: true,
      },
    }),
  ],
};
