const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options:{
                    transpileOnly: true
                }
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: {
        port: 9000,
        host: '0.0.0.0',
    },
    plugins: [
        new HtmlWebpackPlugin({
          // index.html 템플릿을 기반으로 빌드 결과물을 추가해줌
          template: 'index.html',
        }),
        new ForkTsCheckerWebpackPlugin()
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};