'use strict';

let path = require("path");
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let SvgStore = require('webpack-svgstore-plugin');
let HandlebarsPlugin = require("handlebars-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    context: __dirname + "/app",
    entry: {
        all: './main'
    },

    output: {
        path: NODE_ENV == 'development' ? __dirname + '/server' : __dirname + '/dist/local/assets',
        publicPath: '/',
        filename: NODE_ENV == 'development' ? '[name].js' : './js/[name].js'
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
        new ExtractTextPlugin( NODE_ENV == 'development' ? "./main.css" : './css/main.css', {allChunks: true, disable: NODE_ENV == 'development'}),
        new SvgStore(path.join(__dirname + '/app/local/assets/images', 'svg', '**/*.svg'), path.join('./images', 'svg'), {
            name: '[hash].svg',
            chunk: 'app',
            prefix: 'icon-'
        }),
        new HandlebarsPlugin({
            entry: path.join(process.cwd(), "app", "templates", "home.hbs"),

            output: NODE_ENV == 'development' ?  path.join(process.cwd(), "server", "index.html") : path.join(process.cwd(), "dist", "html", "index.html"),
            partials: [
                path.join(process.cwd(), "app", "templates", "partials", "*", "*.hbs")
            ]
        })
    ],

    devServer: {
        contentBase: __dirname + '/server'
    }
};