<template>
    <div :class="MainHeaderObject">
        <!-- PC 버전 헤더 -->
        <div class="header_index" v-if="is_main">
            <div class="logo_area">
                <router-link :to="{ name: 'Main' }" :style="header_logo"></router-link>
            </div>
        </div>

        <div v-else>
            <div id="header">
                <div class="logo_area">
                    <router-link :to="{ name: 'Main' }" :style="header_logo"></router-link>
                </div>
            </div>
            <div id="base_m_menu_app">
                <div class="menu_btn_m" v-on:click="menu_toggle">
                    <i></i><i></i><i></i>
                </div>
                <div id="header_m">
                    <div class="logo_area">
                        <router-link :to="{ name: 'Main' }" :style="header_logo"></router-link>
                    </div>
                </div>
                <div class="page_cover" v-on:click="menu_toggle"></div>
                <div class="layout_menu">
                    <div class="profile_wrap">
                        <div class="profile_img" :style="{'background-image': 'url('+user.profile.profile_picture+')'}"></div>
                        <em>{{ user.profile.nickname }}</em>
                        <strong>official</strong>
                    </div>
                    <ul class="main_menu">
                        <li>
                            <router-link :to="{ name: 'notice' }">NOTICE</router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'dashboard' }">DASHBOARD</router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'post' }">POST TRACK</router-link>
                        </li>
                    </ul>
                    <h2 class="menu_title">YOUR MUSIC</h2>
                    <ul class="main_menu">
                        <li>
                            <router-link :to="{ name: 'tracks' }">ALL TRACKS<span>{{ user.track_list_count.all }}</span></router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'tracks_type', params: { type: 'on-stage' } }">ON STAGE<span>{{ user.track_list_count.on_stage }}</span></router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'tracks_type', params: { type: 'open-mic' } }">OPEN MIC<span>{{ user.track_list_count.open_mic }}</span></router-link>
                        </li>
                    </ul>
                    <h2 class="menu_title">SOCIAL</h2>
                    <ul class="main_menu">
                        <li>
                            <router-link :to="{ name: 'profile' }">EDIT PROFILE</router-link>
                        </li>
                    </ul>
                    <div class="header_top_btn_area">
                        <router-link :to="{ name: 'Main' }" :style="header_top_btn_area_logo">DOPEHOTZ</router-link>
                    </div>
                    <div class="logout_wrap">
                        <router-link :to="{ name: 'logout' }">LOG OUT</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['parent_user', 'track_info', 'is_main'],
        data() {
            return {
                user: this.parent_user,
                before_page: undefined,
                header_logo: {
                    'background-image': 'url('+require('@/assets/img/logo_m.png')+')'
                },
                header_top_btn_area_logo: {
                    'background-image': 'url('+require('@/assets/img/main_logo.png')+')'
                }
            }
        },
        methods: {
            menu_toggle(){
                if ($(".menu_btn_m").hasClass('open')){
                    if (history.length > 2) {
                        this.$router.go(-1);
                        // history.back();
                    }else{
                        delete this.$route.query.menu_open;
                        this.set_query();
                        this.set_menu('close');
                    }
                }else {
                    this.set_menu('open');
                }
            },
            
            set_menu(type){
                if(type == 'open'){
                    setTimeout(function(){
                        $(".menu_btn_m,.layout_menu,body").addClass("open");
                        $(".page_cover").fadeIn(200);
                    });
                    if(!('menu_open' in this.$route.query)){
                        Object.assign(this.$route.query, { menu_open: 'true' });
                        this.set_query();
                    }

                }else{
                    $(".menu_btn_m,.layout_menu,body").removeClass("open");
                    $(".page_cover").fadeOut(200);
                    delete this.$route.query.menu_open;
                }
            },

            set_query(){
                let route = this.$route;
                let query = Object.keys(route.query).reduce(function(a,k){a.push(k+'='+encodeURIComponent(route.query[k]));return a},[]).join('&');
                let path;
                path = Object.keys(route.query).length == 0 ? this.$route.path : this.$route.path+"?"+query;
                history.pushState({}, "toggle_menu", "#"+path);
            }
        },
        beforeMount() {

        },
        mounted() {
            if('menu_open' in this.$route.query){
                this.set_menu('open');
            }
        },
        watch: {
            '$route' (to, from){
                if('menu_open' in this.$route.query){
                    this.set_menu('open');
                }else{
                    this.set_menu('close');
                }
            }
        },
        computed: {
            MainHeaderObject() {
                return {
                    main_header_height: !this.is_main
                }
            }
        }
    }
</script>

<style scoped>
    .main_header_height{
        height: 60px;
    }
    @media only screen and (max-width: 1120px) {
        .main_header_height{
            height: 40px;
        }
    }
</style>
