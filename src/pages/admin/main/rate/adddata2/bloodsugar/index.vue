<template>
    <div class="bloodsugar">
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
                        <el-input v-model="bloodSugar" placeholder="未填写" class="data-input"></el-input>
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
            <div class="title title-main">备注</div>
            <div class="content second-content">
                <textarea v-model="remark" placeholder="说点什么吧.."/>
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
import { saveBloodsugar } from '@/api/rate/rate'
import {mapState} from 'vuex'

export default {
    data() {
        return {
            time: '', 
            bloodSugar:'',
            remark: '',
            currCheck:1,
            resultLists:[
                {
                    id:1,
                    name:'空腹'
                },
                {
                    id:2,
                    name:'空腹'
                },
                {
                    id:3,
                    name:'早餐后'
                },
                {
                    id:4,
                    name:'午餐前'
                },
                {
                    id:5,
                    name:'午餐后'
                },
                {
                    id:6,
                    name:'晚餐前'
                },
                {
                    id:7,
                    name:'晚餐后'
                },
                {
                    id:8,
                    name:'睡前'
                },
            ],
            patientId:'',
            medicalRecordId:'',
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
            this.currCheck = item.id;
            this.currContent = 1;
        }, 
        saving(){
            var params = {
                time: this.time,
                systolicPressure: this.bloodSugar,
                remark: this.remark,
                type: this.currCheck
            }
            console.log(params)
            // localStorage.setItem('bloodpressure', JSON.stringify(params))
            // var necessarys = ['chiefComplaint']
            // var msg = {
            //     'chiefComplaint':[
            //         {
            //             reg:/./,
            //             msg:'请输入主诉'
            //         }
            //     ]
            // }

            // var status = paramsValid(params,necessarys,msg)
            // if(!status){
            //     return;
            // }
            saveBloodsugar(params).then((res)=>{
                console.log('保存血糖信息返回结果',res);
                // if(res.data.code==200){
                //     this.$message({
                //         message:'保存成功',
                //         type:'success'
                //     })
                //     this.$store.dispatch('getPatientLists')
                // }
                // else{
                //     this.$message({
                //         message:res.data.message,
                //         type:'error'
                //     })
                // }
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
.bloodsugar{
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
                padding-left: rem(20);
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
