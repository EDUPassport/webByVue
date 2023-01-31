<template>
  <div class="contact">
    <div class="contact-left">
<!--      <div class="contact-list-title">群组</div>-->
<!--      <div class="group-list">-->
<!--        <div-->
<!--          v-for="(group, key) in groups || []" :key="key" class="group-item"-->
<!--          :class="{actived: profile.group && profile.group.id === group.id}"-->
<!--          @click="showGroupProfile(group)"-->
<!--        >-->
<!--          <div class="group-avatar">-->
<!--            <img :src="group.avatar"/>-->
<!--          </div>-->
<!--          <div class="group-name">{{ group.name }}({{ group.userList.length }})</div>-->
<!--        </div>-->
<!--      </div>-->
      <div class="contact-list-title">Friends</div>
      <div class="friend-list">
        <div
          v-for="(friend, key) in friends || []" :key="key" class="friend-item"
          :class="{actived: profile.friend && profile.friend.id === friend.to_user_contact_info.to_company_info.id}"
          @click="showFriendProfile(friend,1)"
        >
          <div class="friend-avatar">
            <template v-if="friend.to_identity === 1">
              <el-avatar class="friend-avatar-img" :src="friend.to_user_contact_info.headimgurl"/>
            </template>
            <template v-else>
              <el-avatar class="friend-avatar-img" :src="friend.to_user_contact_info.to_company_info.logo"/>
            </template>
          </div>
          <div class="friend">
            <div class="friend-name">
              <template v-if="friend.to_identity === 1">
                {{ friend.to_user_contact_info.to_company_info.name }}
              </template>
              <template v-else>
                {{ friend.to_user_contact_info.to_company_info.company_name }}
              </template>

            </div>
            <div class="friend-mail">
              <template v-if="friend.to_identity === 1">
                {{ friend.to_user_contact_info.to_company_info.email }}
              </template>
              <template v-else>
                {{ friend.to_user_contact_info.to_company_info.work_email }}
              </template>

            </div>
          </div>
        </div>

        <div
            v-for="(friend, key) in friends || []" :key="key" class="friend-item-mobile"
            :class="{actived: profile.friend && profile.friend.id === friend.to_user_contact_info.to_company_info.id}"
            @click="showFriendProfile(friend,2)"
        >
          <div class="friend-avatar">
            <template v-if="friend.to_identity === 1">
              <el-avatar class="friend-avatar-img" :src="friend.to_user_contact_info.headimgurl"/>
            </template>
            <template v-else>
              <el-avatar class="friend-avatar-img" :src="friend.to_user_contact_info.to_company_info.logo"/>
            </template>
          </div>
          <div class="friend">
            <div class="friend-name">
              <template v-if="friend.to_identity === 1">
                {{ friend.to_user_contact_info.to_company_info.name }}
              </template>
              <template v-else>
                {{ friend.to_user_contact_info.to_company_info.company_name }}
              </template>

            </div>
            <div class="friend-mail">
              <template v-if="friend.to_identity === 1">
                {{ friend.to_user_contact_info.to_company_info.email }}
              </template>
              <template v-else>
                {{ friend.to_user_contact_info.to_company_info.work_email }}
              </template>

            </div>
          </div>
        </div>


      </div>
    </div>
    <div class="contact-main">
      <div class="profile-card" v-if="profile.friend?.name">
        <div class="profile-card-title">
          <div class="profile-name-container">

            <div class="profile-name">
              {{ profile.friend.name }}
            </div>

          </div>
          <div class="profile-avatar">
            <el-avatar :src="profile.friend.avatar"/>
          </div>
        </div>
        <div class="friend-info">
          <div class="info-name">Email</div>
          <div class="info-text">{{ profile.friend.email }}</div>
        </div>
