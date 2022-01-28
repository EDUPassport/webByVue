<template>
    <div>
        <div class="section-one-bg">
            <div class="section-one-pushcart">
                <div class="section-one-pushcart-mask">
                    <el-image class="section-one-pushcart-img" :src="pushcartLogoImg"></el-image>
                </div>
            </div>
            <div class="my-wrapper">
                <div class="section-one-content">
                    <div class="section-one-label">
                        TRUSTED BY SCHOOLS COUNTRYWIDE
                    </div>
                    <div class="section-one-tags">
                        <div class="section-one-tag">
                            <el-image class="section-one-tag-img" :src="section1logo1Img" fit="cover"></el-image>
                        </div>
                        <div class="section-one-tag">
                            <el-image class="section-one-tag-img" :src="section1logo2Img" fit="cover"></el-image>
                        </div>
                        <div class="section-one-tag">
                            <el-image class="section-one-tag-img" :src="section1logo3Img" fit="cover"></el-image>
                        </div>
                        <div class="section-one-tag">
                            <el-image class="section-one-tag-img" :src="section1logo4Img" fit="cover"></el-image>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="section-two-bg">
            <div class="section-display section-width">
                <div class="section-two-l">
                    <div class="section-two-l-mask">
                        FOOD <br>
                        EDUCATION
                    </div>
                </div>
                <div class="section-two-r">
                    <div class="section-two-r-label">OUR MISSION</div>
                    <div class="section-two-r-label-underline"></div>
                    <p>Education professionals around the world face the same problems. As businesses grapple with high
                        staff turnover rates, broken contracts, and increasing competition, educators dodge scams,
                        battle with discrimination, and fight for equal pay - it's the same story everywhere. ESL
                        Passport is on a mission to put a stop to practices like these and redefine the international
                        education market. We're the world's first hub of information, resources, and impartial support
                        aimed at anyone and everyone in the industry. Our digital platform sets new standards of
                        transparency and accountability, and our in-person services support your professional growth. By
                        shining a light on the good and rebuilding the bad, we're erasing the uncertainty and mistrust
                        that plague the sector and helping everyone - educators, recruiters, and businesses - reach
                        their full potential. We're not here to find you a job or send you a teacher. We don't accept
                        commission. And we're not your competition. Our aim is simply to make the international
                        education market a more ethical and reliable place for everyone in it.</p>
                </div>
            </div>
        </div>

        <div class="section-three-bg">
            <div class="section-display section-width">
                <div class="section-three-l">
                    <div class="section-three-l-label">CORE VALUES</div>
                    <div class="section-three-l-label-underline"></div>
                    <div class="section-three-l-container">
                        <div class="section-three-l-item">
                            <div class="section-three-l-l">
                                <el-image class="section-three-l-l-img" :src="section32Img"></el-image>
                            </div>
                            <div class="section-three-l-r">
                                <h4>HONESTY</h4>
                                <p>
                                    honesty honesty honesty honesty honesty honesty honesty honesty
                                    honesty honesty honesty honesty honesty honesty honesty honesty
                                    honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty
                                    honesty honesty
                                    honesty honesty honesty honesty honesty honesty honesty honesty
                                    honesty honesty honesty honesty honesty honesty honesty honesty
                                </p>
                            </div>
                        </div>
                        <div class="section-three-l-item">
                            <div class="section-three-l-l">
                                <el-image class="section-three-l-l-img" :src="section31Img"></el-image>
                            </div>
                            <div class="section-three-l-r">
                                <h4>HONESTY</h4>
                                <p>
                                    honesty honesty honesty honesty honesty honesty honesty honesty
                                    honesty honesty honesty honesty honesty honesty honesty honesty
                                    honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty
                                    honesty honesty
                                    honesty honesty honesty honesty honesty honesty honesty honesty
                                    honesty honesty honesty honesty honesty honesty honesty honesty
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="section-three-r">
                    <div class="section-three-r-container">
                        <div class="section-three-r-item">
                            <el-image class="section-three-r-item-img" :src="section33Img" fit="cover"></el-image>
                        </div>
                        <div class="section-three-r-item">
                            <el-image class="section-three-r-item-img" :src="section34Img" fit="cover"></el-image>
                        </div>
                        <div class="section-three-r-item">
                            <el-image class="section-three-r-item-img" :src="section35Img" fit="cover"></el-image>
                        </div>
                        <div class="section-three-r-item">
                            <el-image class="section-three-r-item-img" :src="section33Img" fit="cover"></el-image>
                        </div>
                    </div>
                    <div class="section-three-r-b"></div>

                    <div class="section-three-r-mask"></div>

                </div>

            </div>
        </div>

        <div class="section-four-bg">
            <div class="section-four-bg-2">
                <div class="section-width section-display-mid">
                    <div class="section-four-l">

                        <swiper
                                @slideChange="section4SlideChange"
                                :slidesPerView="3"
                                :initialSlide="1"
                                 :centeredSlides="true"
                                 :spaceBetween="20"
                                 :loop="true"
                                 :autoplay='{"delay": 2500,"disableOnInteraction": false,"pauseOnMouseEnter":true}'
                                 class="mySwiper">
                            <swiper-slide class="mySwiper-slide" v-slot="{ isActive }"
                                          v-for="(slideContent, index) in section4SlideData"
                                          :key="index"
                            >
                                <div class="section-four-l-item " :class="isActive ? 'section-four-l-item-active' : '' ">
                                    <el-image class="section-four-l-item-img" :src="slideContent.url" fit="cover"></el-image>
                                </div>
                            </swiper-slide>

                        </swiper>
                    </div>
                    <div class="section-four-r">
                        <div class="section-four-r-icon"></div>
                        <p>
                            {{section4SlideDetailData.text}}
                        </p>

                        <div class="section-four-r-name">
                            {{section4SlideDetailData.name}}
                        </div>
                        <div class="section-four-r-intro">
                            {{section4SlideDetailData.intro}}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="section-five-bg">
            <subscribeCompent></subscribeCompent>
        </div>

    </div>
