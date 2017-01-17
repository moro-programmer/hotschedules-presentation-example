const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('./webpack.config.base');

const GLOBALS = {
    'process.env': {
        NODE_ENV: JSON.stringify('development')
    },
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'true'))
};

module.exports = merge(config, {
    devtool: 'inline-source-map',
    entry: {
        application: ['webpack-hot-middleware/client', './src/index.jsx']
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({ minimize: false, debug: false, cache: true }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin(GLOBALS)
    ],

    module: {
        rules: [
            // Sass + CSS Modules
            {
                test: /\.module.scss$/,
                include: [path.join(__dirname, '../src')],
                use: [
                    'style-loader', {
                        loader: 'css-loader',
                        query: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]--[hash:base64:5]'
                        }
                    },
                    'resolve-url-loader',
                    'postcss-loader', {
                        loader: 'sass-loader',
                        query: {
                            outputStyle: 'expanded',
                            sourceMap: true
                        }
                    }
                ]
            },
            // Sass
            {
                test: /\.scss$/,
                exclude: [
                    'node_modules/', /src\/.*.module.scss$/
                ],
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader', {
                        loader: 'sass-loader',
                        query: {
                            outputStyle: 'expanded',
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    }
});
