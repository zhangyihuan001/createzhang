let Hwp = require("html-webpack-plugin")
let webpack=require("webpack")
let Ext=require("extract-text-webpack-plugin")

module.exports = {
    entry : __dirname + "/src/main.js",
    output : {
        path : __dirname + "/dist/",
        filename : "app.js",
        publicPath:"/"
    },
    devtool : "source-map",
    devServer : {
        contentBase : __dirname + "/dist/",
        port : 3000,
        inline : true,
        historyApiFallback:true,
        disableHostCheck:true,
        publicPath:"/",
        proxy : {
            "/goodslist" : {
                target : "http://cooc.fun:4200"
            }
        }
    },
    module : {
        rules : [
            {test : /\.css$/ , loader : Ext.extract("css-loader")},
            {test : /\.less$/ , loader : Ext.extract("css-loader!less-loader")},
            {test : /\.js$/, exclude : /node_modules/ , loader : "babel-loader"},
            {
                test:/\.(png|jepg|gif)$/i,
                use:[
                    {
                        loader:"url-loader",
                        options:{
                            limit:21000,
                            name:"[path][name].[ext]",
                            outputPath:"images/",
                            publicPath:"dist/"
                        }
                    }
                ]
            }
        ]
    },
    plugins : [
        new Hwp({
            template : "index.html",
            filename : "index.html",
            inject : true
        }),
        new webpack.ProvidePlugin({
            React:"react"
        }),
        new Ext("app.css")
    ]
}