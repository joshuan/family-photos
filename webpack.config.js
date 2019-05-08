const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const packageJSON = require('./package.json');

require('dotenv').config();

const common = {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name]/index.js'
    },
    resolve: {
        extensions: [
            '.js',
            '.ts'
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.VERSION': JSON.stringify(packageJSON.version)
        })
    ]
};

const main = {
    ...common,
    entry: {
        main: [
            'source-map-support/register',
            'babel-polyfill',
            './src/main' 
        ]
    },
    target: 'electron-main',
    node: {
        __dirname: false
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-typescript',
                            [ 
                                '@babel/preset-env', 
                                {
                                    targets: {
                                        node: '12.1.0'
                                    }
                                }
                            ]
                        ],
                        plugins: [
                            '@babel/plugin-proposal-object-rest-spread'
                        ]
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            '@babel/plugin-proposal-object-rest-spread'
                        ]
                    }
                }
            },
            {
                test: /\.node$/,
                use: 'node-loader'
            }
        ]
    },
    plugins: [
        ...common.plugins,
        new webpack.DefinePlugin({
            'process.env.GOOGLE_OAUTH_CLIENT_ID': JSON.stringify(process.env.GOOGLE_OAUTH_CLIENT_ID),
            'process.env.GOOGLE_OAUTH_CLIENT_SECRET': JSON.stringify(process.env.GOOGLE_OAUTH_CLIENT_SECRET)
        })
    ],
    externals: [
        nodeExternals({
            whitelist: [
                /^((?!keytar).)*$/
            ]
        })
    ],
    devtool: 'inline-source-map'
};

const renderer = {
    ...common,
    entry: {
        renderer: [
            'babel-polyfill',
            './src/renderer'
        ]
    },
    target: 'electron-renderer',
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-typescript',
                            [ 
                                '@babel/preset-env', 
                                {
                                    targets: {
                                        chrome: '73'
                                    }
                                }
                            ]
                        ],
                        plugins: [
                            '@babel/plugin-proposal-object-rest-spread'
                        ]
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            '@babel/plugin-proposal-object-rest-spread'
                        ]
                    }
                }
            },
            {
                test: /\.node$/,
                use: 'node-loader'
            }
        ]
    }
};

module.exports = [
    main,
    renderer
];

