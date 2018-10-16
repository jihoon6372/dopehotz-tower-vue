<template>
    <div>
        <div class="sub_title" :style="TitleStyle">
            <div class="title_area">
                <h2>TOWER DOPEHOTZ</h2>
                <h1>ALL DONE!</h1>
            </div>
        </div>
        <div class="content">
            <ul class="mytrack_list_empty">
                <li>
                    <h2>트랙 등록 완료!</h2>
                    <p>내 트랙을 공유해 많은 사람에게 들려주세요.</p>
                    <div class="share_area">
                        <a href="#" class="facebook_share" :style="ShareIcon.Facebook">페이스북 공유</a>
                        <a href="#" class="kakaotalk_share" :style="ShareIcon.Kakao">카카오톡 공유</a>
                        <a href="#" class="kakaostory_share" :style="ShareIcon.KakaoStory">카카오스토리 공유</a>
                    </div>
                    <a href="#" target="_blank">트랙 확인하기</a>
                    <!-- 서비스 페이지 해당 트랙 URL : 새창 이동-->
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
            TitleStyle: 'background-image: url('+require('@/assets/img/sub_main/sub_main03.jpg')+')',
            ShareIcon: {
                Facebook: 'background-image: url('+require('@/assets/img/share/facebook.png')+')',
                Kakao: 'background-image: url('+require('@/assets/img/share/kakaotalk.png')+')',
                KakaoStory: 'background-image: url('+require('@/assets/img/share/kakaostory.png')+')',
            }
        }
    },
    mounted() {
        this.set_se_pre_con(false);
    }
}
</script>
