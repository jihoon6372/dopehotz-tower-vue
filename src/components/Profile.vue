<template>
    <div>
        <div class="sub_title" :style="dashboard_header">
            <div class="title_area">
                <h2>SOCIAL</h2>
                <h1>EDIT PROFILE</h1>
            </div>
        </div>
        <div class="content">
            <div class="content">
                <div class="innercontent_layout_l">
                    <div class="content_title_wrap">
                        <h3>ARTIST INFO</h3>
                    </div>
                    <div class="content_tile">
                        <div class="tile_upper_title">
                            <h4>BIO</h4>
                        </div>
                        <div class="input_form">
                            <label for="nick">닉네임</label>
                            <input type="text" id="nick" name="nickname" v-model="user.profile.nickname">
                        </div>
                        <div class="input_form">
                            <label for="crew">소속 또는 활동하는 크루</label>
                            <input type="text" id="crew" name="crew" v-model="user.profile.crew">
                        </div>
                        <div class="input_form">
                            <label for="location">활동지역</label>
                            <input type="text" id="location" name="location" v-model="user.profile.location">
                        </div>
                        <div class="input_form">
                            <label for="artistbio">아티스트 소개(최대 600자)</label>
                            <textarea id="artistbio" name="greeting" v-model="user.profile.greeting"></textarea>
                        </div>
                    </div>
                    <div class="content_tile">
                        <div class="tile_upper_title">
                            <h4>MESSAGE</h4>
                        </div>
                        <div class="input_form">
                            <label for="thxdope">좋아요 감사 메시지</label>
                            <input type="text" id="thxdope" name="likes_greeting" v-model="user.profile.likes_greeting">
                        </div>
                        <div class="input_form">
                            <label for="thxplay">플레이 감사 메시지</label>
                            <input type="text" id="thxplay" name="clips_greeting" v-model="user.profile.clips_greeting">
                        </div>
                    </div>
                    <div class="content_tile">
                        <div class="tile_upper_title">
                            <h4>ACCOUNT INFO</h4>
                        </div>
                        <div class="input_form">
                            <label for="tracktag">사운드 클라우드 ID</label>
                            <input type="text" id="sndcleid" name="sndcleid" v-model="user.profile.soundcloud_id" disabled="">
                            <a class="conect_snd" @click="get_profile_picture_from_soundcloud">계정 새로고침</a>
                        </div>
                        <div class="input_form">
                            <label for="tracktag">로그인 계정(ID)</label>
                            <input type="text" id="naverid" name="naverid" v-model="user.provider" disabled>
                        </div>
                    </div>
                    <div class="content_tile">
                            <div class="tile_upper_title">
                                <h4>ACCOUNT GROUP</h4>
                            </div>
                            <div class="input_form">
                                <label for="tracktag">계정 그룹</label>
                                <input type="text" id="accgrade" name="accgrade" value="OFFICIAL" disabled>
                            </div>
                        </div>
                    <div class="track_submit_wrap">
                        <button class="track_submit" @click="save">저장</button>
                    </div>
                </div>
                <div class="innercontent_layout_r">
                    <div class="content_title_wrap">
                        <h3>PREVIEW</h3>
                    </div>
                    <div class="profile_card">
                        <div class="profile_top_wrap">
                            <div class="profile_top">
                                <div class="profile_top_img" :style="{'background-image': 'url('+change_picture(user.profile.profile_picture)+')'}">
                                    <div class="top_artwork_play play_trigger" data-tracknum="">
                                        <img class="play_btn_img" src="@/assets/img/play.png">
                                    </div>
                                </div>
                                <h2>{{ user.profile.nickname }}</h2>
                                <span class="profile_position" id="pre_crew">{{ user.profile.crew }}</span>
                                <div class="profile_itrctn">
                                    <a href="#" class="follow_user checked">follow</a>
                                </div>
                                <span class="profile_location" id="pre_location">{{ user.profile.location }}</span>
                                <p id="pre_info">{{ user.profile.greeting }}</p>
                                <div class="profile_social_wrap">
                                    <ul>
                                        <li>
                                            <dd>1,548</dd>
                                            <dt>FANATIC</dt>
                                        </li>
                                        <li>
                                            <dd>21,142</dd>
                                            <dt>PLAY</dt>
                                        </li>
                                        <li>
                                            <dd>7,652</dd>
                                            <dt>LIKE</dt>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['parent_user', 'change_picture', 'get_api_token'],
    data() {
        return {
            user: this.parent_user,
            is_submit: false,
            SOUNDCLOUD_OAUTH_TOKEN: '',
            dashboard_header: {
                'background-image': 'url('+require('@/assets/img/sub_main/sub_main04.jpg')+')'
            }
        }
    },
    methods: {
        save() {
            if(this.is_submit) return false;
            this.is_submit = true;
            let self = this;

            this.axios({
                method: 'put',
                url: process.env.API_URL+'/v1/accounts/74/',
                headers: {
                    'Authorization': this.get_api_token()
                },
                data: {
                    profile: {
                        nickname: this.user.profile.nickname,
                        crew: this.user.profile.crew,
                        location: this.user.profile.location,
                        greeting: this.user.profile.greeting,
                        likes_greeting: this.user.profile.likes_greeting,
                        clips_greeting: this.user.profile.clips_greeting,
                        profile_picture: this.user.profile.profile_picture
                    }
                }
            })
            .then(function (response){
                alert('저장 되었습니다.');
                self.is_submit = false;
            })
        },
        get_profile_picture_from_soundcloud() {
            if(this.is_submit) return false;
            this.is_submit = true;

            let self = this;
            this.axios({
                method: 'get',
                url: process.env.SOUNDCLOUD_URL+'/me?oauth_token='+self.SOUNDCLOUD_OAUTH_TOKEN
            })
            .then(function (response){
                self.user.profile.profile_picture = self.change_picture(response.data.avatar_url);
                alert('프로필 이미지가 갱신 되었습니다.\n아래 저장버튼을 눌러야 정상 적용됩니다.');
                self.is_submit = false;
                
            })
        },
        get_soundcloud_oauth_token() {
            let self = this;
            this.axios({
                method: 'get',
                url: process.env.API_URL+'/v1/accounts/me/soundcloud-token/',
                headers: {
                    'Authorization': this.get_api_token()
                }
            })
            .then(response => {
                self.SOUNDCLOUD_OAUTH_TOKEN = response.data.SOUNDCLOUD_OAUTH_TOKEN;
            })
            .catch(error => {
                try {
                    alert(error.response.data.detail);
                } catch (error) {
                    
                }
            })
        }
    },
    mounted() {
        this.get_soundcloud_oauth_token();
    }
}
</script>