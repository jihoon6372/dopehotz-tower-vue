<template>
    <div>    
        <div class="sub_title" :style="dashboard_header">
            <div class="title_area">
                <h2>TOWER DOPEHOTZ</h2>
                <h1>POST TRACK</h1>
            </div>
        </div>
        <div class="content">
            <div class="post_ready">
                <h2>새로운 트랙을 완성 하셨나요?<br>지금 바로 트랙을 등록해 보세요!</h2>
                <router-link :to="{ name: 'post_select' }">트랙 등록하기</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['set_se_pre_con'],
        name: 'Post',
        data() {
            return {
                dashboard_header: {
                    'background-image': 'url('+require('@/assets/img/sub_main/sub_main03.jpg')+')'
                }
            }
        },
        mounted() {
            this.set_se_pre_con(false);
        }
    }
</script>
