const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'source', 'index.js'),
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '/build/',
        filename: 'index.js'
    },
    module: {
        rules: [ {
            test: /\.vue$/,
            use: 'vue-loader'
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.png$/,
            use: 'file-loader'
        } ]
    }
};
