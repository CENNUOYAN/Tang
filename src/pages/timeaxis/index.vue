<template>
    <div class="timeaxis-con">
        <timeaxisheader></timeaxisheader>
        <!-- <el-slider :min="0" :max="timeList.length" v-model="currentStep" style="width: 100%"></el-slider> -->
        <div class="timeaxis-body">
            <div class="timeaxis-scroll-x">
                <div class="timeaxis-item" :class="{active:currentStep>index}" v-for="(item,index) in timeList" :key="index">
                    <div class="item-con">
                        <div class="time-con">
                            <div class="date">{{item.date||''}}</div>
                            <div class="time">{{item.time||''}}</div>
                        </div>
                        <div class="one-circle"></div>
                        <div class="text">{{item.text}}<span style="color: orange">{{index}}</span></div>
                    </div>
                    <div class="line" v-if="index!==0">
                        <span class="use-time"><img :src="require('./images/cost time.png')" class="icon-time" alt="">{{item.useTime||''}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import timeaxisheader from '@/components/timeaxisheader/index'
import { setTimeAxis } from '@/api/timeaxis/timeaxis'
export default {
    data() {
        return {
            currentStep: 1,
            timeList: [
                {
                    date: '2019-01-01',
                    time: '12:12:12',
                    text: '患者到达医院时间',
                    useTime: '03:12',
                },
                {
                    date: '2019-01-01',
                    time: '12:12:12',
                    text: '患者到达医院时间',
                    useTime: '03:12',
                },
                {
                    date: '2019-01-01',
                    time: '12:12:12',
                    text: '患者到达医院时间',
                    useTime: '03:12',
                },
                {
                    date: '2019-01-01',
                    time: '12:12:12',
                    text: '患者到达医院时间',
                    useTime: '03:12',
                },
                // {
                //     date: '2019-01-01',
                //     time: '12:12:12',
                //     text: '患者到达医院时间',
                //     useTime: '03:12',
                // },
                // {
                //     date: '2019-01-01',
                //     time: '12:12:12',
                //     text: '患者到达医院时间',
                //     useTime: '03:12',
                // },
                // {
                //     date: '2019-01-01',
                //     time: '12:12:12',
                //     text: '患者到达医院时间',
                //     useTime: '03:12',
                // },
                // {
                //     date: '2019-01-01',
                //     time: '12:12:12',
                //     text: '患者到达医院时间',
                //     useTime: '03:12',
                // },
                // {
                //     date: '2019-01-01',
                //     time: '12:12:12',
                //     text: '患者到达医院时间',
                //     useTime: '03:12',
                // },
                // {
                //     date: '2019-01-01',
                //     time: '12:12:12',
                //     text: '患者到达医院时间',
                //     useTime: '03:12',
                // },
                // {
                //     date: '2019-01-01',
                //     time: '12:12:12',
                //     text: '患者到达医院时间',
                //     useTime: '03:12',
                // },
                // {
                //     date: '2019-01-01',
                //     time: '12:12:12',
                //     text: '患者到达医院时间',
                //     useTime: '03:12',
                // },
                // {
                //     date: '2019-01-01',
                //     time: '12:12:12',
                //     text: '患者到达医院时间',
                //     useTime: '03:12',
                // },
                // {
                //     date: '2019-01-01',
                //     time: '12:12:12',
                //     text: '患者到达医院时间',
                //     useTime: '03:12',
                // },
                // {
                //     date: '2019-01-01',
                //     time: '12:12:12',
                //     text: '患者到达医院时间',
                //     useTime: '03:12',
                // },
                // {
                //     date: '2019-01-01',
                //     time: '12:12:12',
                //     text: '患者到达医院时间',
                //     useTime: '03:12',
                // },
                // {
                //     date: '2019-01-01',
                //     time: '12:12:12',
                //     text: '患者到达医院时间',
                //     useTime: '03:12',
                // },
                // {
                //     date: '2019-01-01',
                //     time: '12:12:12',
                //     text: '患者到达医院时间',
                //     useTime: '03:12',
                // },
                // {
                //     date: '2019-01-01',
                //     time: '12:12:12',
                //     text: '患者到达医院时间',
                //     useTime: '03:12',
                // },
                // {
                //     date: '2019-01-01',
                //     time: '12:12:12',
                //     text: '患者到达医院时间',
                //     useTime: '03:12',
                // },
                // {
                //     date: '2019-01-01',
                //     time: '12:12:12',
                //     text: '患者到达医院时间',
                //     useTime: '03:12',
                // },
            ]
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.setTimeAxis()
    },
    watch: {

    },
    methods: {
        setTimeAxis(){
            setTimeAxis().then((res)=>{
                console.log('时间轴数据返回结果：',res);
                if(res.data.code==200){
                    
                }
            })
        }
    },
    components: {
        timeaxisheader
    },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/rem.scss';
.timeaxis-con{
    font-size: rem(24);

    .timeaxis-body{
        overflow-x: auto;
        display: flex;
        justify-content: center;
        padding-top: rem(64);
        .timeaxis-scroll-x{
            padding-left: rem(149);
            // padding-top: rem(64);
            padding-right: rem(47);
            overflow: auto;
            height: calc(100vh - 0.83rem - 0.75rem);
            width: rem(1920);
            box-sizing: border-box;
            .timeaxis-item{
                float: left;
                box-sizing: border-box;
                position: relative;
                margin-right: rem(126);
                margin-bottom: rem(105);

                /*双数行第一个的line*/
                &:nth-child(14n+8){
                    .line{
                        width: rem(102);
                        height: rem(283);
                        right: rem(-62) !important;
                        top: rem(-204);
                        border-top-width: rem(2);
                        border-radius: 0 rem(50) rem(50) 0;
                        border-right-width: rem(2);
                    }
                }
                /*单数行第一个的line*/
                &:nth-child(14n+1){
                    .line{
                        width: rem(102);
                        height: rem(283);
                        left: rem(-62) !important;
                        top: rem(-204);
                        border-top-width: rem(2);
                        border-radius: rem(50) 0 0 rem(50) ;
                        border-left-width: rem(2);
                    }
                }
                /*双数行右浮动*/
                &:nth-child(14n+8),
                &:nth-child(14n+9),
                &:nth-child(14n+10),
                &:nth-child(14n+11),
                &:nth-child(14n+12),
                &:nth-child(14n+13),
                &:nth-child(14n+14){
                    float: right;
                    .line{
                        left: unset;
                        right: rem(-166);
                    }
                }
                /*已完成的特殊样式*/
                &.active{
                    .item-con{
                        opacity: 1;
                        .time-con{
                            opacity: 1;
                        }
                        .one-circle{
                            background: #3DCC9C;
                            border: rem(2) solid transparent;
                        }
                        .text{
                            color: #FFFFFF;
                            opacity: 1;
                        }
                    }
                    .line{
                        opacity: 1;
                        border-style: solid;
                        .use-time{
                            opacity: 0.5;
                        }
                    }
                }
                .item-con {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    opacity: 0.5;
                    .time-con {
                        opacity: 0;
                        width: rem(110);
                        font-size: rem(20);
                        text-align: center;
                        margin-bottom: rem(19);
                    }
                    .one-circle {
                        width: rem(40);
                        height: rem(40);
                        border-radius: 50%;
                        border: rem(2) dashed #3DCC9C;
                        margin-bottom: rem(20);
                    }
                    .text {
                        width: rem(120);
                        font-size: rem(24);
                        color: #FFFFFF;
                    }
                }
                .line {
                    position: absolute;
                    top: rem(55);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: rem(205);
                    left: rem(-166);
                    padding-bottom: rem(6);
                    border: 0 dashed #3DCC9C;
                    border-bottom-width: rem(2);
                    opacity: 0.5;
                    .use-time{
                        opacity: 0;
                        font-size: rem(20);
                        display: flex;
                        align-items: center;
                        color: #E3E4F3;
                        .icon-time{
                            width: rem(24);
                            height: rem(24);
                            margin-right: rem(11);
                            display: inline-block;
                        }
                    }
                }
            }
        }
    }
}
</style>
