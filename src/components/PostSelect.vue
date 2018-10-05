<template>
    <div>
        <div class="content">
            <div class="post_carousel_wrap">
                <h2>공개할 트랙을 선택해 주세요.</h2>
                <ul class="post_carousel">
                    <li class="post_track_con" v-for="track in track_list" :key="track.id">
                        <img :src="get_track_image(track)">
                        <p>{{ track.title }}</p>
                        <router-link :to="{ name: 'post_create', params: { id: track.id } }" class="select_post_btn">선택</router-link>
                    </li>
                </ul>
                <div class="prev_select select_arrow" :style="prev_select"></div>
                <div class="next_select select_arrow" :style="next_select"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['parent_user', 'set_se_pre_con', 'change_picture'],
    data() {
        return {
            user: this.parent_user,
            prev_select: 'background-image: url('+require('@/assets/img/back_arrow.png')+')',
            next_select: 'background-image: url('+require('@/assets/img/next_arrow.png')+')',
            track_list: []
        }
    },
    methods: {
        get_track_list() {
            const url = 'http://api.soundcloud.com/users/'+this.user.profile.soundcloud_id+'/tracks/?client_id='+process.env.SOUNDCLOUD_KEY;
            fetch(url)
            .then(res => res.json())
            .then(res => {
                this.track_list = res;
                this.set_se_pre_con(false);
                let self = this;
                setTimeout(function(){
                    self.set_carousel();
                });
            });
        },

        set_carousel(){
            let track_select = $(".post_carousel");

            track_select.owlCarousel({
                margin:50,
                loop:false,
                autoWidth:true,
                items:1,
                center:true,
                autoplay:false,
                URLhashListener:false,
                nav: true,
            });

            $(".prev_select").click(function () {
                track_select.trigger('prev.owl.carousel');
            });

            $(".next_select").click(function () {
                track_select.trigger('next.owl.carousel');
            }); 
        },

        get_track_image(track){
            let return_image;
            if(track.artwork_url){
                return_image = track.artwork_url;
            }else{
                return_image = track.user.avatar_url;
            }

            return this.change_picture(return_image);
        }
    },
    mounted(){
        this.set_se_pre_con(true);
        let self = this;
        let is_user_profile = setInterval(function(){
            if(self.user.profile.soundcloud_id !== undefined){
                self.get_track_list();
                clearInterval(is_user_profile);
            };
        });   
    }
}
</script>
