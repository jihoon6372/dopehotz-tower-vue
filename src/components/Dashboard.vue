<template>
    <div>                
        <!-- 트랙이 있을때 -->
        <div class="sub_title" :style="dashboard_header">
            <div class="title_area">
                <h2>YOUR DOPEHOTZ</h2>
                <h1>DASHBOARD</h1>
            </div>
        </div>
        <div class="content">
            <div class="innercontent_layout_l">
                <div class="dashboard_top_con">
                    <ul>
                        <li>
                            <h2>플레이</h2>
                            <em>{{ user.user_track_info.play_count }}</em>
                            <p>공유한 모든 트랙의 총 플레이 수</p>
                        </li>
                        <li>
                            <h2>좋아요</h2>
                            <em>{{ user.user_track_info.like_count }}</em>
                            <p>공유한 모든 트랙의 총 좋아요 수</p>
                        </li>
                        <li>
                            <h2>이야기</h2>
                            <em>{{ user.user_track_info.comment_count }}</em>
                            <p>공유한 모든 트랙의 댓글 수</p>
                        </li>
                    </ul>
                </div>
                <div class="content_tile">
                    <h3 class="tile_title">가장 많은 좋아요 수</h3>
                    <ul class="dashboard_track_list" v-if="track.like_list.length">

                        <li class="list_s_h" v-for="track in track.like_list" :key="track.id">
                            <img :src="track.image_url">
                            <a href="#트랙 디테일">
                                <p class="subject_title">{{ track.title }}</p>
                                <p class="subject_artist">{{ track.user.profile.nickname }}</p>
                            </a>
                            <p class="data_field"><span class="like" :style="like_style"></span>{{ track.like_count }}</p>
                            <div class="play_trigger" :style="playbtn_style" v-on:click="play(track)"></div>
                        </li>
                    </ul>
                    <ul class="dashboard_track_list" v-else>
                        <li class="list_s_h">
                            <strong>아직 등록한 트랙이 없습니다.</strong>
                        </li>
                    </ul>
                </div>

                <div class="content_tile">
                    <h3 class="tile_title">가장 많은 재생 수</h3>
                    <ul class="dashboard_track_list" v-if="track.play_list.length">

                        <li class="list_s_h" v-for="track in track.play_list" :key="track.id">
                            <img :src="track.image_url">
                            <a href="#트랙 디테일">
                                <p class="subject_title">{{ track.title }}</p>
                                <p class="subject_artist">{{ track.user.profile.nickname }}</p>
                            </a>
                            <p class="data_field"><span class="played" :style="play_style"></span>{{ track.play_count }}</p>
                            <div class="play_trigger" :style="playbtn_style" v-on:click="play(track)"></div>
                        </li>
                    </ul>
                    <ul class="dashboard_track_list" v-else>
                        <li class="list_s_h">
                            <strong>아직 등록한 트랙이 없습니다.</strong>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="innercontent_layout_r">
                    <div class="content_title_wrap">
                            <h3>NOTICE</h3>
                        </div>
                <ul class="notice_list_wrap">
                    <li>
                        <a href="#">
                            <h4>저작권법 위반 없는 깨끗한 분위기 조성에 동참해 주세요.</h4>
                            <p>타인의 곡을 도용하거나 공유해선 안되는 저작권을 가진 트랙 공유는 불법입니다.</p>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <h4>업데이트 2018/07/18</h4>
                            <p>사운드 클라우드 프로필 연동이 시작되었습니다. 이제 사운드 클라우드 계정을 연동해 더 쉽게 트랙을 공유하세요!</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    
    </div>
</template>

<script>
export default {
  name: 'Dashboard',
  props: ['parent_user', 'api_data', 'play', 'set_se_pre_con', 'get_api_token'],
  data () {
    return {
        dashboard_header: {
            'background-image': 'url('+require('@/assets/img/sub_main/sub_main01.jpg')+')'
        },
        like_style: {
            'background-image': 'url('+require('@/assets/img/dope.png')+')'
        },

        play_style: {
            'background-image': 'url('+require('@/assets/img/play_icon.png')+')'
        },

        playbtn_style: {
            'background-image': 'url('+require('@/assets/img/play.png')+')'
        },

        track: {
            like_list: [],
            play_list: []
        },

        is_seen: true,

        user: this.parent_user
    }
  },
  methods: {
    get_track_list(_type){
        let _api_url, _params, track_key;
        _api_url = process.env.API_URL+'/v1/tracks/me/';
        _params = {
            order: 'desc',
            limit: 5
        }

        if (_type == 'like'){
            _params.order_type = 'like';
            track_key = 'like_list';

        }
        if (_type == 'play'){
            _params.order_type = 'play';
            track_key = 'play_list';
        }
    
        let url = new URL(_api_url), params = _params;
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

        fetch(url, {
            headers: {
                "Authorization": this.get_api_token()
            }
        })
        .then(res => res.json())
        .then(res => {
            this.track[track_key] = res.results;
            this.set_se_pre_con(false);
        });
      }
  },
  mounted() {
      this.get_track_list('like');
      this.get_track_list('play');
  },
  beforeMount(){
    this.set_se_pre_con(true);
  }
}
</script>

<style scoped>

</style>
