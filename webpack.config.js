const path = require('path');
const PugPlugin = require('pug-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/views/index.pug',      // output index.html
    //"colors-and-fonts": "./src/views/colors-and-fonts.pug",
    //"fields-and-buttons": "./src/views/fields-and-buttons.pug",
    //"test": "./src/views/test.pug",
  },
  stats: {
    errorDetails: true,
  },

  output: {
    path: path.join(__dirname, 'dist/'),
    publicPath: '/',
    filename: 'assets/js/[name].[contenthash:8].js',
    clean: true,
  },
  devServer: {
    static: './dist',
  },
  resolve: {
    alias: {
      // use alias to avoid relative paths like `./../../images/`
      Images: path.join(__dirname, './src/images/'),
      Fonts: path.join(__dirname, './src/fonts/')
    }
  },
  plugins: [
    // enable using Pug files as entry point
    new PugPlugin({
      pretty: true, // formatting HTML, should be used in development mode only
      css: {
        // output filename of CSS files
        filename: 'assets/css/[name].[contenthash:8].css'
      },
    })
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: PugPlugin.loader, // the Pug loader
      },
      {
        test: /\.(css|sass|scss)$/,
        use: ['css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|jpeg|ico)/,
        type: 'asset/resource',
        generator: {
          // output filename of images
          filename: 'assets/img/[name].[hash:8][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        type: 'asset/resource',
        generator: {
          // output filename of fonts
          filename: 'assets/fonts/[name][ext][query]',
        },
      },
    ],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        scripts: {
          test: /\.(js|ts)$/,
          chunks: 'all',
        },
      },
    },
  },
};