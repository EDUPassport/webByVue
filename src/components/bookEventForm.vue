<template>
<div>
  <el-dialog :model-value="visible" title="RSVP"
             :before-close="beforeClose"
  >

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
          <el-form-item label="First name" prop="first_name" >
            <el-input  placeholder="First Name" v-model="bookForm.first_name"></el-input>
          </el-form-item>
          <el-form-item label="Last name" prop="last_name" >
            <el-input  placeholder="Last Name" v-model="bookForm.last_name"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="Contact" prop="contact">
          <el-input  placeholder="Email" v-model="bookForm.contact"></el-input>
        </el-form-item>
      </div>

      <el-form-item label="Bookings"  prop="bookings">
        <el-input-number v-model="bookForm.bookings" />
<!--        <span>Bookings</span>-->
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
<!--      <el-button class="inquire-btn"-->
<!--                 type="primary"-->
<!--                 round-->
<!--                 @click="inquire()"-->
<!--      >-->
<!--        Inquiries-->
<!--      </el-button>-->
    </div>


  </el-dialog>

</div>
</template>

<script>
import detailBannerImg from "@/assets/events/banner.png";
import {EVENTS_ADD_APPLICANTS} from "@/api/api";

export default {
  name: "bookEventForm",
  props:['visible','info'],
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
          {required: true, message: 'Please input', trigger: ['blur','change']}
        ]
      },
      detailBannerImg,
      eventData: {},
      submitLoadingStatus: false,
      tValue:0,
      eventApplicationsData:[]

    }
  },
  methods:{
    beforeClose(done){
      this.$emit('close')
      done()
    },
    inquire(){
      this.$emit('close')
    },
    submitForm(formName) {
      let uid = localStorage.getItem('uid');
      this.submitLoadingStatus = true;

      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(uid){
            this.bookForm.apply_user_id = uid
          }
          this.bookForm.user_id = this.info.user_id;
          this.bookForm.event_id = this.info.id;

          let params = Object.assign({}, this.bookForm)
          EVENTS_ADD_APPLICANTS(params).then(res => {
            console.log(res)
            if (res.code == 200) {
              this.$message.success('Success')
              this.submitLoadingStatus = false;
              this.$emit('close')
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

</style>