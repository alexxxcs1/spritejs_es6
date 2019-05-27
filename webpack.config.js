const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin('css/[name]-css.css');
const extractSASS = new ExtractTextPlugin('css/[name]-sass.css');
const babelpolyfill = require("babel-polyfill");
//构建前删除dist目录
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {  
    entry: './src/js/index.js', //入口JS
    output: {    
        filename: './index.js',
        path: path.resolve(__dirname, './dist'),
    },
    module: {    
        rules: [
            {        
                test: /\.css$/,
                use: extractCSS.extract({                      
                    use: "css-loader",
                    fallback: "style-loader"        
                })      
            },        
            {        
                test: /\.scss$/,
                use: extractSASS.extract({          
                    use: [{loader: "css-loader"},{loader: "sass-loader"}],
                    fallback: "style-loader"        
                })      
            },        
            {        
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {          
                    loader: 'babel-loader',
                    options: {            
                        cacheDirectory: true //缓存            
                    }        
                }      
            },       
            { //打包css里的图片
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [{          
                loader:'url-loader',
                options: {           
                        limit: 1,//小于8KB,就base64编码
                        name: 'img/-[name]-[hash].[ext]',//在哪里生成
                        publicPath: './'   //在生成的文件引用,前面加
                    }
                }],
            },
            {
                test:/\.(mp3|m4a)$/i,
                use:'file-loader',
                use: [{          
                    loader:'file-loader',
                    options: {           
                            name: 'audio/[name].[ext]',//在哪里生成
                            publicPath: './'   //在生成的文件引用,前面加
                        }
                    }],
            }
      ]},
    plugins:[    
        new HtmlWebpackPlugin({            
        template: './src/index.html', // 模板文件          
              filename: 'index.html'    
        }),
        extractCSS,
        extractSASS,
        new CleanWebpackPlugin(['dist']),
    ]
        
}
