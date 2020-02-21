<template>
    <div class="medication">
        <div class="check-item">
            <div class="title">
                <span class="left">用药记录</span>
            </div>
            <div class="value value-check">
                <div class="nav-content">
                    <div class="data-item">
                        <div class="item-title">
                            药品名称
                        </div>
                        <el-select v-model="record.drugName" placeholder="请选择" @change="drugChange">
                        <el-option
                            v-for="item in druglists"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="data-item">
                        <div class="item-title">
                            用药方式
                        </div>
                        <el-input v-model="record.drugMethod" placeholder="请先选择药品名称" class="data-input"></el-input>
                    </div>
                    <div class="data-item">
                        <div class="item-title">
                            用药日期
                        </div>
                        <el-date-picker
                          v-model="record.time"
                          type="date"
                          placeholder="选择日期时间">
                        </el-date-picker>
                    </div>
                    <div class="drug-detail">
                            
                        <div class="interval-item">
                            <div class="item-title">
                                用药时段
                            </div>
                            <div class="item-text">
                                <span class="moning">早</span>
                                <span class="noon">中</span>
                                <span class="night">晚</span>
                            </div>
                        </div>
                        <div class="dose-item">
                            <div class="item-title">
                                用药剂量
                            </div>
                            <div class="item-text">
                                <div class="input-item">
                                    <!-- <el-input v-model="input" placeholder="未填写" class="data-input"></el-input> -->
                                    <inputnumber :min="0" :max="30"  @getNumber="getNumberP1" :value="record.morningDose" unit="片"></inputnumber>
                                </div>
                                <div class="input-item">
                                    <inputnumber :min="0" :max="30"  @getNumber="getNumberP2" :value="record.noonDose" unit="片"></inputnumber>
                                    <!-- <el-input v-model="input" placeholder="未填写" class="data-input"></el-input>
                                    <div class="unit">片</div> -->
                                </div>
                                <div class="input-item">
                                    <inputnumber :min="0" :max="30"  @getNumber="getNumberP3" :value="record.nightDose" unit="片"></inputnumber>
                                    <!-- <el-input v-model="input" placeholder="未填写" class="data-input"></el-input>
                                    <div class="unit">片</div> -->
                                </div>
                            </div>
                        </div>
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
            remark: '',
            drugMethod:'',
            numberP1: null,
            numberP2: null,
            numberP3: null,
            numberW: '',
            drugType: '',
            drugIndex: '',
            druglists:[
                {
                    value: 1,
                    label: '多巴胺',
                    type: '口服药',
                    size: '0.5g/片'
                },
                {
                    value: 2,
                    label: '肾上腺素',
                    type: '注射剂',
                    size: '0.25g/片'
                }
            ],
            recordId: '',
            record: '',
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
            if(query && query.recordId){
                this.recordId = query.recordId
            }
            if(query && query.record){
                this.record = query.record
            }
        },
        drugChange(e){
            this.druglists.forEach((item,index)=>{
                if(item.value == this.drugIndex){
                    this.drugMethod = item.type
                }
            })
        },
        openRecord(){
            this.$router.push({
                name: 'medicationrecord'
            })
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
        getNumberP3(value){
            this.numberP3 = value
        },
        updateNumberP3(value){
            this.numberP3 = value
        },
        saving(){
            var drugName;
            var drugSize;
            this.druglists.forEach((item,index)=>{
                if(item.value == this.drugIndex){
                    drugName = item.label
                    drugSize = item.size
                }
            })

            var params = {
                time: this.time,
                drugIndex: this.drugIndex,
                drugName: drugName,
                drugSize: drugSize,
                drugMethod: this.drugMethod,
                morningDose: this.numberP1,
                noonDose: this.numberP2,
                nightDose: this.numberP3,
                remark: this.remark,
            }
            var arr = []
            localStorage.setItem('drugRecord', JSON.stringify(params))
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
.medication{
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
                            height: rem(70);
                            .el-input__inner{
                                width: rem(600);
                                height: rem(70);
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
                            margin-right: rem(150);
                            margin-bottom: rem(20);
                        }
                        .item-text{
                            display: flex;
                            flex-direction: column;
                            text-align: left;
                            padding-left: rem(20);
                            .moning{
                                margin-bottom: rem(10);
                                height: rem(78);
                                line-height: rem(78);
                            }
                            .noon{
                                margin-bottom: rem(10);
                                height: rem(78);
                                line-height: rem(78);
                            }
                            .night{
                                height: rem(78);
                                line-height: rem(78);
                            }
                        }
                    }
                    .dose-item{
                        display: flex;
                        flex-direction: column;
                        /* align-items: center; */
                        .item-title{
                            /* margin-right: rem(100); */
                            padding-left: rem(80);
                            margin-bottom: rem(20);
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
