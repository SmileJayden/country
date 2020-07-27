const path = require('path');
const HTMLplugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, options) => {
  const config = {
    mode: options.mode,
    entry: path.join(__dirname, 'index.tsx'),
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: '[name].bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.jsx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
          exclude: /node_module/,
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader',
        },
        {
          test: /\.(woff|woff2|ttf|eot)$/,
          use: 'file-loader?name=fonts/[name].[ext]!static',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      alias: {
        '~': path.resolve(__dirname, 'src'),
      },
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    plugins: [
      new HTMLplugin({
        template: './index.html',
      }),
    ],
  };

  if (options.mode === 'production') {
    config.plugins = [
      ...config.plugins,
      new CleanWebpackPlugin(),
      new BundleAnalyzerPlugin(),
    ];
  } else if (options.mode === 'development') {
    config.devtool = 'eval-source-map';
  }

  return config;
};
