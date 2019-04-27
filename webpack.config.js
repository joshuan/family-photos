const path = require('path');

module.exports = {
    entry: {
        main: './src/main',
    },
    target: 'electron-main',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name]/index.js'
    },
    module: {
        rules: [
            {
                test: /\.node$/,
                use: 'node-loader'
            }
        ]
    }
};
