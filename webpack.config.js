var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:5858',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [{
            test: /\.js$/,
            loaders: ['babel-loader'],
            exclude: /node_modules/,
            include: __dirname
        }, {
            test: /\.js$/,
            loaders: ['babel-loader'],
            include: path.join(__dirname, '..', '..', 'src')
        }, {
            test: /\.css?$/,
            use: [
                {
                    loader: "style-loader"
                },
                {
                    loader: "css-loader",
                    options:{
                        modules: true
                    }
                }
            ],
            include: __dirname
        }]
    }
};
