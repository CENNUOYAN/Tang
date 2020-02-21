<template>
    <div class="motion">
        
        <div class="check-item">
            <div class="title">
                <span class="left">添加运动记录</span>
                <span class="right" @click="openRecord">历史记录</span>
            </div>
            <div class="value value-check">
                <div class="nav-content">
                    <div class="data-item">
                        <div class="item-title">
                            测量时间
                        </div>
                        <el-date-picker
                          v-model="time"
                          type="datetime"
                          placeholder="选择日期时间">
                        </el-date-picker>
                    </div>
                </div>
            </div>
        </div>
        <div class="check-item">
            <!-- <div class="title">添加运动记录</div> -->
            <div class="content first-content">
                <span :class="'checkbox checkbox-small '+(currId==item.id?'active':'unactive')"
                    v-for="(item,index) in runLists"
                    @click="chooseRun(item)"
                    :key="index"
                    >
                    <div class="inner-shadow"></div>
                    {{item.name}}
                </span>
            </div>
        </div>
        <div class="check-item">
            <div class="title title-main">备注</div>
            <div class="content second-content">
                <textarea v-model="remark" placeholder="今天有啥特殊情况，比如情绪不佳、劳累等"/>
            </div>
        </div>
        <div class="save-item">
            <el-button type="primary" class="main-btn" @click.native="saving">保存</el-button>
        </div>
        <cusdialog :title="title" :status="isDialog" @closeDialog="closeDialog">
            <div class="slot-con" slot="body-slot">
                <div class="form-con">
                    <dynamicform  :formLists="formLists" @updateFormLists="updateFormLists"></dynamicform>
                    <div class="dialog-operate"> 
                        <el-button type="primary" class="main-btn" @click.native="saving">保存</el-button>
                    </div>
                </div>
            </div>
        </cusdialog>
    </div>
</template>

<script>
import cusdialog from '@/components/dialog/index'
import inputnumber from '@/components/inputnumber/index'
import dynamicform from '@/components/dynamicForm/index'
import slider from '@/components/slider/index'
import { saveTraumaScore,getTraumaScore,getScoreItems } from '@/api/rate/rate'
import {mapState} from 'vuex'

export default {
    data() {
        return {
            title: '',
            time: '', 
            input:'',
            remark: '',
            runLists:[
                {
                    id:1,
                    name:'快走'
                },
                {
                    id:2,
                    name:'跑步'
                },
                {
                    id:3,
                    name:'太极拳'
                },
                {
                    id:4,
                    name:'跳舞'
                },
                {
                    id:5,
                    name:'游泳'
                },
                {
                    id:6,
                    name:'散步'
                },
                {
                    id:7,
                    name:'爬山'
                }
            ],
            formLists:[
                {
                    id:1,
                    value:null,
                    unit:'分钟',
                    type:5,
                    energy: 3.83,
                    name:'快走',
                    duration: 30,
                },
            ],
            currCheck:1,
            currId:'',
            patientId:'',
            medicalRecordId:'',
            classifyIdLists:[],
            isDialog: false,
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
        chooseRun(item){
            this.currId = item.id;
            this.openDialog()
        },
        openRecord(){
            this.$router.push({
                name: 'motionrecord'
            })
        },
        updateFormLists(lists){
            this.formLists = lists;
        },
        openDialog(){
            this.isDialog = true;
        },
        closeDialog(value){
            this.isDialog = value;
        },
        getNumberP1(value){
            this.numberP1 = value
        },
        updateNumberP1(value){
            this.numberP1 = value
        },
        getNumberP2(value){
            this.numberP2 = value
        },
        updateNumberP2(value){
            this.numberP2 = value
        },
        getNumberW(value){
            this.numberW = value
        },
        updateNumberW(value){
            this.numberW = value
        },
        choose(item){
            this.currCheck = item.id;
            this.currContent = 1;
        }, 
    },
    components: {
        cusdialog,
        inputnumber,
        slider,
        dynamicform,
    },
};
</script>

<style lang="scss">
@import '@/assets/scss/rem.scss';
.motion{
    background:linear-gradient(0deg,rgba(64,60,97,1),rgba(81,77,113,1));
    box-shadow:0px rem(10) rem(30) 0px rgba(16,15,24,0.2);
    border-radius:rem(20);
    overflow:auto;
    box-sizing:border-box;
    height:100%;
    width:100%;
    padding-top: rem(30);
    .check-item{
        /* margin-bottom:rem(59); */
        padding-left: rem(30);
        .title{
            text-align:left;
            font-size:rem(30);
            margin-bottom: rem(35);
            display: flex;
            justify-content: space-between;
            padding-right: rem(30);
        }   
        .value{
            display:flex;
            width:100%;
            .nav-content{
                display:flex;
                /* flex-direction: column; */
                /* padding-left: rem(20); */
                text-align: left;
                .data-item{
                    display: flex;
                    align-items: center;
                    margin-bottom: rem(30);
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
            }
        }  
        .first-content{
            margin-bottom: rem(20);
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
    .active{
        background:rgba(48,113,242,1);
        box-shadow:0px rem(5) rem(15) 0px rgba(19,23,30,0.1), 0px 0px 2px 0px rgba(255,255,255,1);
    }
    .unactive{
        background:rgba(96,96,128,0);
        box-shadow:0px rem(5) rem(15) 0px rgba(19,23,30,0.1), 0px 0px 2px 0px rgba(255,255,255,1);
    }
    .save-item{
        /* display: flex;
        padding-left: rem(50);
        margin-bottom: rem(20); */
        padding-top: rem(30);
        padding-bottom: rem(30);
        .main-btn{
            width: rem(80);
            height: rem(50);
        }
    }
}
</style>
