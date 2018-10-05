<template>
  <div>

    <div class="main_slide">
        <ul class="main_carousel">
            <li>
                <div class="carousel_bg" :style="back1"></div>
                <div class="carousel_content align_left">
                    <div>
                        <h3>Can be played everywhere.</h3>
                        <h2>언제 어디에서나
                            <br> 내 음악을 들려주세요.</h2>
                        <p>카페에서 혹은 매장에서 내 음악이 재생될 수 있습니다. 내 작업물을 공유하고 어디에서든 재생될 수 있게 하세요.</p>
                        <div>
                            <router-link :to="{ name: 'dashboard' }" v-if="get_only_api_token()">시작하기</router-link>
                            <a v-bind:href="auth_url()" v-else>시작하기</a>
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="carousel_bg" :style="back2"></div>
                <div class="carousel_content align_left">
                    <div>
                        <h3>Release your work now.</h3>
                        <h2>내 작업물을
                            <br> 최초로 공개하세요.</h2>
                        <p>혹시 정성스럽게 작업한 내 작업물이
                            <br>클라우드에서 혹은 외장하드에서 잠자고 있지 않나요?
                            <br>완성이 아니어도 좋습니다.
                            <br>지금 바로 내 창작물을 공개하세요.
                            <br>음악은 사람들이 들어줄 때 가장 빛이 납니다.</p>
                            <div>
                                <router-link :to="{ name: 'dashboard' }" v-if="get_only_api_token()">시작하기</router-link>
                                <a v-bind:href="auth_url()" v-else>시작하기</a>
                            </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="carousel_bg" :style="back3"></div>
                <div class="carousel_content align_left">
                    <div>
                        <h3>Share. And increase followers.</h3>
                        <h2>작업물을 공유하고
                            <br>팔로워를 늘려보세요.</h2>
                        <p>카페에서 혹은 매장에서 내 음악이 재생될 수 있습니다. 내 작업물을 공유하고 어디에서든 재생될 수 있게 하세요.</p>
                        <div>
                            <router-link :to="{ name: 'dashboard' }" v-if="get_only_api_token()">시작하기</router-link>
                            <a v-bind:href="auth_url()" v-else>시작하기</a>
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="carousel_bg" :style="back4"></div>
                <div class="carousel_content align_left">
                    <div>
                        <h3>Communicate with listeners.</h3>
                        <h2>내 음악을 듣는
                            <br> 리스너와 소통하세요.</h2>
                        <p>내 하드디스크, 노트북, 클라우드에서 혹은 외장하드에서 잠자고 있는 내 창작물을 지금 공개해 보세요. 당신이 누구라도 상관 없습니다.</p>
                        <div>
                            <router-link :to="{ name: 'dashboard' }" v-if="get_only_api_token()">시작하기</router-link>
                            <a v-bind:href="auth_url()" v-else>시작하기</a>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>

  </div>
</template>

<script>
export default {
    props: ['set_se_pre_con', 'parent_user', 'get_only_api_token'],
    data() {
        return {
            back1: 'background-image: url('+require('@/assets/img/slide/slide02.jpg')+')',
            back2: 'background-image: url('+require('@/assets/img/slide/slide01.jpg')+')',
            back3: 'background-image: url('+require('@/assets/img/slide/slide03.jpg')+')',
            back4: 'background-image: url('+require('@/assets/img/slide/slide04.jpg')+')',
        }
    },

    methods:{
        main() {
            let main_carousel = $('.main_carousel');
            main_carousel.owlCarousel({
                items: 1,
                center: true,
                loop: true,
                nav: false,
            });
        },
        auth_url(){
            return '//auth.dopehotz.com/?next='+process.env.TOWER_URL;
        }
    },

    beforeMount(){
        
    },

    mounted(){
        this.main();
        this.set_se_pre_con(false);
    },
    
}
</script>
