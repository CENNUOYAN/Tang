<template>
    <div class="bloodpressure">
        <div class="check-item">
            <div class="title">
                <span class="left">添加血压</span>
            </div>
            <div class="value value-check">
                <div class="nav-content">
                    <div class="data-item">
                        <div class="item-title">
                            测量时间
                        </div>
                        <el-date-picker
                          v-model="record.time"
                          type="datetime"
                          placeholder="选择日期时间">
                        </el-date-picker>
                    </div>
                    <div class="data-item">
                        <div class="item-title">
                            收缩压
                        </div>
                        <!-- <el-input v-model="input" placeholder="请填写血压数据" class="data-input"></el-input> -->
                        <inputnumber :min="30" :max="300"  @getNumber="getNumberP1" :value="record.systolicPressure" unit="mmHg"></inputnumber>
                        <slider :min="10" :max="200" :num="record.systolicPressure" @updateVal="updateNumberP1"></slider>
                        <!-- <span class="unit">mmHg</span> -->
                    </div>
                    <div class="data-item">
                        <div class="item-title">
                            舒张压
                        </div>
                        <!-- <el-input v-model="input" placeholder="请填写血压数据" class="data-input"></el-input> -->
                        <inputnumber :min="30" :max="300"  @getNumber="getNumberP2" :value="record.diastolicPressure" unit="mmHg"></inputnumber>
                        <slider :min="10" :max="200" :num="record.diastolicPressure" @updateVal="updateNumberP2"></slider>
                        <!-- <span class="unit">mmHg</span> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="check-item">
            <div class="title title-main">备注</div>
            <div class="content second-content">
                <textarea v-model="record.remark" placeholder="今天有啥特殊情况，比如情绪不佳、劳累等"/>
            </div>
        </div>
        <div class="save-item">
            <el-button type="primary" class="main-btn" @click.native="saving">保存</el-button>
        </div>
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
            time: '', 
            numberP1: null,
            numberP2: null,
            currId:'',
            recordId: '',
            record: '',
            remark: '',
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
            if(query && query.recordId){
                this.recordId = query.recordId
            }
            if(query && query.record){
                this.record = query.record
            }
        },
        chooseRun(item){
            this.currId = item.id;
            this.openDialog()
        },
        openRecord(){
            this.$router.push({
                name: 'pressurerecord'
            })
        },
        openDialog(){
            this.isDialog = true;
        },
        closeDialog(value){
            this.isDialog = value;
        },
        getNumberP1(value){
            this.record.systolicPressure = value
        },
        updateNumberP1(value){
            this.record.systolicPressure = value
        },
        getNumberP2(value){
            this.record.diastolicPressure = value
        },
        updateNumberP2(value){
            this.record.diastolicPressure = value
        },
        choose(item){
            this.currCheck = item.id;
            this.currContent = 1;
        }, 
        saving(){
            var params = {
                time: this.time,
                systolicPressure: this.numberP1,
                diastoliPressure: this.numberP2,
                remark: this.remark,
            }
            var arr = []
            localStorage.setItem('bloodpressure', JSON.stringify(params))
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
.bloodpressure{
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
