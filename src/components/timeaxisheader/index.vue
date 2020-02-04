<template>
    <div class="timeaxisheader">
        <div class="thcontent">
            <div class="time-left">
                <img src="./images/icon_time.png" alt="">
                <span>出车时间轴</span>
            </div>
            <div class="time-right"  @click="goHome">
                <img src="./images/backhome.png" alt="">
                <span class="">返回首页</span>
            </div>
        </div>
        <div class="th-underline"></div>
    </div>
</template>

<script>
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
        goHome(){
            this.$router.push('/')
        }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/rem.scss';
.timeaxisheader{
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    padding-left: rem(78);
    padding-right: rem(78);
    height: rem(90);
    .thcontent{
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding-bottom: rem(20);
        .time-left{
            display: flex;
            align-items: center;
            justify-content: flex-start;
            font-size: rem(30);
            img{
                width: rem(40);
                height: rem(40);
                margin-right: rem(18);
            }
        }
        .time-right{
            display: flex;
            align-items: center;
            justify-content: flex-start;
            font-size: rem(20);
            cursor: pointer;
            img{
                width: rem(36);
                height: rem(36);
                margin-right: rem(18);
            }
        }
    }
    .th-underline{
        height: 2px;
        width: 100%;
        background:-webkit-linear-gradient(right, rgba(0,0,0,0.1) , rgba(255,255,255,0.6),rgba(0,0,0,0.1)); /* Safari 5.1 - 6.0 */
        // background: -o-linear-gradient(left, rgba(80,80,255,0.2) , #fff); 
        /* Opera 11.1 - 12.0 */
        // background: -moz-linear-gradient(left, rgba(80,80,255,0.2) , #fff); 
        /* Firefox 3.6 - 15 */
        // background: linear-gradient(to left, rgba(80,80,255,0.2) , #fff); 
        /* 标准的语法 */
    }
}
</style>
