const path = require("path");
const apexnitroConfig = require("./apexnitro.config.json");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let styleRule;

if (apexnitroConfig.cssExtensions.includes('css')) {
  styleRule = {
    test: /\.css$/i,
    use: [
      MiniCssExtractPlugin.loader,
      { loader: "css-loader?-url" },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              [
                'postcss-preset-env',
                {},
              ],
            ],
          },
        },
      }
    ]
  };
}

if (apexnitroConfig.cssExtensions.includes('scss')) {
  styleRule = {
    test: /\.s[ac]ss$/i,
    use: [
      MiniCssExtractPlugin.loader,
      { loader: "css-loader?-url" },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              [
                'postcss-preset-env',
                {},
              ],
            ],
          },
        },
      },
      {
        loader: "sass-loader"
      }
    ]
  };
}

if (apexnitroConfig.cssExtensions.includes('less')) {
  styleRule = {
    test: /\.less$/,
    use: [
      MiniCssExtractPlugin.loader,
      { loader: "css-loader?-url" },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              [
                'postcss-preset-env',
                {},
              ],
            ],
          },
        },
      },
      {
        loader: "less-loader"
      }
    ]
  };
}

if (apexnitroConfig.cssExtensions.includes('styl')) {
  styleRule = {
    test: /\.styl$/,
    use: [
      MiniCssExtractPlugin.loader,
      { loader: "css-loader?-url" },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              [
                'postcss-preset-env',
                {},
              ],
            ],
          },
        },
      },
      {
        loader: "stylus-loader"
      }
    ]
  };
}

module.exports = {
  mode: "production",
  entry: [apexnitroConfig.mainCss, apexnitroConfig.mainJs],
  output: {
    path: path.resolve(apexnitroConfig.distFolder),
    library: apexnitroConfig.libraryName,
    filename: `${apexnitroConfig.libraryName}.min.js`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      styleRule
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${apexnitroConfig.libraryName}.min.css`
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(apexnitroConfig.srcFolder, "static"),
          to: path.resolve(apexnitroConfig.distFolder, "static")
        }
      ]
    })
  ]
};
