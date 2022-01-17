module.exports = {
    outputDir:process.env.outputDir,
    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap(options => {
                // 修改它的选项...
                return options
            })
    },
    // 调整内部的 webpack 配置
    configureWebpack: {
        resolve: {
            // .mjs needed for https://github.com/graphql/graphql-js/issues/1272
            extensions: ['*', '.mjs', '.js', '.vue', '.json', '.gql', '.graphql']
        },
        module: {
            unknownContextCritical:false,
            rules: [ // fixes https://github.com/graphql/graphql-js/issues/1272
                {
                    test: /\.mjs$/,
                    include: /node_modules/,
                    type: 'javascript/auto'
                },
                { test: /\.txt$/, use: "raw-loader" },
                {
                    test: /\.js$/, //匹配所有的js文件
                    exclude: /node_modules/, //除了node_modules以外
                }
            ]
        },
        devServer:{
            allowedHosts: [
                '6sqj4h.natappfree.cc'
            ],
            proxy:{
                '/hcaptcha':{
                    target:'https://hcaptcha.com',
                    ws:true,
                    changeOrigin:true,
                    pathRewrite:{
                        '^/hcaptcha':'/'
                    }
                }
            }

        }


    }

}
