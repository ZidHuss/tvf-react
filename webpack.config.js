const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: `${__dirname}/src/index.jsx`,

  mode: 'development',

  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      `${__dirname}/src`,
      'node_modules',
    ]
  },

  output: {
    filename: 'bundle.js',
    path: `${__dirname}/build`,
  },

  devServer: {
    host: '0.0.0.0',
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
        ],
      },
      {
        test: /\.s?css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('postcss-import')(),
                require('precss')(),
              ],
            }
          },
        ],
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: `./src/index.html`,
      inject: 'body'
    })
  ]
}
