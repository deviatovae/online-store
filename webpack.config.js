const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, './src/index.ts'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
            },
            { 
              test: /\.tsx?$/, 
              use: 'ts-loader' },
            {
              test: /\.(png|svg|jpeg|)$/i,
              type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist'),
        assetModuleFilename: 'assets/[hash][ext][query]',
    },
    devServer: {
        port: 4200
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
    ]
};
