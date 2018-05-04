const path = require("path");

module.exports = {
    entry: [path.resolve(__dirname, './index.jsx')],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            exclude: /node_modules/,
            enforce: 'pre',
            loader: 'tslint-loader',
            options: {
                failOnHint: true
            }
        },
        {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loader: 'ts-loader'
        }]
    },
    resolve: {
        extensions: ['.ts', '.tsx']
    }
};
