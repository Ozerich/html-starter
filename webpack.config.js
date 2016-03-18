'use strict';

let path = require("path");
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let SvgStore = require('webpack-svgstore-plugin');
let HandlebarsPlugin = require("handlebars-webpack-plugin");

module.exports = {
    context: __dirname + "/app",
    entry: {
        all: './main'
    },

    output: {
        path: __dirname + '/server',
        publicPath: '/',
        filename: '[name].js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                include: __dirname + '/app',
                loader: 'babel-loader?presets[]=es2015'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!autoprefixer-loader!resolve-url!sass')
            },
            {
                test: /\.(jpg|jpeg|gif|png)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=1024&name=images/[name].[ext]'
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'
            }

        ]
    },

    plugins: [
        new ExtractTextPlugin("./main.css", {allChunks: true, disable: process.env.NODE_ENV=="development"}),
        new SvgStore(path.join(__dirname + '/app/local/assets/images', 'svg', '**/*.svg'), path.join('./images', 'svg'), {
            name: '[hash].svg',
            chunk: 'app',
            prefix: 'icon-'
        }),
        new HandlebarsPlugin({
            entry: path.join(process.cwd(), "app", "templates", "home.hbs"),

            output: path.join(process.cwd(), "server", "index.html"),
            partials: [
                path.join(process.cwd(), "app", "templates", "partials", "*", "*.hbs")
            ]
        })
    ],

    devServer: {
        contentBase: __dirname + '/server'
    }
};