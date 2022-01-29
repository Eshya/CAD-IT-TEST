const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')
const { version } = require('./package.json')

const DIST_FOLDER = path.join(__dirname, 'dist')

module.exports = {
    mode: 'development',
   
    entry: {
      page: './src/page.js'
    },
      
    output: {
        path: DIST_FOLDER,
        filename: 'bundle.js',
        clean:true
        
    },
    plugins: [
      
        new CopyWebpackPlugin({
          patterns: [
            { context: './src', from: '*.css' },
            { context: './src', from: '*.js' }
          ]

        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: false,
            version
          })
       


    ],
    // plugins: [
    //   new MergeIntoSingleFilePlugin({
    //     "bundle.js": [
    //       path.resolve(__dirname, 'src/page.js')
         
    //     ],
    //     "bundle.css": [
    //       path.resolve(__dirname, 'src/style.css')
    //     ]
    //   })
    // ],
    // devtool: 'source-map',
    // devServer: {
    //     contentBase: DIST_FOLDER
    // }
}