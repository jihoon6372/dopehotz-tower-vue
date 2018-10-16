<template>
    <div>
        <div class="close-float-player" v-if="player_active">
            <div class="float-player">
                <div class="progress">
                    <div class="progress-bar" style="width: 13.4346%;"></div>
                </div>
                <div class="art" :class="{ loading: is_loading }" :style="art_image_style"></div>
                <div class="info">
                    <div class="song">{{ player_song_title }}</div>
                    <div class="title">{{ player_title }}</div>
                </div>
                <div class="controls">
                    <button class="play" :style="player_style" @click="pause_and_play()"></button>
                </div>
                <div class="float-player-close-btn" :style="player_close_style" @click="player_close()"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            player_style: {
                'background-image': ''
            },
            player_close_style: {
                'background-image': 'url('+require('@/assets/img/player_close_btn.png')+')'
            },
            art_image_style: {
                'background-image': 'url('+require('@/assets/img/loading.gif')+')'
            },
            is_play: false,
            player_active: false,
            is_loading: true,
            player_song_title: '',
            player_title: ''
        }
    },
    methods: {
        set_player() {
            if(this.is_play){
                this.player_style['background-image'] = 'url('+require('@/assets/img/pause.png')+')';
            }else{
                this.player_style['background-image'] = 'url('+require('@/assets/img/play.png')+')';
            }
        },
        play(data) {
            this.start_loading();
            this.is_play = !this.is_play;
            this.player_active = true;
            let self = this;


            setTimeout(function(){
                self.loading_complate(data);
            }, 1000);
        },
        stop() {
            this.is_play = false;
            this.set_player();
        },
        player_close() {
            this.stop();
            this.player_active = false;
        },
        start_loading() {
            this.art_image_style['background-image'] = 'url('+require('@/assets/img/loading.gif')+')';
            this.is_loading = true;
            this.set_player_title('미리듣기 로딩중입니다.', '로딩이 완료되면 재생을 눌러주세요.');
        },
        loading_complate(data) {
            this.art_image_style['background-image'] = 'url('+data.image_url+')';
            this.is_loading = false;
            this.set_player();
            this.set_player_title(data.title, data.user.profile.nickname);
        },
        set_player_title(a, b) {
            this.player_song_title = a;
            this.player_title = b;
        },
        pause_and_play(){
            this.is_play = !this.is_play;
            this.player_active = true;
            this.set_player();
        }
    }
}
</script>