<!--        <div class="friend-info">-->
<!--          <div class="info-name">Phone</div>-->
<!--          <div class="info-text">{{ profile.friend.phone }}</div>-->
<!--        </div>-->
        <div class="button-box">
          <el-button class="card-button" type="primary" round @click="privateChat">Send Message</el-button>
        </div>

      </div>

      <el-drawer
          :model-value="visible"
          direction="rtl"
          size="50%"
          @close="closeMobileProfileCard()"
      >
        <div class="profile-card-drawer" v-if="profile.friend?.name">
          <div class="profile-card-title">
            <div class="profile-name-container">
              <div class="profile-name">
                {{ profile.friend.name }}
              </div>
            </div>
            <div class="profile-avatar">
              <el-avatar :src="profile.friend.avatar"/>
            </div>
          </div>
          <div class="friend-info">
            <div class="info-name">Email</div>
            <div class="info-text">{{ profile.friend.email }}</div>
          </div>
          <!--        <div class="friend-info">-->
          <!--          <div class="info-name">Phone</div>-->
          <!--          <div class="info-text">{{ profile.friend.phone }}</div>-->
          <!--        </div>-->
          <div class="button-box">
            <el-button class="card-button" type="primary" round @click="privateChat">Send Message</el-button>
          </div>

        </div>
      </el-drawer>

      <div class="profile-card" v-if="profile.group?.name">
        <div class="group-profile-name">{{ profile.group.name }}</div>
        <div class="group-members">
          <div class="member" v-for="(member, index) in profile.group.members" :key="index">
            <img class="member-avatar" :src="member.avatar"/>
            <span class="member-name">{{ member.name }}</span>
          </div>
        </div>
        <div class="button-box">
          <button class="card-button" @click="groupChat">发消息</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive, ref} from 'vue';
import {useRouter} from 'vue-router';
import { useStore } from 'vuex';
import restApi from '@/api/restapi.js';
import {encode} from 'js-base64'
export default {
  async setup() {
    const router = useRouter();
    const store = useStore();
    const currentUser = store.state.currentUser;
    const friends = await restApi.findFriends(currentUser)
    // const groups = restApi.findGroups(currentUser);

    let profile = reactive({
      friend: {},
      group: {}
    });
    const visible = ref(false)

    function showFriendProfile(friend,type) {
      profile.group = {};

      if(friend.to_identity === 1){
        profile.friend = {
          id: friend.to_user_contact_info.to_company_info.id,
          uid:friend.to_user_id,
          identity:friend.to_identity,
          company_id: friend.to_company_id,
          name: friend.to_user_contact_info.to_company_info.name,
          avatar:friend.to_user_contact_info.headimgurl,
          email:friend.to_user_contact_info.to_company_info.email
        }
      }else{
        profile.friend = {
          id: friend.to_user_contact_info.to_company_info.id,
          uid:friend.to_user_id,
          identity:friend.to_identity,
          company_id: friend.to_company_id,
          name: friend.to_user_contact_info.to_company_info.company_name,
          avatar:friend.to_user_contact_info.to_company_info.logo,
          email:friend.to_user_contact_info.to_company_info.work_email
        }
      }

      if(type === 1 ){
        visible.value = false
      }
      if(type === 2){
        visible.value = true;
      }

    }

    // function showGroupProfile(group) {
    //   profile.friend = {};
    //   profile.group = group;
    //   profile.group.members = [];
    //
    //   group.userList.map((item) => {
    //     const info = restApi.findUserById(item);
    //     profile.group.members.push(info);
    //   });
    // }

    function privateChat() {

      let path = '/chat/messages/privatechat/' + profile.friend.uid
      let uuid = profile.friend.uid + '#' + profile.friend.identity + '#' + profile.friend.company_id

      let obj = {
        uuid: uuid,
        name: profile.friend.name,
        avatar: profile.friend.avatar
      }

      router.replace({
        path: path,
        query: {
          str: encodeURI(encode(JSON.stringify(obj)))
        }
      })

    }

    function groupChat() {
      router.replace({
        path: '/conversations/groupchat/' + profile.group.id,
        query: {
          name: profile.group.name,
          avatar: profile.group.avatar
        }
      });
    }



    function closeMobileProfileCard() {
      visible.value = false;
    }

    return {
      visible,
      friends,
      profile,
      showFriendProfile,
      privateChat,
      groupChat,
      closeMobileProfileCard
    }

  },

}
</script>

