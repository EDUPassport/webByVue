<template>
    <div class="bg">
        <div>
            <el-row class="detail-row" align="top" justify="start">
                <el-col class="detail-l-col" :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
                    <div class="job-title">{{detailData.job_title}}</div>
                    <div class="job-address-salary">
                        <div class="job-address">
                            {{detailData.address}}
                        </div>
                        <div class="job-salary">
                            {{detailData.currency}}{{detailData.salary_min}} - {{detailData.salary_max}}
                        </div>
                    </div>

                    <div class="job-desc-container">
                        <div class="job-desc-label">Job Description</div>
                        <div class="job-desc-label-underline"></div>
                        <div class="job-desc-content">
                            {{detailData.desc}}
                        </div>
                        <div class="job-tags">
                            <div class="job-tag">FullTime</div>
                            <div class="job-tag">Equal Opportunity</div>
                            <div class="job-tag">laboris</div>
                        </div>
                    </div>

                    <div class="job-details-container">
                        <div class="job-details-label">Job Details</div>
                        <div class="job-details-label-underline"></div>
                        <div class="job-details-content">
                            <div class="application-deadline">
                                <b>Application: </b>
                                <span>Dec 31, 2021</span>
                            </div>
                            <div class="start-date">
                                <b>Start Date: </b>
                                <span>Dec 31,2021</span>
                            </div>
                            <div class="number-vacancies">
                                <b>Number of Vacancies:</b>
                                <span>1</span>
                            </div>
                            <div class="class-size">
                                <b>Class Size:</b>
                                <span>10</span>
                            </div>
                            <div class="subjects">
                                <b>Subject(s):</b>
                                <span>English</span>
                                <span>Maths</span>
                            </div>
                            <div class="working-hours">

                            </div>
                            <div class="student-ages">
                                <b>Student Ages</b>
                                <span>Montessori(7-12yrs)</span>
                                <span>Montessori(7-12yrs)</span>
                                <span>Montessori(7-12yrs)</span>
                            </div>

                        </div>
                    </div>

                    <div class="compensation-container">
                        <div class="compensation-label">Compensation</div>
                        <div class="compensation-label-underline"></div>
                        <div class="compensation-content">
                            <div class="compensation-salary">
                                <b>Salary: </b>
                                <span> {{detailData.currency}}{{detailData.salary_min}} - {{detailData.salary_max}}</span>

                            </div>
                            <div class="compensation-payment">
                                <b>Payment: </b>
                                <span>{{detailData.payment_period_en}}</span>
                            </div>
                            <div class="compensation-class-size">
                                <b>Class Size: </b>
                                <span>{{detailData.class_size}}</span>
                            </div>
                            <div class="compensation-benefits">
                                <b>Benefits: </b>
                                <span>Work Visa</span>
                                <span>Work Visa</span>
                                <span>Work Visa</span>
                                <span>Work Visa</span>
                            </div>
                        </div>
                    </div>

                    <div class="qua-container">
                        <div class="qua-label">Qualification Requirements</div>
                        <div class="qua-label-underline"></div>
                        <div class="qua-content">
                            <div class="qua-teach-exp">
                                <b>Teaching Experience: </b>
                                <span>1-2yrs</span>
                            </div>
                            <div class="qua-age">
                                <b>Age: </b>
                                <span>18-44</span>
                            </div>
                            <div class="qua-education-req">
                                <b>Minimum Education Requirements: </b>
                                <span>Bachelors</span>
                            </div>
                        </div>
                    </div>

                    <div class="address-container">
                        <div class="address-label">Address & Location</div>
                        <div class="address-label-underline"></div>
                        <div class="address-content">
                            <div class="address-address">
                                <b>Address:</b>
                                <span>{{detailData.address}}</span>
                            </div>

                            <div class="address-location">
                                <b>Location: </b>
                            </div>
                        </div>

                    </div>

                    <div class="apply-btn-container">
                        <el-button class="apply-btn" type="info">Apply Now!</el-button>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="company-bio-container">
                        <div class="company-bio-label">Company Bio</div>
                        <div class="company-bio-label-underline"></div>
                        <div class="company-bio-content">
                            <div class="company-logo-container">
                                <el-image class="company-logo" v-if="detailData.business"
                                          :src="detailData.business.logo"></el-image>
                            </div>
                            <div class="company-bio-text" v-if="detailData.business">
                                {{detailData.business.business_bio}}
                                如果您从未用过 Google Cloud Console 来创建结算帐号或项目，点击开始使用按钮即可体验 Cloud Console 中面向新用户的交互式设置：
                                如果您从未用过 Google Cloud Console 来创建结算帐号或项目，点击开始使用按钮即可体验 Cloud Console 中面向新用户的交互式设置：
                                如果您从未用过 Google Cloud Console 来创建结算帐号或项目，点击开始使用按钮即可体验 Cloud Console 中面向新用户的交互式设置：
                                如果您从未用过 Google Cloud Console 来创建结算帐号或项目，点击开始使用按钮即可体验 Cloud Console 中面向新用户的交互式设置：
                                如果您从未用过 Google Cloud Console 来创建结算帐号或项目，点击开始使用按钮即可体验 Cloud Console 中面向新用户
                            </div>
                            <div class="view-profile-btn-container">
                                <el-button class="view-profile-btn" type="primary">View Profile</el-button>
                            </div>
                        </div>
                    </div>

                    <div class="contact-container">
                        <div class="contact-label">Contact Person</div>
                        <div class="contact-content">
                            <div class="contact-l">
                                <el-image></el-image>
                            </div>
                            <div class="contact-r">
                                <div class="contact-r-t">
                                    Hi I am John from Snow city.
                                </div>
                                <div class="contact-r-b">
                                    <el-button>Let's Chat!</el-button>
                                </div>
                            </div>
                        </div>
                    </div>

                    

                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
    import {JOB_DETAIL} from "@/api/api";

    export default {
        name: "detail",
        data() {
            return {
                detailData: {}
            }
        },
        mounted() {
            let jobId = this.$route.query.id;
            this.getJobDetail(jobId)
        },
        methods: {
            getJobDetail(id) {
                let params = {
                    job_id: id
                }
                JOB_DETAIL(params).then(res => {
                    console.log(res)
                    if (res.code == 200) {
                        this.detailData = res.message
                    }
                })

            }
        }
    }
