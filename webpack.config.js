'use strict';

var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var SvgStore = require('webpack-svgstore-plugin');
var HandlebarsPlugin = require("handlebars-webpack-plugin");

module.exports = {
    context: __dirname + "/app",
    entry: {
        all: './main.js'
    },

    output: {
        path: __dirname + '/dist/local/assets',
        publicPath: '/',
        filename: './js/[name].js'
    },

    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(['css', 'autoprefixer-loader', 'resolve-url', 'sass'])
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
        new ExtractTextPlugin("./css/main.css", {allChunks: true}),
        new SvgStore(path.join(__dirname + '/app/local/assets/images', 'svg', '**/*.svg'), path.join('./images', 'svg'), {
            name: '[hash].svg',
            chunk: 'app',
            prefix: 'icon-'
        }),
        new HandlebarsPlugin({
            entry: path.join(process.cwd(), "app", "templates", "home.hbs"),

            output: path.join(process.cwd(), "dist", "html", "home.html"),
            partials: [
                path.join(process.cwd(), "app", "templates", "partials", "*", "*.hbs")
            ]
        })

    ]
};