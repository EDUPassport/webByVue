<template>
    <div class="bg"></div>
</template>

<script>
    import {INTERNATIONAL_REGISTER} from "../../api/api";
    import md5 from 'js-md5'
    import {decode} from 'js-base64'

    export default {
        name: "exchangeInfo",
        props:['info'],
        setup(props,context){
          console.log(props.info)
          console.log(context)

            const accountInfo =  JSON.parse(decode(props.info))
            const envName =  process.env.VUE_APP_ENV_NAME

            return {
              accountInfo,
                envName
            }

        },
        mounted() {
            let accountInfo = this.accountInfo

            if(accountInfo && JSON.stringify(accountInfo) !== '{}' ){
                this.internationalRegister(accountInfo.email,accountInfo.first_name,accountInfo.last_name)
            }

        },
        methods: {
            internationalRegister(email, firstName, lastName) {
                let self = this;

                let emailArr = email.split('@')
                let emailFirstChar = emailArr[0].substr(0, 1)
                let emailLastChar = emailArr[0].substr(-1)

                let emailStr = emailFirstChar + emailLastChar + email;


                this.$loading({
                    text:'Redirecting...'
                })

                let params = {
                    email: email,
                    code: md5(emailStr),
                    first_name: firstName,
                    last_name: lastName
                }

                INTERNATIONAL_REGISTER(params).then(res => {
                    console.log(res)
                    if (res.code === 200) {
                        localStorage.setItem('token', res.message.token)
                        localStorage.setItem('uid', res.message.id)
                        localStorage.setItem('identity', res.message.identity)
                        localStorage.setItem('language', res.message.language)
                        localStorage.setItem('email', res.message.email)
                        let identity = res.message.identity

                        if (identity == 1) {
                            let firstName = res.message.educator_info.first_name;
                            let lastName = res.message.educator_info.last_name;

                            let currentAvatar = 'https://oss.esl-passport.cn/educator.png'
                            if(res.message.educator_info.profile_photo){
                                currentAvatar = res.message.educator_info.profile_photo
                            }

                            localStorage.setItem('name', firstName + ' ' + lastName)
                            localStorage.setItem('first_name', firstName)
                            localStorage.setItem('last_name', lastName)

                            self.$store.commit('username',firstName + ' ' + lastName)
                            self.$store.commit('userAvatar',currentAvatar)
                            self.$store.commit('identity',identity)
                        }

                    }
                }).catch(err => {
                    console.log(err)
                    if (err.code === 400) {

                        let msgBoxMsg = 'China'

                        if (self.envName === 'developmentCN' || self.envName  === 'productionCN') {
                            msgBoxMsg = 'China'
                        }

                        if (self.envName  === 'development' || self.envName  === 'production') {
                            msgBoxMsg = 'Global'
                        }

                        self.$msgbox({
                            title: 'Welcome'+ ' '+ firstName+ ' ' + lastName,
                            message: 'Enjoy our '+ msgBoxMsg +' Services! You might need to re-login when applying for jobs',
                            type: 'success',
                            confirmButtonText:'Got it!',
                            callback: (action) => {
                                console.log(action)
                                if(action === 'confirm'){
                                    self.$router.push({path:'/edupassport',query:{email:email}})
                                }
                            }
                        })

                    }

                })

                this.$loading().close()

            }
        }
    }
</script>

<style scoped>
    .bg{

    }
</style>
