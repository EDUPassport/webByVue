<template>
  <div class="event-detail-bg">
    <el-row class="detail-banner-row" :gutter="0" align="middle" justify="center">
      <el-col class="detail-banner-bg" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-image :src="detailBannerImg" fit="cover"></el-image>
      </el-col>
    </el-row>

    <el-row class="event-detail-row" :gutter="0" align="top" justify="center">
      <el-col class="event-detail-container" :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
        <h3 class="event-label">Event Details</h3>

        <div class="event-container">

          <div class="event-detail">
            <div class="event-title">{{ eventData.name }}</div>
            <div class="event-title-underline"></div>
            <div class="event-desc">
              {{ eventData.desc }}
            </div>
            <div class="event-tags">
              <div class="event-tag" v-if="eventData.is_online == 1">Online</div>
              <div class="event-tag" v-if="eventData.is_online == 2">Offline</div>
              <div class="event-tag" v-if="eventData.is_online == 3">Both</div>

              <div class="event-tag" v-if="eventData.is_all == 1">Social</div>
              <div class="event-tag" v-if="eventData.is_all == 2">Professional</div>

              <div class="event-tag" v-if="eventData.countries">{{eventData.countries.name}}</div>
              <div class="event-tag" v-if="eventData.states">{{eventData.states.name}}</div>
              <div class="event-tag" v-if="eventData.towns">{{eventData.towns.name}}</div>

            </div>
            <div class="event-location">
              <template v-if="eventData.is_online == 2 || eventData.is_online == 3">
                Location: {{ eventData.location }}
              </template>
            </div>
            <div class="event-date" v-if="eventData.is_online == 1 || eventData.is_online == 3">
              Event Link: {{ eventData.online_url }}
            </div>
            <div class="event-date">
              Event Ticket Price: {{ eventData.pay_money }}
            </div>
            <div class="event-date">
              Date: {{ $filters.ymdFormatEvent(eventData.date) }}
            </div>
            <div class="event-time">
              Time: {{ $filters.timeFormatEvent(eventData.start_time, eventData.end_time) }}
            </div>
            <div class="event-date">
              Venue: {{ eventData.event_place }}
            </div>

          </div>

          <div class="event-detail-form"  v-if="tValue == 1">
            <el-form
                :model="bookForm"
                :rules="bookRules"
                ref="bookForm"
                label-width="0"
                label-position="top"
                class="demo-ruleForm"
            >
              <div class="event-detail-form-input">
                <div class="event-detail-form-item2">
                  <el-form-item prop="first_name" required>
                    <el-input size="medium" placeholder="First Name" v-model="bookForm.first_name"></el-input>
                  </el-form-item>
                  <el-form-item prop="last_name" required>
                    <el-input size="medium" placeholder="Last Name" v-model="bookForm.last_name"></el-input>
                  </el-form-item>
                </div>
                <el-form-item prop="contact" required>
                  <el-input size="medium" placeholder="Email" v-model="bookForm.contact"></el-input>
                </el-form-item>
              </div>

              <el-form-item class="event-detail-form-book" prop="bookings" required>
                <el-input-number v-model="bookForm.bookings" size="large"/>
                <span>Bookings</span>
              </el-form-item>

            </el-form>

            <div class="submit-btn-container">
              <el-button class="submit-btn"
                         type="primary"
                         round
                         :loading="submitLoadingStatus"
                         @click="submitForm('bookForm')">
                Book
              </el-button>
              <el-button class="inquire-btn"
                         type="primary"
                         round
              >
                Inquiries
              </el-button>
            </div>
          </div>

        </div>

        <div v-if="tValue == 2">

          <div class="book-applications-container">
            <h4>Booked List</h4>
            <div class="book-applications">
              <div class="book-application" v-for="(item,i) in eventApplicationsData" :key="i">
                <div class="book-application-l">
                  {{item.first_name}} {{item.last_name}}
                </div>
                <div class="book-application-r">
                  {{item.contact}}
                </div>
              </div>
            </div>
          </div>

        </div>


      </el-col>

      <el-col class="vendor-detail-bg" :xs="24" :sm="8" :md="8" :lg="8" :xl="8">

        <div class="vendor-info">
          <div class="vendor-label">Vendor Bio</div>
          <div class="vendor-label-underline"></div>
          <div class="vendor-content">
            <el-avatar class="vendor-company-logo"
                      :src="eventData.third_company_logo ? eventData.third_company_logo : eventData.company_logo "
            ></el-avatar>
            <p>
              <template v-if="eventData.company ">
                {{ eventData.company.desc }}
              </template>
            </p>

          </div>
        </div>

        <div class="event-flyer" v-if="eventData.file">
          <el-image :src="eventData.file" class="event-flyer-img"></el-image>
        </div>

      </el-col>
    </el-row>

  </div>
</template>

<script>
import detailBannerImg from '@/assets/events/banner.png'
import {EVENTS_ADD_APPLICANTS, EVENTS_DETAIL,EVENT_APPLICATIONS} from "@/api/api";

