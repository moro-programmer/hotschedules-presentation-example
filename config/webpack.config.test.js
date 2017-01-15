const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const GLOBALS = {
    'process.env': {
        NODE_ENV: JSON.stringify('test')
    },
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'true'))
};

module.exports = {
    debug: true,
    cache: true,
    target: 'node',
    externals: [nodeExternals()],
    plugins: [new webpack.DefinePlugin(GLOBALS)],
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.scss']
    },
    module: {
        loaders: [
            // JavaScript / ES6
            {
                test: /\.jsx?$|\.js?$/,
                loader: ['babel']
            },
            // Sass + CSS Modules
            {
                test: /\.module.scss$/,
                include: [path.join(__dirname, '../src')],
                loaders: [
                    'style', {
                        loader: 'css',
                        query: {
                            modules: true,
                            sourceMap: false,
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
                            sourceMap: false
                        }
                    }
                ]
            }
        ]
    }
};
