const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack')
const {
  SPOTIFY_CALLBACK_URL,
  SPOTIFY_CLIENT_ID,
} = process.env

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.tsx'),
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    publicPath: '/',
    port: 9000,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      lib: path.resolve(__dirname, 'src/lib/'),
    }
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Lev Code Sample',
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'SPOTIFY_CLIENT_ID': JSON.stringify(SPOTIFY_CLIENT_ID),
      'SPOTIFY_CALLBACK_URL': JSON.stringify(SPOTIFY_CALLBACK_URL),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              eslintPath: require.resolve('eslint'),

            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
}