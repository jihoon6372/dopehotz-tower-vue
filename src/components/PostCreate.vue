<template>
    <div>
        <div class="sub_title" :style="sub_title_style">
            <div class="title_area">
                <h2>TOWER DOPEHOTZ</h2>
                <h1>NEW TRACK</h1>
            </div>
        </div>
        <div class="content">
            
            <div class="innercontent_layout_l">
                
                <div class="content_title_wrap">
                    <h3>TRACK INFO</h3>
                </div>
                <div class="content_tile">
                        <div class="tile_upper_title">
                            <h4>트랙소개(필수)</h4>
                        </div>
                    <div class="input_form">
                        <label for="trackdec">트랙에 대한 사연, 컨셉, 설명 등을 입력해 주세요.</label>
                        <textarea id="trackdec" name="tape_info" v-model="tape_info" maxlength="600" placeholder="트랙에 대한 사연, 컨셉, 설명 등을 입력해 주세요."></textarea>
                    </div>
                </div>
                <div class="content_tile">
                    <div class="tile_upper_title">
                        <h4>가사입력(선택)</h4>
                    </div>
                    <div class="input_form">
                        <label for="lyrics">가사가 있는 트랙일 경우 입력해주세요.</label>
                        <textarea id="lyrics" name="lyrics" v-model="lyrics" maxlength="1200" placeholder="이 곡의 가사를 적어주세요."></textarea>
                    </div>
                </div>
                <div class="content_tile">
                    <div class="tile_upper_title">
                        <h4>태그입력(선택)</h4>
                    </div>
                    <div class="input_form">
                        <div class="tag_wrap">
                            <label for="tracktag">태그를 정확하게 입력할 수록 많은 반응을 이끌어낼 수 있습니다.</label>
                            <input id="tracktag" type="text" class="tagged form_control" name="tag" data-removeBtn="true" placeholder="태그를 입력해주세요. / 엔터로 구분">
                        </div>
                    </div>
                </div>
                <div class="content_tile">
                    <div class="tile_upper_title">
                        <h4>공개 범위 설정</h4>
                    </div>
                    <div class="input_form">
                        <label for="public">상업적 사용 가능 여부를 설정해 주세요.</label>
                        <select name="public" id="public" model="public">
                            <option value="">라이센스 공개 범위</option>
                            <option value="0">상업적 사용 불가</option>
                        <option value="1">상업적 사용 허용</option>
                    </select>
                </div>
                <div class="input_form">
                    <label for="distribute">수정 및 배포 가능 여부를 설정해 주세요.</label>
                    <select name="distribute" id="distribute" v-model="distribute">
                        <option value="">라이센스 공개 범위</option>
                        <option value="0">수정 및 배포 불가</option>
                        <option value="1">수정 및 배포 허용</option>
                    </select>
                </div>
            </div>
            
            <div class="track_submit_wrap">
                <router-link :to="{ name: 'post_select' }" class="track_submit">트랙 다시 선택</router-link>
                <button class="track_submit" v-on:click="track_submit">트랙 공개하기</button>
            </div>
        </div>
        <div class="innercontent_layout_r">
            <div class="content_title_wrap">
                <h3>PREVIEW</h3>
            </div>
            <div class="track_item_preview">
                <a class="opm_thumb" :style="style1Object">
                    <div class="opm_play rateit">
                        <img class="play_btn_img play_trigger" src="@/assets/img/play.png"  data-tracknum=" track_id }}">
                    </div>
                </a>
                <div class="opm_info">
                    <div class="opm_profile_img" style="background-image: url( track_image }});"></div>
                    <a>
                        <p> {{ user.profile.nickname }}</p>
                    </a>
                    <a><h4> track_data.title</h4></a>
                    <a class="opm_track_like" :style="opmtracklikeStyle" data-dope="좋아요 메시지"></a>
                </div>
                <div class="opm_feedback">
                    <span class="play_rate_btn"><p :style="playratebtnStyle"></p><a>0</a></span>
                    <span class="dope_btn"><p :style="dopebtnStyle"></p><a>0</a></span>
                    <span class="comnt_btn"><p :style="comntbtnStyle"></p><a>0</a></span>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    props: ['parent_user'],
    data() {
        return {
            style1Object: {
                'background-image': ''
            },
            opmtracklikeStyle: 'background-image: url('+require('@/assets/img/dope_icon_set.png')+')',
            playratebtnStyle: 'background-image: url('+require('@/assets/img/play_icon.png')+')',
            dopebtnStyle: 'background-image: url('+require('@/assets/img/dope.png')+')',
            comntbtnStyle: 'background-image: url('+require('@/assets/img/cmnt_icon.png')+')',
            sub_title_style: 'background-image: url('+require('@/assets//img/sub_main/sub_main03.jpg')+')',
            user: this.parent_user,
            tape_info: '',
            lyrics: '',
            public: '',
            distribute: '',
        }
    },
    methods: {
        track_submit() {
            return
        }
    },
    mounted() {
        
    }
}
</script>
