const { FileSystemIconLoader } = require('unplugin-icons/loaders')
const Icons = require('unplugin-icons/webpack')
// 引入自动引入插件
const Components = require('unplugin-vue-components/webpack')
const IconsResolver = require('unplugin-icons/resolver')
const AutoImport = require('unplugin-auto-import/webpack')
// const {ElementPlusResolver} = require('unplugin-vue-components/resolvers')

module.exports = {
    outputDir: process.env.outputDir,
    filenameHashing: true,
    chainWebpack: config => {
        config.module.rule('vue').use('vue-loader').tap(options => {
            return options
        })

        // 使用webpack.DefinePlugin
        config.plugin('define').tap(args => {
            args[0]['process.env'].VERSION = (function () {
                const now = new Date()
                return now.getFullYear() + format(now.getMonth() + 1) + format(now.getDate()) + format(now.getHours()) + format(now.getMinutes())

                function format(num) {
                    return num < 10 ? '0' + num : '' + num
                }
            })()
            return args
        })
        config.plugin('html').tap(args=>{
            args[0].title = 'EDU Passport'
            return args;
        })
    },
    // 调整内部的 webpack 配置
    configureWebpack: {

        resolve: {
            // .mjs needed for https://github.com/graphql/graphql-js/issues/1272
            extensions: ['*', '.mjs', '.js', '.vue', '.json', '.gql', '.graphql']
        },
        module: {
            unknownContextCritical: false,
            rules: [ // fixes https://github.com/graphql/graphql-js/issues/1272
                {
                    test: /\.mjs$/,
                    include: /node_modules/,
                    type: 'javascript/auto'
                },
                {test: /\.txt$/, use: "raw-loader"},
                {
                    test: /\.js$/, //匹配所有的js文件
                    exclude: /node_modules/, //除了node_modules以外
                }
            ]
        },
        plugins:[
            AutoImport({
               resolvers:[

               ]
            }),
            Components({
                resolvers: [
                    IconsResolver({
                        prefix: 'icon',
                        alias: {
                            system: 'system-uicons'
                        },
                        // 标识自定义图标集
                        customCollections: ['login','edu','pc','mobile']
                    })
                ]
            }),
            Icons(
              {
                  compiler:'vue3',
                  autoInstall:true,
                  customCollections:{
                      login:FileSystemIconLoader('src/assets/svg/login',svg=>svg.replace(/^<svg /, '<svg fill="currentColor" ')),
                      edu:FileSystemIconLoader('src/assets/svg/edu',svg=>svg.replace(/^<svg /, '<svg fill="currentColor" ')),
                      pc:FileSystemIconLoader('src/assets/svg/pc',svg=>svg.replace(/^<svg /, '<svg fill="currentColor" ')),
                      mobile:FileSystemIconLoader('src/assets/svg/mobile',svg=>svg.replace(/^<svg /, '<svg fill="currentColor" ')),
                  }
              }
          )
        ],
        devServer: {
            allowedHosts: [
                'ea04-183-208-224-229.jp.ngrok.io'
            ],
            proxy: {
                '/hcaptcha': {
                    target: 'https://hcaptcha.com',
                    ws: true,
                    changeOrigin: true,
                    pathRewrite: {
                        '^/hcaptcha': '/'
                    }
                },
                '/compass': {
                    target: 'https://www.aicompasspro.com',
                    ws: true,
                    changeOrigin: true,
                    pathRewrite: {
                        '^/compass': '/'
                    }
                },
                '/crm': {
                    target: 'https://crm.zoho.com',
                    ws: true,
                    changeOrigin: true,
                    pathRewrite: {
                        '^/crm': '/'
                    }
                },
                '/zohoPublic': {
                    target: 'https://forms.zohopublic.com',
                    ws: true,
                    changeOrigin: true,
                    pathRewrite: {
                        '^/zohoPublic': '/'
                    }
                }
            }

        }


    }

}
