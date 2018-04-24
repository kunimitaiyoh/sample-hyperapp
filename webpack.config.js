const path = require("path");

module.exports = {
    entry: './index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                plugins: [["transform-react-jsx", { "pragma": "h" }]]
            }
        }]
    }
};
