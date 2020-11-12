const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

function assetsPath(_path) {
  return path.posix.join('static', _path);
}

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'eval-source-map',

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },

  devServer: {
    port: 8888,
    open: true,
    compress: true,
    contentBase: [path.resolve(__dirname, 'static'), resolve('mockData')],

    hot: true,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000000,
          name: assetsPath('img/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: assetsPath('media/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: assetsPath('fonts/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              camelCase: true,
              localIdentName: '[name]_[local]_[hash:base64:5]',
            },
          },
        ],
        include: [resolve('src')],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: /node_modules/,
      },
      {
        test: /\.(md|json)$/,
        use: 'raw-loader',
      },
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

    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, 'src/images/*'),
    //     to: path.resolve(__dirname, 'static'),
    //   },
    // ]),
  ],
};
