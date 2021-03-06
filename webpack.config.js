const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin')

const host = process.env.API_HOST || "http://localhost:8080";

module.exports = {
    // https://webpack.js.org/concepts/mode/
    mode: 'development',
    entry: [path.resolve(__dirname, './src/index.tsx')],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/",
    },
    devtool: 'inline-source-map',
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
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['react'],
                    plugins: [["transform-react-jsx", { "pragma": "h" }], 'jsx-control-statements']
                }
            }]
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
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new webpack.DefinePlugin({
            API_HOST: JSON.stringify(host)
        }),
    ]
};
