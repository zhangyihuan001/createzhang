let Hwp=require("html-webpack-plugin")
let Etp=require("extract-text-webpack-plugin")

module.exports={
    entry:__dirname+"/src/main.js",
    output:{
        path:__dirname+"/dist/",
        filename:"app.js"
    },
    devServer:{
        contentBase:__dirname+"/dist/",
        port:3000,
        inline:true,
        proxy:{
            "/zhuiszhu":{
                target:"http://39.105.136.190:3000"
            }
        }
    },
    devtool:"source-map",
    resolve:{
        alias:{
            "vue":"vue/dist/vue.js"
        }        
    },
    module:{
        rules:[
            {test:/\.css$/,loader:Etp.extract("css-loader")},
            {test:/\.less$/,loader:Etp.extract("css-loader!less-loader")},
            {test:/\.html$/,loader:"string-loader"},
            {test:/\.js$/,exclude:/node_modules/,loader:"babel-loader"}
        ]
    },
    plugins:[
        new Hwp({
            template:"src/index.html",
            filename:"index.html",
            inject:true
        }),
        new Etp("app.css")
    ]
}