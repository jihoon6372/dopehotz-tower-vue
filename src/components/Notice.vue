<template>
    <div>
        <div class="sub_title" :style="notice_header">
            <div class="title_area">
                <h2>NOTICE</h2>
                <h1>NOTICE</h1>
            </div>
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
            }
        }
    },
    mounted() {
        this.set_se_pre_con(false);
    }    
}
</script>
