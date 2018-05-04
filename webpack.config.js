const path = require("path");

module.exports = {
    // https://webpack.js.org/concepts/mode/
    mode: 'development',
    entry: [path.resolve(__dirname, './src/app.ts')],
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
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        extensions: ['.ts', '.tsx']
    }
};
