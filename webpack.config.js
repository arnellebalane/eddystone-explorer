const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'source', 'index.js'),
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '/build/',
        filename: 'index.js'
    },
    devtool: 'source-map',
    module: {
        rules: [ {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    js: 'babel-loader'
                }
            }
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.png$/,
            loader: 'file-loader'
        } ]
    }
};
