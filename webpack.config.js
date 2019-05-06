const path = require('path');
const webpack = require('webpack');
const packageJSON = require('./package.json');

require('dotenv').config();

const common = {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name]/index.js'
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
    resolve: {
        extensions: [
            '.js',
            '.ts'
        ]
    },
    externals: [
        require('webpack-node-externals')()
    ],
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
            'babel-polyfill',
            './src/main' 
        ]
    },
    target: 'electron-main',
    plugins: [
        ...common.plugins,
        new webpack.DefinePlugin({
            'process.env.GOOGLE_OAUTH_CLIENT_ID': JSON.stringify(process.env.GOOGLE_OAUTH_CLIENT_ID),
            'process.env.GOOGLE_OAUTH_CLIENT_SECRET': JSON.stringify(process.env.GOOGLE_OAUTH_CLIENT_SECRET)
        })
    ]
};

const renderer = {
    ...common,
    entry: {
        renderer: './src/renderer'
    },
    target: 'electron-renderer'
};

module.exports = [
    main,
    renderer
];

