const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: ['./playground/app'],
  output: {
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'playground')
        ],
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'playground')
    },
    historyApiFallback: true,
    hot: true,
    client: {
      overlay: {
        warnings: true,
        errors: true
      }
    }
  },
  experiments: {
    lazyCompilation: true
  }
}