<style scoped>
  .contact {
    width: 100%;
    height: 100%;
    display: flex;
    background: #FFFFFF;
    color: #333333;
  }

  .contact-left {
    width: 420px;
    height: 100%;
    border-right: #dbd6d6 1px solid;
  }

  .contact-list-title {
    margin: 25px;
    color: #262626;
    font-size: 24px;
    font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  }

  .friend-list {
    display: flex;
    flex-direction: column;
  }

  .group-list {
    display: flex;
    flex-direction: column;
  }

  .actived {
    background: #FFFFFF;
    //border-radius: 10px;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
  }

  .friend-item {
    display: flex;
    padding: 5px 10px;
    cursor: pointer;
  }
  .friend-avatar{
    display: flex;
    align-items: center;
  }

  .friend-avatar-img {
    width: 50px;
    height: 50px;
  }

  .friend {
    width: 65%;
    margin: 0;
    display: flex;
    flex-direction: column;
    text-align: left;
    padding-left: 10px;
  }

  .friend-name {

    font-size: 24px;
    font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
    white-space: nowrap;
    color: #262626;

  }

  .friend-mail {
    line-height: 21px;
    font-size: 12px;
    color: #888888;
    font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  }

  .group-item {
    display: flex;
    padding: 8px 10px;
    cursor: pointer;
    align-items: center;
  }

  .group-avatar {
    width: 40px;
    height: 40px;
    margin-left: 10px;
    overflow: hidden;
    display: flex;
  }

  .group-name {
    margin-left: 10px;
    width: 160px;
    text-align: left;
    font-size: 15px;
    line-height: 40px;
  }

  .contact-main {
    flex: 1;
    background: #FFFFFF;
  }

  .profile-card {
    padding: 20px 0;
  }

  .profile-card-title {
    padding: 60px;
    border-bottom: 1px solid #eeeeee;
    display: flex;
    justify-content: space-around;
  }

  .profile-name-container {
    display: flex;
    align-items: center;
  }

  .profile-name{
    width: 300px;
    font-size: 22px;
    font-family: "Cabin SemiBold", "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  }

  .icon-zhanghu {
    font-size: 26px;
    color: #eeeeee;
    margin-right: 10px;
  }

  .profile-avatar {
    width: 80px;
  }

  .profile-avatar img {
    width: 80px;
    height: 80px;
    border-radius: 10%;
  }

  .friend-info {
    padding: 10px 30px;
    display: flex;
    justify-content: space-around;
    text-align: left;
    font-size: 14px;
    line-height: 45px;
  }

  .info-name {
    width: 100px;
    font-family: "Cabin SemiBold", "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  }

  .info-text {
    width: 200px;
    font-family: "Cabin SemiBold", "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  }

  .group-profile-name {
    font-size: 18px;
    padding: 20px 70px;
    border-bottom: 1px solid #eeeeee;
  }

  .group-members {
    width: 400px;
    min-height: 200px;
    margin: 20px auto;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
  }

  .group-members .member {
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;

  }

  .group-members .member-avatar {
    width: 58px;
    margin-top: 20px;
    border-radius: 5%;
  }

  .group-members .member-name {
    color: gray;
    margin-top: 10px;
    font-size: 12px;
  }

  .button-box {
    padding: 40px 0;
  }

  .card-button {
    display: flex;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
  }
  @media screen and (min-width: 769px) {
    .profile-card-drawer{
      display: none;
    }
    .friend-item-mobile{
      display: none;
    }
  }
  @media screen and (max-width: 768px) {
    .contact-left{
      width: 100%;
    }
    .friend-item{
      display: none;
    }

    .friend-item-mobile {
      display: flex;
      padding: 5px 10px;
      cursor: pointer;
    }

    .contact-main{

    }

    .profile-card{
      display: none;
    }

    .profile-card-drawer{

    }

    .profile-card-title{
      padding: 10px;
      flex-direction: column-reverse;
      align-items: center;
      justify-content: center;
    }
    .profile-name-container{
      justify-content: center;
    }

    .profile-name{
      width: 120px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
    }
    .profile-avatar{
      width: auto;
    }

    .friend-info{
      padding:15px;
      flex-direction: column;
      line-height: 30px;
    }
    .info-name{
      width: auto;
      font-size: 12px;
    }

    .info-text{
      width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
    }

    .contact-list-title{
      margin: 15px;
      font-size: 18px;
    }

    .friend-name{
      font-size: 14px;
    }

    .friend-mail{
      font-size: 12px;
    }

    .friend-avatar-img{
      width: 30px;
      height: 30px;
    }

  }


</style>
