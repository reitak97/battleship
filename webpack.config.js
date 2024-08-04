const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = {
    mode: 'development',
    entry: './src/JS/index.js',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        watchFiles: ['./src/index.html'],
        open: true,
    }
    ,
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
            template: './src/index.html',
            inject: 'head',
            scriptLoading: 'defer',
        }),
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean:true,

    },
}