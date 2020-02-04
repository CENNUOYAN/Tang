<template>
    <div class="base">
        <cusheader></cusheader>
        <router-view/>
    </div>
</template>

<script>
import cusheader from '@/components/header/header'

export default {
    data() {
        return {

        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {

    },
    components: {
        cusheader,
    },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/rem.scss';
.base{
    background:linear-gradient(0deg,rgba(49,49,61,1),rgba(34,31,51,1));
    width: 100vw;
    height: 100vh;
    color: #ffffff;
    overflow: hidden;
}
</style>