export default {
  name: "detail",
  setup() {

  },
  data() {
    return {
      bookForm: {
        first_name: '',
        last_name: '',
        contact: '',
        bookings: 1,
        apply_user_id:undefined,
        user_id: undefined,
        event_id: undefined
      },
      bookRules: {
        first_name: [
          {required: true, message: 'Please input', trigger: 'blur'}
        ],
        last_name: [
          {required: true, message: 'Please input', trigger: 'blur'}
        ],
        contact: [
          {required: true, message: 'Please input', trigger: 'blur'}
        ],
        bookings: [
          {required: true, message: 'Please input', trigger: 'change'}
        ]
      },
      detailBannerImg,
      eventData: {},
      submitLoadingStatus: false,
      tValue:0,
      eventApplicationsData:[]

    }
  },
  mounted() {

    let id = this.$route.query.id;
    let token = localStorage.getItem('token')

    let tValue = this.$route.query.t;
    this.tValue = tValue

    if(tValue == 2){
      this.getEventApplications(id)
    }


    if (token) {
      this.bookForm.first_name = localStorage.getItem('first_name')
      this.bookForm.last_name = localStorage.getItem('last_name')
      this.bookForm.contact = localStorage.getItem('email')
    }
    this.getEventDetail(id)
  },
  methods: {
    getEventApplications(eventId){
      let params = {
        event_id:eventId
      }
      EVENT_APPLICATIONS(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.eventApplicationsData = res.message.data;
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    getEventDetail(id) {
      let params = {
        event_id: id
      }
      EVENTS_DETAIL(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.eventData = res.message;
        }
      }).catch(err => {
        console.log(err)
      })
    },
    resetBookForm() {
      this.bookForm = {
        first_name: '',
        last_name: '',
        contact: '',
        bookings: 1,
        user_id: undefined,
        event_id: undefined
      }
    },
    submitForm(formName) {
      let uid = localStorage.getItem('uid');
      this.submitLoadingStatus = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(uid){
            this.bookForm.apply_user_id = uid
          }
          this.bookForm.user_id = this.eventData.user_id;
          this.bookForm.event_id = this.$route.query.id;
          let params = Object.assign({}, this.bookForm)
          EVENTS_ADD_APPLICANTS(params).then(res => {
            console.log(res)
            if (res.code == 200) {
              this.$message.success('Success')
              this.submitLoadingStatus = false;
              // this.resetBookForm()
            }

          }).catch(err => {
            console.log(err)
            this.$message.error(err.msg)
          })
          console.log('submit')
        } else {
          console.log('error submit!!')
          this.submitLoadingStatus = false
          return false
        }
      })
    }


  }
}
</script>

<style scoped>
.event-detail-bg {
  background-color: #ececec;
}

.detail-banner-bg {
  background-color: #FFFFFF;
}

.event-detail-row {
  /*width: 1100px;*/
  margin: 0 auto;
}

.event-detail-container {
  padding: 40px;

}

.event-label {
  color: #0E394C;
}

.event-container {
  margin-top: 40px;
  padding: 20px 10px;
  background-color: #FFFFFF;
  border-radius: 10px;
}

.event-title {
  font-weight: bold;
  font-size: 16px;
  padding-left: 10px;
}

.event-title-underline {
  padding-left: 10px;
  margin-top: 4px;
  height: 2px;
  background-color: #B1C452;
}

.event-desc {
  font-size: 14px;
  margin-top: 20px;
  line-height: 22px;
  padding-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
}

.event-tags {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.event-tag {
  background-color: #ececec;
  color: #808080;
  margin: 10px;
  font-size: 14px;
  border-radius: 4px;
  padding: 4px 8px;
}

.event-location {
  font-size: 14px;
  padding: 4px 0 0 10px;
}

.event-date {
  font-size: 14px;
  padding: 4px 0 0 10px;
}

.event-time {
  font-size: 14px;
  padding: 4px 0 0 10px;
}

.vendor-detail-bg {
  padding: 40px;
}

.vendor-info {
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 10px;

}

.vendor-label {
  font-weight: bold;
  font-size: 16px;
}

.vendor-label-underline {
  height: 2px;
  background-color: #00b3d2;
}

.vendor-content {
  padding: 10px 0;
  min-height: 120px;
}

.vendor-company-logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 4px;
  border: 1px solid #EEEEEE;
  float: left;
}

.vendor-content p {
  font-size: 14px;
  line-height: 20px;
}

.vendor-bio p {
  min-height: 140px;
  font-size: 14px;
  word-wrap: break-word;

}

.vendor-profile-btn {
  margin-top: 10px;
}

.event-flyer {
  margin-top: 40px;
}

.event-flyer-img {
  border-radius: 10px;
}

.event-detail-form {
  padding: 20px;
  width: 60%;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
}

.event-detail-form /deep/ .el-input__inner {

}

.event-detail-form-input /deep/ input {
  border: none;
  border-radius: unset;
  border-bottom: 1px solid #858585;
}

.event-detail-form-input /deep/ input::placeholder {
  color: #707070;
}

.event-detail-form-item2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

}

.event-detail-form-book span {
  margin-left: 10px;
  color: #808080;
}

.inquire-btn {
  background-color: #B1C452;
  border: 1px solid #B1C452;
}
.book-applications-container{
  background-color: #FFFFFF;
  margin-top: 20px;
  padding:20px;
  border-radius: 10px;
}
.book-applications-container h4{
  border-bottom: 2px solid #B1C452;
  padding-bottom: 4px;
}
.book-applications{
  margin-top:20px;

}

.book-application{
  border-bottom:1px solid #EEEEEE;
  padding: 10px 0;
}
.book-application-l{
  font-size:14px;
}
.book-application-r{
  font-size:14px;
}
@media screen and (min-width: 1200px) {

  .event-detail-row {
    width: 1100px;
  }


}

</style>
