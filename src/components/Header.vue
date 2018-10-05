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
                    <h2 class="menu_title">ARTIST</h2>
                    <ul class="main_menu">
                        <li>
                            <a>{{ user.profile.nickname }}<span :style="{'background-image': 'url('+user.profile.profile_picture+')'}"></span></a>
                        </li>
                        
                        <li>
                            <router-link :to="{ name: 'logout' }">LOG OUT</router-link>
                        </li>
                    </ul>
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
                    history.pushState({}, "page 2", "#/menu-open");
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