const path = require('path')

module.exports = [
  'source-map'
].map(devtool => ({
  entry: {
    index: './src/js/index.js',
    challenge2: './src/js/challenge2.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader', options: {modules: true}}
        ]
      },
      {
        test: /\.less$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'less-loader'},
        ]
      },
      {
        test: /\.tsx?$/, loader: 'ts-loader'
      },
      {
        test: /\.handlebars$/, loader: "handlebars-loader"
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/js')
  },
  devtool,
  watch: true,
  watchOptions: {
    aggregateTimeout: 2000
  }
}));
