<template>
    <div>
        <div class="sub_title" :style="sub_title_style">
            <div class="title_area">
                <h2>TOWER DOPEHOTZ</h2>
                <h1>NEW TRACK</h1>
            </div>
        </div>
        <div class="content"> 
            <div class="innercontent_layout_l">
                <div class="content_title_wrap">
                    <h3>TRACK INFO</h3>
                </div>
                <div class="content_tile">
                        <div class="tile_upper_title">
                            <h4>트랙소개(필수)</h4>
                        </div>
                    <div class="input_form">
                        <label for="trackdec">트랙에 대한 사연, 컨셉, 설명 등을 입력해 주세요.</label>
                        <textarea id="trackdec" name="tape_info" v-model="track_info.tape_info" maxlength="600" placeholder="트랙에 대한 사연, 컨셉, 설명 등을 입력해 주세요."></textarea>
                    </div>
                </div>
                <div class="content_tile">
                    <div class="tile_upper_title">
                        <h4>가사입력(선택)</h4>
                    </div>
                    <div class="input_form">
                        <label for="lyrics">가사가 있는 트랙일 경우 입력해주세요.</label>
                        <textarea id="lyrics" name="lyrics" v-model="track_info.lyrics" maxlength="1200" placeholder="이 곡의 가사를 적어주세요."></textarea>
                    </div>
                </div>
                <div class="content_tile">
                    <div class="tile_upper_title">
                        <h4>태그입력(선택)</h4>
                    </div>
                    <div class="input_form">
                        <div class="tag_wrap">
                            <label for="tracktag">태그를 정확하게 입력할 수록 많은 반응을 이끌어낼 수 있습니다.</label>
                            <input id="tracktag" type="text" class="tagged form_control" name="tag" data-removeBtn="true" placeholder="태그를 입력해주세요. / 엔터로 구분">
                        </div>
                    </div>
                </div>
                <div class="content_tile">
                    <div class="tile_upper_title">
                        <h4>공개 범위 설정</h4>
                    </div>
                    <div class="input_form">
                        <label for="public">상업적 사용 가능 여부를 설정해 주세요.</label>
                        <select name="public" id="public" v-model="track_info.public">
                            <option value="">라이센스 공개 범위</option>
                            <option value="0">상업적 사용 불가</option>
                            <option value="1">상업적 사용 허용</option>
                        </select>
                    </div>
                    <div class="input_form">
                        <label for="distribute">수정 및 배포 가능 여부를 설정해 주세요.</label>
                        <select name="distribute" id="distribute" v-model="track_info.distribute">
                            <option value="">라이센스 공개 범위</option>
                            <option value="0">수정 및 배포 불가</option>
                            <option value="1">수정 및 배포 허용</option>
                        </select>
                    </div>
                </div>
            
                <div class="track_submit_wrap">
                    <router-link :to="{ name: 'post_select' }" class="track_submit">트랙 다시 선택</router-link>
                    <button class="track_submit" v-on:click="track_submit">트랙 공개하기</button>
                </div>
            </div>
            <div class="innercontent_layout_r">
                <div class="content_title_wrap">
                    <h3>PREVIEW</h3>
                </div>
                <div class="track_item_preview">
                    <a class="opm_thumb" :style="style1Object">
                        <div class="opm_play rateit">
                            <img class="play_btn_img play_trigger" src="@/assets/img/play.png">
                        </div>
                    </a>
                    <div class="opm_info">
                        <div class="opm_profile_img" :style="TrackThumbObject"></div>
                        <a>
                            <p> {{ user.profile.nickname }}</p>
                        </a>
                        <a><h4> {{ track_info.track_title }}</h4></a>
                        <a class="opm_track_like" :style="opmtracklikeStyle" data-dope="좋아요 메시지"></a>
                    </div>
                    <div class="opm_feedback">
                        <span class="play_rate_btn"><p :style="playratebtnStyle"></p><a>0</a></span>
                        <span class="dope_btn"><p :style="dopebtnStyle"></p><a>0</a></span>
                        <span class="comnt_btn"><p :style="comntbtnStyle"></p><a>0</a></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['parent_user', 'change_picture', 'set_se_pre_con', 'get_api_token'],
    data() {
        return {
            opmtracklikeStyle: 'background-image: url('+require('@/assets/img/dope_icon_set.png')+')',
            playratebtnStyle: 'background-image: url('+require('@/assets/img/play_icon.png')+')',
            dopebtnStyle: 'background-image: url('+require('@/assets/img/dope.png')+')',
            comntbtnStyle: 'background-image: url('+require('@/assets/img/cmnt_icon.png')+')',
            sub_title_style: 'background-image: url('+require('@/assets//img/sub_main/sub_main03.jpg')+')',
            user: this.parent_user,
            style1Object: '',
            TrackThumbObject: '',
            is_submit: false,
            track_info: {
                track_id: '',
                track_title: '',
                image_url: '',
                tape_info: '',
                lyrics: '',
                public: '',
                distribute: '',
                tag: ''
            }
        }
    },
    methods: {
        chk_track() {
            this.set_se_pre_con(true);
            let self = this;
            const track_id = this.$route.params.id;

            // 저장된 트랙 정보 가져오기
            this.axios({
                method: 'get',
                url: process.env.API_URL+'/v1/tracks/'+track_id+'/'
            })
            .then(response => { 
                alert('이미 등록된 트랙입니다.');
                this.$router.push({ name: 'post_select' });                
            })
            .catch(error => {
                // 저장된 트랙이 없을 경우 사운드클라우드 트랙정보 가져오기
                this.axios({
                    method: 'get',
                    url: process.env.SOUNDCLOUD_URL+'/tracks/'+track_id+'?client_id='+process.env.SOUNDCLOUD_KEY
                })
                .then(response => {
                    if(self.user.profile.soundcloud_id !== response.data.user_id){
                        alert('본인 트랙만 공개할 수 있습니다.');
                        return false;
                    }else{
                        self.set_background_image('TrackThumbObject', response.data.user.avatar_url);
                        const track_image_url = response.data.artwork_url ? response.data.artwork_url : response.data.user.avatar_url;
                        self.set_background_image('style1Object', track_image_url);

                        self.track_info = {
                            track_title: response.data.permalink,
                            image_url: track_image_url,
                            track_id: track_id,
                            public: '',
                            distribute: ''
                        }
                        this.set_se_pre_con(false);
                    };                    
                })
                .catch(error => {
                    alert('트랙을 찾을 수 없습니다.');
                });
            });
        },

        set_background_image(obj, image) {
            this[obj] = {
                'background-image': 'url('+this.change_picture(image)+')'
            }
        },

        track_submit() {
            if(this.is_submit) return false;
            this.track_info.tag = tagsArray[0].join(', ');

            if(!this.track_info.tape_info){
                alert('트랙 소개를 입력 해주세요.');
                return false;
            }
            
            if (!this.track_info.public){
                alert('상업적 사용 가능 여부를 설정해 주세요.');
                return false;
            }
            
            if(!this.track_info.distribute){
                alert('수정 및 배포 가능 여부를 설정해 주세요.');
                return false;
            }

            this.is_submit = true;
            this.set_se_pre_con(true);

            this.axios({
                method: 'post',
                url: process.env.API_URL+'/v1/tracks/',
                headers: {
                    'Authorization': this.get_api_token()
                },
                data: {
                    track_id: this.track_info.track_id,
                    track_type: 'soundcloud',
                    title: this.track_info.track_title,
                    tape_info: this.track_info.tape_info,
                    lyrics: this.track_info.lyrics,
                    tag: this.track_info.tag,
                    public: this.track_info.public,
                    distribute: this.track_info.distribute
                }
            })
            .then(res => {
                this.$router.push({ name: 'post_done' });
            })
            .catch(error => {
                const error_data = error.response.data;
                if(typeof(error_data) === 'string'){
                    alert(error_data);
                }else{
                    for(let key in error_data){
                        if(Array.isArray(error_data[key])){
                            error_data[key].forEach(f => {
                                alert(key+': '+f);
                            })
                        }else{
                            alert(error_data[key]);
                        }
                    }
                }
            })
            return
        },
        trim(stringToTrim) {
            try {
                return stringToTrim.replace(/^\s+|\s+$/g,"");
            } catch (error) {
                
            }
        }
    },
    mounted() {
        this.chk_track();
        let script = document.createElement('script');
        script.src = 'https://cdn.dopehotz.com/static/js/taginput.js';
        document.getElementsByTagName('head')[0].appendChild(script);
    },
    watch: {
        '$route' (to, from){
            this.chk_track();
        }
    }
}
</script>
