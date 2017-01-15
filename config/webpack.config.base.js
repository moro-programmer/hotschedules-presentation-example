const path = require('path');
const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const FlowtypePlugin = require('flowtype-loader/plugin');
const autoprefixer = require('autoprefixer');
const postcssReporter = require('postcss-reporter');

module.exports = {
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, '../build'),
        publicPath: '/'
    },

    entry: {
        vendor: [
            'react',
            'react-dom',
            'react-redux',
            'redux',
            'classnames',
            'immutable',
            'react-css-modules'
        ]
    },

    plugins: [
        new FlowtypePlugin(),
        // Shared code
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/vendor.bundle.js',
            minChunks: Infinity
        }),
        new StyleLintPlugin({
            failOnError: false,
            context: 'src',
            files: '**/*.scss',
            quiet: false
        })
    ],

    resolve: {
        extensions: ['.js', '.jsx', '.json', '.scss']
    },

    module: {
        preLoaders: [
            {
                test: /\.js$|\.jsx$/,
                exclude: /node_modules/,
                loader: 'eslint'
            }, {
                test: /\.js$|\.jsx$/,
                exclude: /node_modules/,
                loader: 'flowtype'
            }
        ],

        loaders: [
            // JavaScript / ES6
            {
                test: /\.jsx?$|\.js?$/,
                include: [path.join(__dirname, '../src')],
                exclude: [/\.spec.js$/, /\.story.jsx$/],
                loader: ['babel']
            },
            // Images
            // Inline base64 URLs for <=8k images, direct URLs for the rest
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: 'url',
                query: {
                    limit: 8192,
                    name: 'images/[name].[ext]?[hash]'
                }
            },
            // Fonts
            {
                test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url',
                query: {
                    limit: 8192,
                    name: 'fonts/[name].[ext]?[hash]'
                }
            }
        ]
    },

    postcss() {
        return [autoprefixer({ browsers: ['last 2 versions'] }), postcssReporter()];
    }
};
