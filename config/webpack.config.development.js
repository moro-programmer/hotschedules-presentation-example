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
    debug: true,
    cache: true,
    devtool: 'inline-source-map',
    entry: {
        application: [
            'webpack-hot-middleware/client', './src/index.jsx'
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(), new webpack.DefinePlugin(GLOBALS)
    ],

    module: {
        loaders: [
            // Sass + CSS Modules
            {
                test: /\.module.scss$/,
                include: [path.join(__dirname, '../src')],
                loaders: [
                    'style', {
                        loader: 'css',
                        query: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]--[hash:base64:5]'
                        }
                    },
                    'resolve-url',
                    'postcss', {
                        loader: 'sass',
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
                loaders: [
                    'style',
                    'css',
                    'postcss', {
                        loader: 'sass',
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
