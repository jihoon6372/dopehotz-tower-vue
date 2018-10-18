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
                <li>
                    <a href="#"><h4>업로드 전 반드시 저작권을 확인하세요!</h4></a>
                    <a href="#"><p>가사, 멜로디 등 허락되지 않은 다른 저작물의 지식재산권을 침해 하지 않았는지 확인해주세요. 도파츠는 아티스트의 저작권 위반에 대한 어떠한 법적 책임과 권리가 없음을 유의해 주시기 바랍니다.</p></a>
                    <span>2018.10.18</span>
                </li>
                <li>
                    <a href="#"><h4>업로드 전 반드시 저작권을 확인하세요!</h4></a>
                    <a href="#"><p>가사, 멜로디 등 허락되지 않은 다른 저작물의 지식재산권을 침해 하지 않았는지 확인해주세요. 도파츠는 아티스트의 저작권 위반에 대한 어떠한 법적 책임과 권리가 없음을 유의해 주시기 바랍니다.</p></a>
                    <span>2018.10.18</span>
                </li>
                <li>
                    <a href="#"><h4>업로드 전 반드시 저작권을 확인하세요!</h4></a>
                    <a href="#"><p>가사, 멜로디 등 허락되지 않은 다른 저작물의 지식재산권을 침해 하지 않았는지 확인해주세요. 도파츠는 아티스트의 저작권 위반에 대한 어떠한 법적 책임과 권리가 없음을 유의해 주시기 바랍니다.</p></a>
                    <span>2018.10.18</span>
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
            }
        }
    },
    mounted() {
        this.set_se_pre_con(false);
    }    
}
</script>
