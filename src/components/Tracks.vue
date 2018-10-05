<template>
    <div>
        <div class="sub_title" :style="dashboard_header">
            <div class="title_area">
                <h2>YOUR MUSIC</h2>
                <h1>{{ page_name }}<span>{{ result_data.count }}</span></h1>
            </div>
        </div>

        <div class="content">
            <div class="track_filter_wrap">
                <ul>
                    <li class="selected">
                        <router-link :to="{ name: $route.name , params: { type: $route.params.type } }">RECENTLY POST</router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: $route.name , params: { type: $route.params.type }, query: { order: 'desc', order_type: 'play' } }">TOP PLAYED</router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: $route.name , params: { type: $route.params.type }, query: { order: 'desc', order_type: 'like' } }">TOP LIKED</router-link>
                    </li>
                </ul>
            </div>

            <ul class="mytrack_list_empty" v-if="track_empty">
                <li>
                    <h2>아직 등록된 트랙이 없네요.<br>지금 바로 트랙을 등록해 보세요!</h2>
                    <a href="">트랙 등록하기</a>
                </li>
            </ul>

            <ul class="mytrack_list" v-else>
                <li class="mytrack_list_item" v-for="track in lists" :key="track.id">
                    <div :style="{'background-image': 'url('+change_picture(track.image_url)+')'}">
                        <div class="track_tool_btn"></div>
                        <ul class="track_tools">
                            <li>
                                <a :style="item_edit_btn"></a>
                            </li>
                            <li>
                                <a :style="item_del_btn"></a>
                            </li>
                        </ul>
                        <a class="play_trigger" >
                            <img src="@/assets/img/play.png" @click="play(track)" />
                        </a>
                    </div>
                    <a href="//dopehotz.com/track/track.track_id" target="_blank" class="track_title">
                        <em>{{ track.title }}</em>
                    </a>
                </li>
            </ul>

        </div>
    </div>
</template>

<script>
export default {
    props: ['change_picture', 'parent_user', 'set_se_pre_con', 'play', 'get_api_token'],
    nane: 'tracks',
    data() {
        return {
            lists: [],
            result_data: {
                count: 0
            },
            item_edit_btn: {
                'background-image': 'url('+require('@/assets/img/edit_btn.png')+')',
                'margin-right': '5px'
            },
            item_del_btn: {
                'background-image': 'url('+require('@/assets/img/del_btn.png')+')'
            },
            dashboard_header: {
                'background-image': 'url('+require('@/assets/img/sub_main/sub_main02.jpg')+')'
            },

            track_empty: false,
            page_name: '',
            scroll_request: false,
            before_scrollY: 0,
            user: this.parent_user
        }
    },
    methods: {
        track_delete() {

        },
        get_track_data: function(is_reset){
            if(is_reset == 'reset') this.lists = [];
            let _api_url;
            let reset_track_key_name;
            
            if (this.$route.params.type === undefined){
                _api_url = process.env.API_URL+'/v1/tracks/me/';
                this.page_name = 'ALL TRACKS';
                reset_track_key_name = 'all';
            }

            if (this.$route.params.type == 'on-stage'){
                _api_url = process.env.API_URL+'/v1/tracks/me/on-stage/';
                this.page_name = 'ON STAGE';
                reset_track_key_name = 'on_stage';
            }

            if (this.$route.params.type == 'open-mic'){
                _api_url = process.env.API_URL+'/v1/tracks/me/open-mic/';
                this.page_name = 'OPEN MIC';
                reset_track_key_name = 'open_mic';
            } 

            let _params = {}

            if(this.$route.query.order_type) _params.order_type = this.$route.query.order_type;
            if(this.$route.query.order) _params.order = this.$route.query.order;

            let url = new URL(_api_url), params = _params;

            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            
            if(this.scroll_request){
                if(this.next_url){
                    url = this.next_url;
                }else{
                    this.scroll_request = false;
                    return false;
                }
            }

            fetch(url, {
                headers: {
                    "Authorization": this.get_api_token()
                }
            })
            .then(res => res.json())
            .then(res => {
                this.result_data = res;
                this.lists = this.lists.concat(res.results);
                this.user.track_list_count[reset_track_key_name] = res.count;

                if(res.next) {
                    this.next_url = res.next;
                }else{
                    this.next_url = '';
                }

                if(this.lists.length <= 0) {
                    this.track_empty = true;
                }else{
                    this.track_empty = false;
                }

                this.scroll_request = false;
                this.set_se_pre_con(false);
            });
            
        },
        handleScroll: function (self) {
            if((self.scrollY+window.innerHeight)/document.body.clientHeight*100 > 98){
                if(this.before_scrollY < self.scrollY && !this.scroll_request){
                    this.scroll_request = true;
                    this.get_track_data();
                }
            }
            this.before_scrollY = self.scrollY;
        },
        move_update: function(track_id){
            location.href = "/post/"+track_id+"/update/";
        }
    },
	created() {
        var self = this;
        window.addEventListener('scroll', function (event) {
            self.handleScroll(this);
        });
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    mounted() {
        this.get_track_data();
        this.set_se_pre_con(true);
    },
    watch: {
        '$route' (to, from) {
            if(to.params.type != from.params.type) this.result_data.count = '';            
            this.get_track_data('reset');
            this.set_se_pre_con(true);
        }
    }
}
</script>
