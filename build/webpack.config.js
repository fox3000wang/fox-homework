const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

function assetsPath(_path) {
  return path.posix.join('static', _path);
}

module.exports = {
  mode: 'development',
  entry: { index: './src/index.js' },
  devtool: 'eval-source-map',
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 8888,
    open: true,
    compress: true,
    hot: true,
    contentBase: [path.resolve(__dirname, 'static'), resolve('mockData')],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000000,
          name: assetsPath('img/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                compileType: 'module',
                mode: 'local',
                auto: true,
                exportGlobals: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                localIdentContext: path.resolve(__dirname, 'src'),
                localIdentHashPrefix: 'my-custom-hash',
                namedExport: true,
                exportLocalsConvention: 'camelCase',
                exportOnlyLocals: false,
              },
            },
          },
          // 'postcss-loader',
        ],
        include: [resolve('src')],
      },
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader'],
      //   include: /node_modules/,
      // },
    ],
  },
  plugins: [
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true,
      minify: {
        minifyJS: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.css',
    }),
    new CleanWebpackPlugin(),
  ],
};
