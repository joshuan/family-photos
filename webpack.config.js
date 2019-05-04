const path = require('path');

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
                            '@babel/preset-env'
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
    ]
};

const main = {
    entry: {
        main: './src/main',
    },
    target: 'electron-main'
};

const renderer = {
    entry: {
        renderer: './src/renderer'
    },
    target: 'electron-renderer'
};

module.exports = [
    {
        ...common,
        ...main
    },
    {
        ...common,
        ...renderer
    }
];

