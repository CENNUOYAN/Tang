<template>
    <div class="check">
        <div class="diet">
            <div class="diet-header">饮食安排</div>
            <div class="heat">
                <div class="heat-title">每日摄入热量</div>
                <div class="heat-number">2385</div>
                <div class="heat-unit">千卡</div>
            </div>
            <div class="foot-content">
                <div :class="'foot-item ' + item.type" 
                    v-for="(item,index) in rateLists" 
                    :key="index"
                   >
                    <div class="foot-img"></div>
                    <div class="foot-text">
                        <span class="foot-title">主食</span>
                        <span class="foot-detail">每天吃3~4个馒头，每顿饭吃一个拳头大小。全谷为主，粗细搭配</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="motion">
            <div class="motion-header">运动安排</div>
            <div class="motion-main">
                <div class="motion-title">
                    <span>运动推荐</span>
                    <span class="motion-time">以下任选40分钟</span>
                </div>
                <div class="motion-content">
                    <div :class="'motion-item ' + item.type" 
                        v-for="(item,index) in rateLists" 
                        :key="index"
                       >
                        <div class="motion-left">
                            <div class="motion-img"></div>
                            <div class="motion-text">快走</div>
                        </div>
                        <div class="motion-text">
                            <span class="motion-detail">212千卡/40分钟</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="motion-advice">
                <div class="advice-header">系统建议</div>
                <div class="advice-content">
                    <div :class="'advice-item ' + item.type" 
                        v-for="(item,index) in rateLists" 
                        :key="index"
                       >
                        <div class="advice-text">
                            每天吃3~4个馒头，每顿饭吃一个拳头大小。全谷为主，粗细搭配
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import inputnumber from '@/components/inputnumber/index';
import cusslider from '@/components/slider/index';
import {mapState} from 'vuex'
import {getPhysicalCheck,savePhysicalCheck} from '@/api/check/check'
import cusdialog from '@/components/dialog/index'
import dynamicform from '@/components/dynamicForm/index'

export default {
    data() {
        return {
            rateLists:[
                {
                    id:1,
                    name:'清醒'
                },{
                    id:2,
                    name:'昏迷'
                },
                {
                    id:3,
                    name:'死亡'
                },
                {
                    id:4,
                    name:'其他'
                }
            ],
            stateId:'',
        };
    },
    computed: {
        ...mapState({
            patientLists:state=>state.patientLists
        })
    },
    created() {

    },
    mounted() {
        this.dealQuery()
    },
    watch: {
        $route(to,from){
            this.dealQuery()
        }
    },
    methods: {
        dealQuery(){
            // 处理参数
            var query = this.$route.query
            if(query && query.pid){
                this.patientId = query.pid
            }
            if(query && query.mid){
                this.medicalRecordId = query.mid
            }
            this.getPhysicalCheck();
        },
    },
    components: {
        inputnumber,
        cusslider,
        cusdialog,
        dynamicform        
    },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/rem.scss';
.check{
    background:linear-gradient(0deg,rgba(64,60,97,1),rgba(81,77,113,1));
    box-shadow:0px rem(10) rem(30) 0px rgba(16,15,24,0.2);
    border-radius:rem(20);
    overflow:auto;
    box-sizing:border-box;
    padding:rem(60) rem(80) rem(80) rem(80);
    height:100%;
    width:100%;
    display:flex;
    /* flex-direction:column; */
    .diet{
        width: 50%;
        margin-right: rem(30);
        .diet-header{
            text-align: left;
            font-size: rem(28);
            margin-bottom: rem(20);
        }
        .heat{
            background-color: #eaea12;
            /* width: rem(800); */
            height: rem(300);
            border-radius: rem(10);
            padding: rem(20) 0;
            margin-bottom: rem(20);
            flex-direction: column;
            justify-content: space-around;
            display: flex;
            .heat-title{

            }
            .heat-number{
                font-size: rem(42);
            }
        }
        .foot-content{
            .foot-item{
                /* width: rem(900); */
                background-color: #fff;
                display: flex;
                margin-bottom: rem(20);

                .foot-img{
                    width: 45%;
                    height: rem(220);
                    background-color: yellow;
                }
                .foot-text{
                    width: 55%;
                    display: flex;
                    flex-direction: column;
                    /* justify-content: space-between; */
                    padding: rem(30) rem(30);
                    text-align: left;
                    .foot-title{
                        color: #333;
                        font-size: rem(28);
                        margin-bottom: rem(30);
                    }
                    .foot-detail{
                        color: #666;
                        font-size: rem(24);
                        line-height: rem(36);
                    }
                }
            }
        }
    }
    .motion{
        width: 50%;
        .motion-header{
            text-align: left;
            font-size: rem(28);
            margin-bottom: rem(20);
        }
        .motion-main{
            /* width: rem(800); */
            /* width: 50%; */
            /* height: rem(300); */
            border-radius: rem(10);
            padding: rem(0) rem(20);
            margin-bottom: rem(20);
            .motion-title{
                text-align: left;
                font-size: rem(28);
                margin-bottom: rem(20);
                .motion-time{
                    font-size: rem(24);
                    padding-left: rem(20);
                }
            }
            .motion-content{
            .a{

            }
            .motion-item{
                /* width: 50%; */
                height: rem(118);
                font-size: rem(28);
                background-color: #fff;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: rem(20);
                .motion-left{
                    display: flex;
                    align-items: center;
                    padding-left: rem(20);
                    .motion-img{
                        width: rem(88);
                        height: rem(88);
                        background-color: yellow;
                        margin-right: rem(20);
                    }
                    .motion-text{
                        color: #333;
                    }
                }
                
                .motion-text{
                    /* width: 55%; */
                    .motion-detail{
                        color: red;
                        font-size: rem(24);
                        line-height: rem(36);
                        padding-right: rem(20);
                    }
                }
            }
        }
        }
        .motion-advice{
            /* background-color: #fff; */
            padding: 0 rem(20);
            box-sizing: border-box;
            color: #fff;
            text-align: left;
            font-size: rem(28);
            .advice-header{
                /* color: #333; */
                margin-bottom: rem(30);
            }
            .advice-content{
                .advice-item{
                    margin-bottom: rem(20);
                }
            }
        }
        
    }
    .active{
        background:rgba(48,113,242,1);
        box-shadow:0px rem(5) rem(15) 0px rgba(19,23,30,0.1), 0px 0px 2px 0px rgba(255,255,255,1);
    }
    .unactive{
        background:rgba(96,96,128,0);
        box-shadow:0px rem(5) rem(15) 0px rgba(19,23,30,0.1), 0px 0px 2px 0px rgba(255,255,255,1);
    }
}
</style>
