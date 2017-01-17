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
    target: 'node',
    externals: [nodeExternals()],
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true, cache: true}),
        new webpack.DefinePlugin(GLOBALS)
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.scss']
    },
    module: {
        rules: [
            // JavaScript / ES6
            {
                test: /\.jsx?$|\.js?$/,
                use: 'babel-loader'
            },
            // Sass + CSS Modules
            {
                test: /\.module.scss$/,
                include: [path.join(__dirname, '../src')],
                use: [
                    'style-loader', {
                        loader: 'css-loader',
                        query: {
                            modules: true,
                            sourceMap: false,
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
                loaders: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader', {
                        loader: 'sass-loader',
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
