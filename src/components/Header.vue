<template>
    <div>
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
                        <!-- <a href="//dopehotz.com">DOPEHOTZ</a> -->
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
                    $(".menu_btn_m,.layout_menu,body").removeClass("open");
                    $(".page_cover").fadeOut(200);
                    history.back();
                }else {
                    $(".menu_btn_m,.layout_menu,body").addClass("open");
                    $(".page_cover").fadeIn(200);
                    // history.replaceState({}, "page 2", "?menu-open=true");
                    history.pushState({}, "page 2", "#/dashboard/?menu-open=true");
                }
            }
        },
        beforeMount() {
        },
        mounted() {
        },
        watch: {
            '$route' (to, from){
                $(".menu_btn_m,.layout_menu,body").removeClass("open");
                $(".page_cover").fadeOut(200);
                // console.log('fff');
            }
        }
    }
</script>