<template>
    <div class="adddata">
        <!-- <div class="sp-data">血糖数据</div>
        <div class="add-data">
            +
        </div> -->
        <div class="check-item">
            <div class="title">添加血糖数据</div>
            <div class="value value-check">
                <div class="nav">
                    <div class="nav-lists">
                        <span :class="currCheck==item.id?'nav-active':''" v-for="(item,index) in resultLists"
                            :key="index"
                            @click="choose(item)">
                            {{item.name}}
                        </span>
                    </div>
                    <div class="underline"></div>
                </div>
                <div class="nav-content">
                    <div class="data-item">
                        <div class="item-title">
                            血糖数据
                        </div>
                        <el-input v-model="input" placeholder="未填写" class="data-input"></el-input>
                        <span class="unit">mmol/L</span>
                    </div>
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
            <div class="title">添加血压</div>
            <div class="value value-check">
                <div class="nav-content">
                    <div class="data-item">
                        <div class="item-title">
                            收缩压
                        </div>
                        <!-- <el-input v-model="input" placeholder="请填写血压数据" class="data-input"></el-input> -->
                        <inputnumber :min="30" :max="300"  @getNumber="getNumberP1" :value="numberP1" unit="mmHg"></inputnumber>
                        <slider :min="10" :max="200" :num="numberP1" @updateVal="updateNumberP1"></slider>
                        <!-- <span class="unit">mmHg</span> -->
                    </div>
                    <div class="data-item">
                        <div class="item-title">
                            舒张压
                        </div>
                        <!-- <el-input v-model="input" placeholder="请填写血压数据" class="data-input"></el-input> -->
                        <inputnumber :min="30" :max="300"  @getNumber="getNumberP2" :value="numberP2" unit="mmHg"></inputnumber>
                        <slider :min="10" :max="200" :num="numberP2" @updateVal="updateNumberP2"></slider>
                        <!-- <span class="unit">mmHg</span> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="check-item">
            <div class="title">添加饮食记录</div>
            <div class="value value-check">
                <div class="nav-content">
                    <div class="data-item">
                        <div class="item-title">
                            添加时间
                        </div>
                        <el-date-picker
                          v-model="time"
                          type="datetime"
                          placeholder="选择日期时间">
                        </el-date-picker>
                    </div>
                    <div class="data-item">
                        <div class="item-title">
                            早餐
                        </div>
                        <el-input v-model="input" placeholder="未填写" class="data-input"></el-input>
                        <span class="unit">mmol/L</span>
                    </div>
                    <div class="data-item">
                        <div class="item-title">
                            午餐
                        </div>
                        <el-input v-model="input" placeholder="未填写" class="data-input"></el-input>
                        <span class="unit">mmol/L</span>
                    </div>
                    <div class="data-item">
                        <div class="item-title">
                            晚餐
                        </div>
                        <el-input v-model="input" placeholder="未填写" class="data-input"></el-input>
                        <span class="unit">mmol/L</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="check-item">
            <div class="title">添加运动记录</div>
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
            <div class="title">添加体重</div>
            <div class="value value-check">
                <div class="nav-content">
                    <div class="data-item">
                        <div class="item-title">
                            体重
                        </div>
                        <!-- <el-input v-model="input" placeholder="请填写血压数据" class="data-input"></el-input> -->
                        <inputnumber :min="10" :max="200"  @getNumber="getNumberW" :value="numberW" unit="kg"></inputnumber>
                        <slider :min="10" :max="200" :num="numberW" @updateVal="updateNumberW"></slider>
                        <!-- <span class="unit">mmHg</span> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="check-item">
            <div class="title">用药记录</div>
            <div class="value value-check">
                <div class="nav-content">
                    <div class="data-item">
                        <div class="item-title">
                            药品名称
                        </div>
                        <el-select v-model="drug" placeholder="请选择">
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
                        <el-input v-model="input" placeholder="未填写" class="data-input"></el-input>
                    </div>
                    <div class="data-item">
                        <div class="item-title">
                            用药日期
                        </div>
                        <el-date-picker
                          v-model="time"
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
                                <span>晚</span>
                            </div>
                        </div>
                        <div class="dose-item">
                            <div class="item-title">
                                用药剂量
                            </div>
                            <div class="item-text">
                                <div class="input-item">
                                    <el-input v-model="input" placeholder="未填写" class="data-input"></el-input>
                                    <div class="unit">片</div>
                                </div>
                                <div class="input-item">
                                    <el-input v-model="input" placeholder="未填写" class="data-input"></el-input>
                                    <div class="unit">片</div>
                                </div>
                                <div class="input-item">
                                    <el-input v-model="input" placeholder="未填写" class="data-input"></el-input>
                                    <div class="unit">片</div>
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
                <textarea v-model="remark" placeholder="请输入患者既往病史.."/>
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
import slider from '@/components/slider/index'
import { saveTraumaScore,getTraumaScore,getScoreItems } from '@/api/rate/rate'
import {mapState} from 'vuex'

export default {
    data() {
        return {
            time: '', 
            input:'',
            numberP1: '',
            numberP2: '',
            numberW: '',
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
    },
};
</script>

<style lang="scss">
@import '@/assets/scss/rem.scss';
.adddata{
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
                /* flex-direction: column; */
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
        padding-bottom: rem(30);
        .main-btn{
            width: rem(80);
            height: rem(50);
        }
    }
}
</style>
