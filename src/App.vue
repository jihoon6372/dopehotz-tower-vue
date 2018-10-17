<template>
  <div id="app">
    <transition name="fade">
      <div class="se-pre-con" v-if="se_pre_con">
          <div>
              <div></div>
          </div>
      </div>
    </transition>
    <header-component 
      :parent_user="user"
      :track_info="track_info"
      :is_main="is_main"
      :get_api_token="get_api_token"
    ></header-component>

    <div :class="MainObject">
      <router-view
       :parent_user="user"
       :change_picture="change_picture"
       :play="play"
       :set_se_pre_con="set_se_pre_con"
       :set_api_token="set_api_token"
       :get_api_token="get_api_token"
       :set_is_token_new="set_is_token_new"
       :reset_user="reset_user"
       :get_only_api_token="get_only_api_token"
      />
    </div>

    <footer-component></footer-component>
    <player-component ref="player"></player-component>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Player from '@/components/Player'

export default {
  name: 'App',
  components: {
    'header-component': Header,
    'footer-component': Footer,
    'player-component': Player
  },
  data() {
    return {
      se_pre_con: true,
      is_main: true,
      is_token_new: false,
      not_token_refresh: ['Main', 'logout'],
      user: {
        profile: {
          nickname: '',
          profile_picture: '',
          crew: '',
          location: '',
          greeting: '',
          clips_greeting: '',
          likes_greeting: ''
        },
        track_list_count: {
          all: 0,
          on_stage: 0,
          open_mic: 0
        },
        user_track_info: {
          play_count: 0,
          like_count: 0,
          comment_count: 0
        }
      },
      track_info: {
        all_tracl: 0,
        open_mic: 0,
        on_stage: 0
      }
    }
  },
  methods: {
    set_api_token(token){
      localStorage.setItem('user', token);
    },

    get_only_api_token(){
      let token = localStorage.getItem('user');
      return token || false
    },

    get_api_token() {
      const token_type = 'JWT';
      let token = this.get_only_api_token();
      return token_type+' '+token;
    },

    change_picture(a) {
      if(a) return a.replace('large', 't500x500');
    },

    play(track){
      this.$refs.player.stop();
      this.$refs.player.play(track);
    },

    set_se_pre_con(a){
      this.se_pre_con = a;
    },

    check_is_main(){
      if(this.$route.name == 'Main'){
        this.is_main = true;
      }else{
        this.is_main = false;
      }
    },
    reset_user(){
      let user = this.user;
      let profile = user.profile;
      let track_list_count = user.track_list_count;
      let user_track_info = user.user_track_info;

      user.provider = '';

      profile.nickname = '';
      profile.profile_picture = '';
      profile.crew = '';
      profile.location = '';
      profile.greeting = '';
      profile.clips_greeting = '';
      profile.likes_greeting = '';

      track_list_count.all = 0;
      track_list_count.on_stage = 0;
      track_list_count.open_mic = 0;

      user_track_info.play_count = 0;
      user_track_info.like_count = 0;
      user_track_info.comment_count = 0;
    },

    auth_check(){
      if(this.$route.name == 'auth') return false;
      let user = localStorage.getItem('user');

      if(this.is_token_new || this.not_token_refresh.includes(this.$route.name)){
        this.is_token_new = false;

      }else{
        let self = this;
        this.axios({
          method: 'post',
          url: process.env.API_URL+'/token/refresh/',
          data: {
            token: self.get_only_api_token(),
          }
        })
        .then(function(response){
          self.set_api_token(response.data.token);
        })
        .catch(error => {
          if(error.response.status == 400){
            location.href = 'http://auth.dopehotz.com/logout/?next='+process.env.TOWER_URL;
          }
        });
      }
    },

    save_this_route(){
      sessionStorage.setItem('route', this.$route.name);
      sessionStorage.setItem('route_query', JSON.stringify(this.$route.query));
    },

    set_is_token_new(val){
      this.is_token_new = val;
    },

    get_user_data() {
      var self = this;
      // if(!this.get_only_api_token() || this.not_token_refresh.includes(this.$route.name)) return false;
      if(!this.get_only_api_token()) return false;
      this.axios({
          method: 'get',
          url: process.env.API_URL+'/v1/accounts/me/',
          headers: {
              'Authorization': this.get_api_token()
          }
      })
      .then(function (response){
          let user_profile = self.user.profile;
          if(response.data.profile.soundcloud_id === 0 && !self.not_token_refresh.includes(self.$route.name)){
            window.location = 'https://auth.dopehotz.com/connect/';
            return false;
          }

          self.user.id = response.data.id;

          user_profile.nickname = response.data.profile.nickname;
          user_profile.profile_picture = response.data.profile.profile_picture;
          user_profile.crew = response.data.profile.crew ? response.data.profile.crew : user_profile.crew;
          user_profile.location = response.data.profile.location;
          user_profile.greeting = response.data.profile.greeting;
          user_profile.clips_greeting = response.data.profile.clips_greeting;
          user_profile.likes_greeting = response.data.profile.likes_greeting;
          user_profile.soundcloud_id = response.data.profile.soundcloud_id;
          user_profile.location = response.data.profile.location;
          self.user.provider = response.data.social_type;
          self.user.track_list_count.all = response.data.track_list_count.all;
          self.user.track_list_count.on_stage = response.data.track_list_count.on_stage;
          self.user.track_list_count.open_mic = response.data.track_list_count.open_mic;
          self.user.user_track_info.play_count = response.data.user_track_info.play_count;
          self.user.user_track_info.like_count = response.data.user_track_info.like_count;
          self.user.user_track_info.comment_count = response.data.user_track_info.comment_count;

          // self.se_pre_con = false;
      })
      .catch(error => {
          try {
            let msg = error.response.data;
              for(key in error.response.data){
                if(Array.isArray(msg[key])){
                    alert(msg[key][0]);
                }else{
                    alert(msg.detail);
                }   
              }
          } catch (error) {
            
          }
      });
    }
  },
  mounted(){
    this.save_this_route();    
  },
  created() {
    this.get_user_data();
  },
  beforeMount(){
    this.auth_check();
    this.check_is_main();
  },
  watch: {
    '$route' (to, from) {
      this.check_is_main();
      this.save_this_route();
      this.auth_check();
      this.get_user_data();
    }
  },
  computed: {
    MainObject: function () {
      return {
        layout_body: !this.is_main,
        main_contents: this.is_main
      }
    }
  }
}
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .se-pre-con {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background-color: rgba(36,36,37,0.9);
      z-index: 999;
      transition: opacity .5s;
  }

  .se-pre-con>div {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 100%;
  }

  .se-pre-con>div>div {
      width: 100px;
      height: 100px;
      margin: 0 auto;
      background-image: url(./assets/img/loader.png);
      background-size: 100%;
      -webkit-animation: rotation 2s infinite cubic-bezier(0.5, 0, 0.5, 1);
      
  }
  @-webkit-keyframes rotation {
  from {
      -webkit-transform: rotate(0deg);
  }
  to {
      -webkit-transform: rotate(720deg);
  }
}


</style>
