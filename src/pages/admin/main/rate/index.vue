<template>
    <div class="rate">
        <div class="check-item">
            <div class="content first-content">
                <span :class="'checkbox checkbox-small '+(currId==item.id?'active':'unactive')"
                    v-for="(item,index) in greenchannelLists"
                    @click="choose(item)"
                    :key="index"
                    >
                    <div class="inner-shadow"></div>
                    {{item.name}}
                </span>
            </div>

        </div>
        <!-- <router-view></router-view> -->
    </div>
</template>

<script>
import cusdialog from '@/components/dialog/index'
import inputnumber from '@/components/inputnumber/index'
import slider from '@/components/slider/index'
import { saveTraumaScore,getTraumaScore,getScoreItems } from '@/api/rate/rate'
import {mapState} from 'vuex'

export default {
    data() {
        return {
            greenchannelLists:[
                {
                    id: 'seedata',
                    name:'血糖数据'
                },
                {
                    id: 'adddata2',
                    name:'添加数据'
                },
            ],
            currId: '',
            time: '', 
            input:'',
            numberP1: '',
            numberP2: '',
            numberW: '',
            resultLists:[
                {
                    id:1,
                    name:'空腹'
                },
                {
                    id:2,
                    name:'早餐后'
                },
                {
                    id:3,
                    name:'午餐前'
                },
                {
                    id:4,
                    name:'午餐后'
                },
                {
                    id:5,
                    name:'晚餐前'
                },
                {
                    id:6,
                    name:'晚餐后'
                }
            ],
            drugType: '',
            drug: '',
            druglists:[
                {
                    value: 1,
                    label: '多巴胺'
                },
                {
                    value: 2,
                    label: '肾上腺素'
                    
                }
            ],
            currCheck:1,
            currId:'',
            patientId:'',
            medicalRecordId:'',
            classifyIdLists:[]
        };
    },
    computed: {
        ...mapState({
            patientLists:state=>state.patientLists
        }),   
    },
    created() {

    },
    mounted() {
        this.dealQuery();
    },
    watch: {
        $route(to,from){
            this.dealQuery();
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
        },
        choose(item){
            this.currId = item.id;
            this.$router.push({
                name: item.id
            })
        },
    },
    components: {
        cusdialog,
        inputnumber,
        slider,
    },
};
</script>

<style lang="scss">
@import '@/assets/scss/rem.scss';
.rate{
    background:linear-gradient(0deg,rgba(64,60,97,1),rgba(81,77,113,1));
    box-shadow:0px rem(10) rem(30) 0px rgba(16,15,24,0.2);
    border-radius:rem(20);
    overflow:auto;
    box-sizing:border-box;
    height:100%;
    width:100%;
    padding-top: rem(30);
    .check-item{
        text-align: left;
        /* margin-bottom:rem(59); */
        padding-left: rem(30);
        .title{
            text-align:left;
            font-size:rem(30);
            margin-bottom: rem(35);
        }   
        .value{
            display:flex;
            width:100%;
            .nav{
                width:100%;
                .nav-lists{
                    display:flex;
                    justify-content:flex-start;
                    margin-bottom:rem(50);
                    span{
                        display:inline-block;
                        margin-right:rem(60);
                        font-size:rem(24);
                        cursor: pointer;
                    }
                    .nav-active{
                        font-weight:bold;
                        color:#6BA5FF;
                    }
                }
            }
            .nav-content{
                display:flex;
                flex-direction: column;
                padding-left: rem(20);
                text-align: left;
                .data-item{
                    display: flex;
                    align-items: center;
                    margin-bottom: rem(20);
                    .item-title{
                        /* margin-right: rem(50); */
                        width: rem(128);
                    }
                    .data-input{
                        width: rem(600);
                        height: rem(70);
                        box-sizing:border-box;
                        margin-right: rem(20);
                        border-radius: rem(10);
                        border: none;
                        .el-input__inner{
                            width: rem(600);
                            height: rem(70);
                        }
                    }  
                    .el-date-editor{
                        width: rem(600);
                        .el-input__inner{
                            width: rem(600);
                            height: rem(70);
                        }
                    }
                    .el-select{
                        width: rem(600);
                        // height: rem(100);
                        box-sizing:border-box;
                        .el-input{
                            width: rem(600);
                            /* height: rem(100); */
                            .el-input__inner{
                                width: rem(600);
                                /* height: rem(100); */
                                box-sizing:border-box;
                            }
                            .el-select__caret{
                                
                            }
                        }
                    }
                    .inputnumber{
                        margin-right: rem(80);
                    }
                }
                .drug-detail{
                    display: flex;
                    .interval-item{
                        display: flex;
                        flex-direction: column;
                        .item-title{
                            margin-right: rem(100);
                            margin-bottom: rem(30);
                        }
                        .item-text{
                            display: flex;
                            flex-direction: column;
                            text-align: left;
                            padding-left: rem(20);
                            .moning{
                                margin-bottom: rem(50);
                            }
                            .noon{
                                margin-bottom: rem(50);
                            }
                        }
                    }
                    .dose-item{
                        display: flex;
                        flex-direction: column;
                        .item-title{
                            margin-right: rem(100);
                            margin-bottom: rem(15);
                        }
                        .item-text{
                            display: flex;
                            flex-direction: column;
                            text-align: left;
                            /* padding-left: rem(20); */
                            .input-item{
                                display: flex;
                                align-items: center;
                                margin-bottom: rem(20);
                                .data-input{
                                    margin-right: rem(20);
                                }
                            }
                        }
                    }
                }
            }
        }  
        .second-content{
            // width:rem(600);
            width:88%;
            height:rem(120);
            margin-bottom:rem(40);
            textarea{
                width:100%;
                height:100%;
                background:rgba(96,96,128,1);
                box-shadow:0px 0px 2px 0px rgba(255,255,255,1);
                border-radius:rem(10);
                padding:rem(40);
                box-sizing:border-box;
                border:none;
                color:#ffffff;
            }
            textarea::-webkit-input-placeholder {
                color:rgba(255,255,255,0.5);
            }
            textarea:-moz-placeholder {
                color:rgba(255,255,255,0.5);
            }
            textarea::-moz-placeholder {
                color:rgba(255,255,255,0.5);
            }
            textarea:-ms-input-placeholder {
                color:rgba(255,255,255,0.5);

            }
        }
        .value-check{
            flex-direction:column;
        }            
    }
    .save-item{
        /* display: flex;
        padding-left: rem(50);
        margin-bottom: rem(20); */
        padding-bottom: rem(30);
        .main-btn{
            width: rem(80);
            height: rem(50);
        }
    }

    .checkbox-small{
        // width:rem(176);
        line-height:rem(80);
        height:rem(80);
        margin-right:rem(40);
        padding-left:rem(41);
        padding-right:rem(41);
        
    }
    .checkbox{
        font-size:rem(24);
        display:inline-block;
        color:#ffffff;
        text-align:center;
        border-radius:rem(10);
        cursor:pointer;
        position: relative;
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
