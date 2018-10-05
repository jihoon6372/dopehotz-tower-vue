<template>
    <div>

    </div>
</template>

<script>
export default {
    props: ['reset_user'],
    mounted() {
        localStorage.removeItem("user");
        this.reset_user();
        location.href=process.env.AUTH_URL+'/logout/?next='+process.env.TOWER_URL;
        // this.$router.push({ name: 'Main' });
    }
}
</script>
