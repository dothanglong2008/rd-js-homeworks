const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = [
    {
        mode: 'production',
        target: ['web', 'es5'],
        entry: ['./src/scss/styles.scss', './src/scss/_variables.scss', './src/scss/_base.scss', './src/js/index.js', './src/js/gameTemplate.js', './src/js/compare.js'],
        output: {
            filename: 'app.js',
            clean: true,
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                      loader: 'babel-loader',
                      options: {
                        presets: ['@babel/preset-env']
                      }
                    }
                  },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ],
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'style.css',
            }),
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
        ],
    },
]