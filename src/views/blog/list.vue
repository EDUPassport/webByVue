<template>
    <div class="us-bg">
        <el-row class="banner-row" :gutter="0" align="middle" justify="center">
            <el-col class="banner-bg" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <h1>Industry News</h1>
            </el-col>
        </el-row>
        <el-row class="news-container" align="middle" justify="center" v-loading="showLoadingStatus">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="news-t">
                    <div class="news-left-line"></div>
                    <div class="news-label">Industry News</div>
                </div>
                <div class="news-content">
                    <div class="news-item" v-for="(item,i) in blogListData" :key="i">
                        <div class="news-item-img-container">
                            <el-image class="news-item-img" :src="item.image_url"
                                      fit="cover"></el-image>
                        </div>
                        <div class="news-item-title">
                            {{item.title}}
                        </div>
                        <div class="news-item-desc">
                            {{item.desc}}
                        </div>
                        <div class="news-item-operation">
                            <div class="news-item-readmore">
                                <el-button type="primary" round @click="turnDetail(item.id)">Continue Reading
                                </el-button>
                            </div>
                            <div class="social-share-container">

                                <div class="social-share-icon-container"
                                     @mouseover="showSocialShareExpandStatus=true"
                                     @click="showSocialShareExpandStatus = !showSocialShareExpandStatus"
                                     >
                                    <el-icon :size="30">
                                        <Share/>
                                    </el-icon>
                                </div>

                                <div class="social-share-icon-expand" v-if="showSocialShareExpandStatus"
                                     @mouseleave="showSocialShareExpandStatus = false"
                                >
                                    <ShareNetwork
                                            network="Twitter"
                                            :url="locationUrl+'/blog/detail?id='+item.id"
                                            :title="item.title == undefined ? '' : item.title"
                                            :hashtags="item.tags == undefined ? '' : item.tags"
                                    >
                                        <i class="iconfont el-icon-alitwitter xll-icon"></i>
                                    </ShareNetwork>
                                    <ShareNetwork
                                            network="LinkedIn"
                                            :url="locationUrl+'/blog/detail?id='+item.id"
                                            :title="item.title == undefined ? '' : item.title"
                                    >
                                        <i class="iconfont el-icon-alilinkedin xll-icon"></i>
                                    </ShareNetwork>
                                    <ShareNetwork
                                            network="Facebook"
                                            :url="locationUrl+'/blog/detail?id='+item.id"
                                            :title="item.title == undefined ? '' : item.title"
                                            :description="item.content == undefined ? '' : item.content"
                                            :quote="item.title == undefined ? '' : item.title"
                                            :hashtags="item.tags == undefined ? '' : item.tags"
                                    >
                                        <i class="iconfont el-icon-alifacebook xll-icon"></i>
                                    </ShareNetwork>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                <div>
                    <el-pagination layout="prev, pager, next" :default-current-page="1"
                                   @size-change="pageSizeChange"
                                   @current-change="pageChange"
                                   :current-page="page" :page-size="limit"
                                   :total="totalNum"></el-pagination>
                </div>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {BLOG_LIST} from "@/api/api";

    export default {
        name: "news",
        beforeRouteUpdate(to) {
            console.log(to, "=====");
            let cateId = to.query.cate_id
            let adminId = to.query.admin_id
            this.getBlogList(cateId, adminId)
        },
        data() {
            return {
                blogListData: [],
                showSocialShareExpandStatus: false,
                locationUrl: '',
                page:1,
                limit:5,
                totalNum:0,
                showLoadingStatus:true
            }
        },
        created() {
            let cateId = this.$route.query.cate_id
            let adminId = this.$route.query.admin_id
            this.getBlogList(cateId, adminId)
        },
        mounted() {
            console.log('abc')
            let locationUrl = window.location.href;
            let domain = locationUrl.split('/')

            this.locationUrl = domain[0] + '//' + domain[2]

        },
        methods: {
            pageSizeChange(e) {
                console.log(e)
            },
            pageChange(e) {
                this.showLoadingStatus = true;
                this.page = e
                let cateId = this.$route.query.cate_id
                let adminId = this.$route.query.admin_id
                this.getBlogList(cateId, adminId)
            },
            getBlogList(cateId, adminId) {
                let params = {
                    page: this.page,
                    limit: this.limit
                }


                if (cateId && cateId != undefined) {
                    params.cate_id = cateId
                }

                if (adminId && adminId != undefined) {
                    params.admin_id = adminId
                }

                BLOG_LIST(params).then(res => {
                    console.log(res)
                    if (res.code == 200) {
                        this.blogListData = res.message.data;
                        this.totalNum = res.message.total;
                        this.showLoadingStatus= false

                    }
                }).catch(err=>{
                  console.log(err)
                  this.$message.error(err.msg)
                })

            },
            turnDetail(id) {
                this.$router.push({path: '/blog/detail', query: {id: id}})
            }

        }
    }
</script>

<style scoped>
    .us-bg {
        background-color: #FFFFFF;
    }

    .banner-bg {
        height: 200px;
        background-image: url("../../assets/bg/wheat.png");
        background-size: 50%;
        background-repeat: repeat;
        background-position: center;
    }

    .banner-bg h1 {
        height: 100%;
        background-color: rgba(0, 0, 0, 0.2);
        font-size: 28px;
        font-weight: bold;
        color: #FFFFFF;
        line-height: 200px;
    }

    .news-container {
        width: 900px;
        padding: 20px;
        margin: 0 auto;
    }

    .news-t {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }

    .news-left-line {
        width: 4px;
        height: 40px;
        border-radius: 4px;
        background-color: #00b3d2;
    }

    .news-label {
        font-size: 24px;
        font-weight: bold;
    }

    .news-content {
        padding: 20px;
    }

    .news-item {
        padding: 10px;
        margin-top: 20px;
        border-bottom: 1px solid #EEEEEE;
    }

    .news-item-img-container {
        width: 100%;
        height: 300px;
        border: 1px solid #EEEEEE;
        overflow: hidden;
        border-radius: 20px;
    }

    .news-item-img {
        width: 100%;
        border-radius: 20px;
    }

    .news-item-title {
        font-size: 16px;
        font-weight: bold;
        text-align: left;
        padding-top:10px;
    }

    .news-item-desc {
        font-size: 14px;
        color: #808080;
        text-align: left;
    }

    .news-item-operation {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        padding: 10px 0;
    }

    .news-item-readmore {

    }

    .news-item-share {
        margin-left: 10px;
    }

    .social-share-container {
        text-align: left;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        margin-left: 10px;
    }

    .social-share-icon-container {
        width: 40px;
        height: 40px;
        border: 2px solid #1E7AA2;
        background-color: #FFFFFF;
        border-radius: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .social-share-icon-expand {
        font-size: 14px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }

    .social-share-icon-expand >>> a {
        margin-left: -6px;
        background-color: #FFFFFF;
        width: 40px;
        height: 40px;
        border: 2px solid #000000;
        display: flex;
        border-radius: 40px;
        justify-content: center;
        align-items: center;
        text-decoration: none;
    }

    .xll-icon {
        font-size: 30px;
    }


</style>
