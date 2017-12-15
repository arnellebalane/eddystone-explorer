const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'source', 'index.js'),
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'index.js'
    },
    module: {
        rules: [ {
            test: /\.vue$/,
            use: 'vue-loader'
        } ]
    }
};