</template>

<script>
    import subscribeCompent from "../../components/consulting/subscribe";
    import sectionOneBgImg from '@/assets/partners/background.jpg'
    import pushcartLogoImg from '@/assets/partners/pushcart-logo.jpg'
    import section31Img from '@/assets/partners/section-3-1.png'
    import section32Img from '@/assets/partners/section-3-2.png'
    import section33Img from '@/assets/partners/section-3-3.png'
    import section34Img from '@/assets/partners/section-3-4.png'
    import section35Img from '@/assets/partners/section-3-5.png'
    import section41Img from '@/assets/partners/section-4-1.png'

    import section1logo1Img from '@/assets/partners/logos/logo-1.jpg'
    import section1logo2Img from '@/assets/partners/logos/logo-2.jpg'
    import section1logo3Img from '@/assets/partners/logos/logo-3.jpg'
    import section1logo4Img from '@/assets/partners/logos/logo-4.png'

    // Import Swiper Vue.js components
    import {Swiper, SwiperSlide} from 'swiper/vue';
    import SwiperCore, {Autoplay} from 'swiper';
    SwiperCore.use([Autoplay]);
    // Import Swiper styles
    import 'swiper/css';
    import {reactive} from 'vue'


    export default {
        name: "foodEducation",
        data() {
            return {
                sectionOneBgImg,
                pushcartLogoImg,
                section31Img,
                section32Img,
                section33Img,
                section34Img,
                section35Img,
                section41Img,
                section1logo1Img,
                section1logo2Img,
                section1logo3Img,
                section1logo4Img,


            }
        },
        setup() {
            const  section4SlideData = [
                    {
                        id:1,
                        url:section41Img,
                        text:'honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty',
                        name:'Kofi Smith',
                        intro:'GM at Hacksons Internations!'
                    },
                    {
                        id:2,
                        url:section1logo3Img,
                        text:'honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honestyhonesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty',
                        name:'Kangkang',
                        intro:'GM at Hacksons Internations!'
                    },
                    {
                        id:3,
                        url:section1logo2Img,
                        text:'honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty',
                        name:'Faker',
                        intro:'GM at Hacksons Internations!'
                    },
                    {
                        id:4,
                        url:section1logo4Img,
                        text:'honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty honesty',
                        name:'Memberory',
                        intro:'GM at Hacksons Internations!'
                    },
                ]

            const section4SlideDetailData = reactive(section4SlideData[0])

            return {
                section4SlideData,
                section4SlideDetailData
            }

        },
        components: {
            subscribeCompent,
            Swiper,
            SwiperSlide,
        },
        methods:{
            section4SlideChange(e){
                console.log(e.realIndex)
                this.$nextTick(function(){
                    this.section4SlideDetailData = this.section4SlideData[e.realIndex]
                })
                this.$forceUpdate()
                // console.log(this.section4SlideDetailData)

            },

        }
    }
</script>