</script>

<style scoped>
    .bg {
        background-color: #f5f6f7;
    }

    .detail-row {
        width: 1100px;
        margin: 0 auto;
        text-align: left;
    }

    .detail-l-col {
        padding: 20px;
    }

    .job-title {
        font-size: 24px;
        color: #ff2870;
    }

    .job-address-salary {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        font-weight: bold;
    }

    .job-address {
        color: #808080;
        font-size: 14px;
    }

    .job-salary {
        font-size: 14px;
        color: #ff2870;
    }

    .job-desc-container {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 20px;
        margin-top: 20px;
    }

    .job-desc-label {
        font-weight: bold;
        font-size: 18px;
    }

    .job-desc-label-underline {
        width: 100px;
        border: 1px solid #ff2870;
    }

    .job-desc-content {
        padding: 10px 0;
        font-size: 14px;
    }

    .job-tags {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }

    .job-tag {
        font-size: 14px;
        background-color: #ff2870;
        color: #ffffff;
        padding: 4px 10px;
        border-radius: 4px;
    }

    .job-tag:not(:first-child) {
        margin: 10px;
    }

    .job-details-container {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 20px;
        margin-top: 20px;
    }

    .job-details-label {
        font-weight: bold;
        font-size: 18px;
    }

    .job-details-label-underline {
        width: 100px;
        border: 1px solid #ff2870;
    }

    .job-details-content {
        font-size: 14px;
        padding: 10px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .application-deadline {
        padding: 10px 0;
    }

    .application-deadline b {
        font-size: 14px;
    }

    .application-deadline span {
        color: #ff2870;
        font-size: 14px;
    }

    .start-date {
        padding: 10px 0;
    }

    .start-date b {
        font-size: 14px;
    }

    .start-date span {
        color: #ff2870;
        font-size: 14px;
    }

    .number-vacancies {
        padding: 10px 0;
    }

    .number-vacancies b {
        font-size: 14px;
    }

    .number-vacancies span {
        color: #ff2870;
        font-size: 14px;
    }

    .class-size {
        padding: 10px 0;
    }

    .class-size b {
        font-size: 14px;
    }

    .class-size span {
        color: #ff2870;
        font-size: 14px;
    }

    .subjects {
        padding: 10px 0;
    }

    .subjects b {
        font-size: 14px;
    }

    .subjects span {
        background-color: #ffffff;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        margin-left: 10px;
        padding: 2px 4px;
        border-radius: 4px;
    }

    .student-ages {
        padding: 10px 0;
    }

    .student-ages b {
        font-size: 14px;
    }

    .student-ages span {
        background-color: #ffffff;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        margin-left: 10px;
        padding: 2px 4px;
        border-radius: 4px;
    }

    .compensation-container {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 20px;
        margin-top: 20px;
    }

    .compensation-label {
        font-weight: bold;
        font-size: 18px;
    }

    .compensation-label-underline {
        width: 100px;
        border: 1px solid #ff2870;
    }

    .compensation-content {
        font-size: 14px;
        padding: 10px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .compensation-salary {
        padding: 10px 0;
    }

    .compensation-salary b {
        font-size: 14px;
    }

    .compensation-salary span {
        color: #ff2870;
        font-size: 14px;
    }

    .compensation-payment {
        padding: 10px 0;
    }

    .compensation-payment b {
        font-size: 14px;
    }

    .compensation-payment span {
        color: #ff2870;
        font-size: 14px;
    }

    .compensation-class-size {
        padding: 10px 0;
    }

    .compensation-class-size b {
        font-size: 14px;
    }

    .compensation-class-size span {
        color: #ff2870;
        font-size: 14px;
    }

    .compensation-benefits {
        padding: 10px 0;
    }

    .compensation-benefits b {
        font-size: 14px;
    }

    .compensation-benefits span {
        background-color: #ffffff;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        margin-left: 10px;
        padding: 2px 4px;
        border-radius: 4px;
    }

    .qua-container {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 20px;
        margin-top: 20px;
    }

    .qua-label {
        font-weight: bold;
        font-size: 18px;
    }

    .qua-label-underline {
        width: 100px;
        border: 1px solid #ff2870;
    }

    .qua-content {
        font-size: 14px;
        padding: 10px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .qua-teach-exp {
        padding: 10px 0;
    }

    .qua-teach-exp b {
        font-size: 14px;
    }

    .qua-teach-exp span {
        color: #ff2870;
        font-size: 14px;
    }

    .qua-age {
        padding: 10px 0;
    }

    .qua-age b {
        font-size: 14px;
    }

    .qua-age span {
        color: #ff2870;
        font-size: 14px;
    }

    .qua-education-req {
        padding: 10px 0;
    }

    .qua-education-req b {
        font-size: 14px;
    }

    .qua-education-req span {
        background-color: #ffffff;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        margin-left: 10px;
        padding: 2px 4px;
        border-radius: 4px;
    }

    .address-container {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 20px;
        margin-top: 20px;
    }

    .address-label {
        font-weight: bold;
        font-size: 18px;
    }

    .address-label-underline {
        width: 100px;
        border: 1px solid #ff2870;
    }

    .address-content {
        font-size: 14px;
        padding: 10px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .address-address {
        padding: 10px 0;
    }

    .address-address b {
        font-size: 14px;
    }

    .address-address span {
        color: #ff2870;
        font-size: 14px;
    }

    .address-location {
        width: 100%;
    }

    .apply-btn-container {
        padding: 20px;
        margin-top: 20px;
    }

    .apply-btn {
        width: 100%;
        background-color: #b1c452;
        color: #ffffff;
    }

    .company-bio-container {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 20px;
        margin-top: 20px;
    }

    .company-bio-label {
        font-weight: bold;
        font-size: 18px;
    }

    .company-bio-label-underline {
        width: 100px;
        border: 1px solid #ff2870;
    }

    .company-logo-container {
        float: left;
        padding: 10px;
    }

    .company-logo {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .company-bio-text {
        font-size: 14px;
        /*overflow: hidden;*/
        /*text-overflow: ellipsis;*/
        /*display: -webkit-box;*/
        /*-webkit-box-orient: vertical;*/
        /*-webkit-box-orient: vertical;*/
        /*-webkit-line-clamp: 15;*/
    }

    .view-profile-btn-container{
        padding: 10px 0;
    }
    .view-profile-btn{
        font-size: 14px;
    }
</style>
