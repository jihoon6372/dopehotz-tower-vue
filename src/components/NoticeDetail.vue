<template>
    <div>
        <div class="sub_title" :style="notice_header">
            <div class="title_area">
                <h2>SUPPORT</h2>
                <h1>NOTICE</h1>
            </div>
        </div>
        <div class="content">
            <div>{{ notice.title }}</div>
            <div>{{ notice.content }}</div>
            <div>{{ notice.created_at }}</div>
        </div>
        
    </div>
</template>

<script>
export default {
    props: ['set_se_pre_con'],
    data() {
        return {
            notice_header: {
                'background-image': 'url('+require('@/assets/img/sub_main/sub_main01.jpg')+')'
            },
            notice: {}
        }
    },
    methods: {
        get_notice_detail(){
            this.axios({
                method: 'get',
                url: process.env.API_URL+'/notice/'+this.$route.params.id+'/'
            })
            .then(response => {
                this.notice = response.data;
                this.set_se_pre_con(false);
            });
        }
    },
    mounted() {
        this.set_se_pre_con(true);
        this.get_notice_detail();
    }
}
</script>