<style scoped>
    .section-one-bg {
        background-image: url("../../assets/partners/background.jpg");
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    }

    .section-one-pushcart {
        padding: 40px 100px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: right;
    }

    .section-one-pushcart-mask {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 10px;
    }

    .section-one-pushcart-img {
        width: 240px;
        height: 240px;
    }

    .my-wrapper {
        background-image: url("../../assets/partners/section-1-1.png");
        background-size: 110% 110%;
        background-position: center;
        background-repeat: no-repeat;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        padding: 80px;
    }

    .section-one-content {

        width: 50%;
        padding: 20px;
        text-align: right;

    }

    .section-one-label {
        font-size: 16px;
        text-align: center;
        font-weight: bold;
        color: #403f3d;
    }

    .section-one-tags {
        margin-top: 40px;
        padding-right: 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .section-one-tag {
        /*font-size: 24px;*/
        color: #434750;
        /*font-weight: bold;*/
        margin-left: 10px;
        background-color: #ffffff;
        border-radius: 10px;
        padding: 10px;
        overflow: hidden;
    }

    .section-one-tag-img {
        width: 100%;
        height: 100%;
    }

    .section-two-bg {
        background-color: #ffffff;

    }

    .section-two-l {
        width: 50%;
        background-image: url("../../assets/partners/section-2-l.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 20px;
        overflow: hidden;

    }

    .section-two-l-mask {
        width: 100%;
        height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 34px;
        font-weight: bold;
        color: #ffffff;
        background-color: rgba(0, 0, 0, 0.2);
    }

    .section-two-r {
        width: 50%;
        padding-left: 20px;
    }

    .section-two-r-label {
        font-size: 22px;
        font-weight: bold;
        text-align: left;
    }

    .section-two-r-label-underline {
        background-color: #ff4d51;
        width: 60px;
        height: 2px;
    }

    .section-two-r p {
        text-align: left;
        font-size: 18px;
        margin-top: 20px;
    }

    .section-three-bg {
        background-color: #f3f3f3;
    }

    .section-three-l {
        width: 30%;
    }

    .section-three-l-label {
        font-size: 22px;
        font-weight: bold;
        text-align: left;
    }

    .section-three-l-label-underline {
        background-color: #ff4d51;
        width: 60px;
        height: 2px;
    }

    .section-three-l-container {
        padding: 40px 0;
    }

    .section-three-l-item {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
        margin-top: 20px;
    }

    .section-three-l-l {
        width: 20%;
        text-align: left;
    }

    .section-three-l-l-img {
        width: 45px;
        height: 45px;
        border-radius: 10px;
    }

    .section-three-l-r {
        width: 80%;
    }

    .section-three-l-r h4 {
        text-align: left;
    }

    .section-three-l-r p {
        text-align: left;
        margin-top: 20px;
        color: #7F7F7F;
        font-size: 14px;
    }


    .section-three-r {
        width: 45%;
        margin-left: 5%;
        background-color: #0a1e76;
        border-radius: 20px;
        overflow: hidden;
        -webkit-box-reflect: below 10px -webkit-linear-gradient(transparent,transparent 50%, rgba(255,255,255,0.6) ) ;
        position: relative;
    }
    .section-three-r-mask{
        position: absolute;
        right: 0;
        top: 0;
        width: 60px;
        height: 100%;
        background-color: #f3f3f3;
    }
    .section-three-r-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        background-color: #ffffff;
        padding: 20px;
    }

    .section-three-r-item {
        width: 45%;
        height: 200px;
        margin: 10px;
    }

    .section-three-r-item-img {
        height: 100%;
        border-radius: 20px;
    }

    .section-three-r-b {
        height: 40px;
    }

    @media screen and (min-width: 1100px) {
        .section-width {
            width: 1100px;
            margin: 0 auto;
        }
    }

    .section-width {

    }

    .section-display {
        padding: 60px 40px;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
    }

    .section-display-mid {
        padding: 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .section-four-bg {
        background-color: #ffffff;
        padding: 60px 0;
    }

    .section-four-bg-2 {
        background-color: #0a1e76;
    }

    .section-four-l {
        width: 50%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }

    .mySwiper {
        width: 100%;
        height: 400px;
        position: relative;
    }
    .mySwiper-slide{
        position: relative;

    }

    .section-four-l-item {
        width:100%;
        height: 400px;

        overflow: hidden;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .section-four-l-item-img {
        width: 100%;
        height: 300px;
        background-color: #ffffff;

        border: 1px solid #EEEEEE;
        /*border: 1px solid #7F7F7F;*/
        border-radius: 20px;
        box-shadow: 2px 17px 21px 4px rgba(0, 0, 0, 0.81);
    }

    .section-four-l-item-active {
        transform: scale(1.2);
        z-index: 10000;
        border-radius: 20px;
    }

    .section-four-r {
        width: 40%;
        color: #ffffff;
        text-align: left;
        padding-left: 20px;
    }

    .section-four-r p {
        font-size: 16px;
    }

    .section-four-r-icon {

    }

    .section-four-r-name {
        margin-top: 20px;
    }

    .section-four-r-intro {
        color: #00B2D2;
    }


</style>
