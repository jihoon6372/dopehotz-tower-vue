<template>
    <div>
        <div class="sub_title" :style="notice_header">
            <div class="title_area">
                <h2>SUPPORT</h2>
                <h1>NOTICE</h1>
            </div>
        </div>
        <div class="content">
            <ul class="board_list">
                <li v-for="article in notice" :key="article.id">
                    <router-link :to="{ name: 'notice-detail', params: {id: article.slug} }"><h4>{{ article.title }}</h4></router-link>
                    <router-link :to="{ name: 'notice-detail', params: {id: article.slug} }"><p>{{ article.content }}</p></router-link>
                    <span>{{ change_date(article.created_at) }}</span>
                </li>
            </ul>
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
            notice: []
        }
    },
    methods: {
        get_notice(){
            this.axios({
                method: 'get',
                url: process.env.API_URL+'/notice/'
            })
            .then(response => {
                this.set_se_pre_con(false);
                this.notice = response.data.results;
            })
        },
        change_date(date){
            let dt = new Date(date);
            return `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()}`;
        }
    },
    mounted() {
        this.set_se_pre_con(true);
        this.get_notice();
    }    
}
</script>
