<template>
    <div></div>
</template>


<script>
export default {
    props: ['set_se_pre_con', 'set_api_token', 'set_is_token_new'],
    beforeMount() {
        let user = this.$route.params.token;
        this.set_api_token(user);
        this.set_is_token_new(true);
    },
    mounted() {
        this.set_se_pre_con(false);
        this.$router.push({ name: 'dashboard' });
    }
}
</script>
