const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // https://webpack.js.org/concepts/mode/
    mode: 'development',
    entry: [path.resolve(__dirname, './src/index.tsx')],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/",
    },
    devServer: {
        historyApiFallback: true,
        contentBase: 'dist',
        port: 8000
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
        },
        {
            test: /\.html$/,
            exclude: /node_modules/,
            loader: "html-loader"
        }]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ]
};
