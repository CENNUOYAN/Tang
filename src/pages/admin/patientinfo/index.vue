<template>
    <div class="patientinfo">
        <div class="personal-item">
            <div class="item-title">
                用药时间
            </div>
            <el-time-select
            v-model="eatTime"
            :picker-options="{
                start: '00:00',
                step: '00:01',
                end: '23:59'
            }"
            placeholder="选择时间">
            </el-time-select>
        </div>
        <div class="green-item">
            <div class="title title-main">治疗药物</div>
            <div class="content first-content">
                <div :class="'marginBottom securebtns ' + (methodId.includes(item.id)==true?'btn-act':'btn-unact')" v-for="(item,index) in methodLists"
                    :key="index">
                    <span :class="' checkbox checkbox-small '+(methodId.includes(item.id)==true?'active':'unactive')"
                        @click="chooseMethod(item)"
                        >
                        <div class="inner-shadow"></div>
                        {{item.name}}
                    </span>
                    <span class="iconing">
                        <img class="icon" src="./images/less.png" @click="removeMethodItem(item)"/>
                    </span>
                </div>

            </div>

            <div class="panel" v-if="panelStatus">
                <div class="trans"></div>
                <div class="panel-content">
                    <span :class="'checkbox checkbox-small '+(rescureId==item.id?'active':'unactive')"
                        v-for="(item,index) in rescurelists"
                        @click="chooseRescure(item)"
                        :key="index"
                        >
                        <div class="inner-shadow"></div>
                        {{item.name}}
                    </span>
                </div>
            </div>

        </div>
        <div class="green-item">
            <div class="title title-main">重复</div>
            <div class="content first-content">
                <div :class="'marginBottom securebtns '" v-for="(item,index) in repeatLists"
                    :key="index">
                    <span :class="' checkbox checkbox-small '+(repeatId.includes(item.id)==true?'active':'unactive')"
                        @click="chooseRepeat(item)"
                        >
                        <div class="inner-shadow"></div>
                        {{item.name}}
                    </span>
                    <!-- <span class="iconing">
                        <img class="icon" src="./images/less.png" @click="removeMethodItem(item)"/>
                    </span> -->
                </div>
                <div :class="'marginBottom securebtns '">
                    <span :class="' checkbox checkbox-small '+(repeatAllId==true?'active':'unactive')"
                        @click="chooseRepeatAll"
                        >
                        <div class="inner-shadow"></div>
                        全部
                    </span>
                </div>
            </div>

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
import dynamicform from '@/components/dynamicForm/index'
import { CONFIG_DATA } from '@/libs/defaultdata/index'
import { 
    savePatient,
    getPatientList,
    getAllProvince,
    getByProvinceId,
    saveCompanions,
    bindWristband,
    saveMysterious,
    getAll,
    saveEmergency,
    getNations } from '@/api/patientinfo/patientinfo'
import { paramsValid } from '@/utils/common'
export default {
    data() {
        return {
            title: '',
            eatTime: '',
            patientLists:[],
            panelStatus: false,
            methodLists:[
                {
                    id:1,
                    name:'胰岛素',
                },
                {
                    id:2,
                    name:'口服药',
                },
                // {
                //     id:3,
                //     name:'常用药物',
                // }
            ],
            methodId:[],
            rescurelists: [],
            medicalLists:[
                {
                    id:1,
                    name:'多巴胺'
                },
                {
                    id:2,
                    name:'肾上腺素'
                },
                {
                    id:3,
                    name:'硝酸甘油'
                }
            ],
            medicalId:[],
            insulinlists:[
                {
                    id:1,
                    name:'甘精胰岛素(来得时)'
                },
                {
                    id:2,
                    name:'甘精胰岛素(长秀霖)'
                },
                {
                    id:3,
                    name:'地特胰岛素(诺如平)'
                },
                {
                    id:4,
                    name:'中效人胰岛素(诺和灵N)'
                },
            ],
            rescureId: '',
            repeatId: [],
            repeatAllId: false,
            repeatLists:[
                {
                    id:1,
                    name:'周一'
                },
                {
                    id:2,
                    name:'周二'
                },
                {
                    id:3,
                    name:'周三'
                },
                {
                    id:4,
                    name:'周四'
                },
                {
                    id:5,
                    name:'周五'
                },
                {
                    id:6,
                    name:'周六'
                },
                {
                    id:7,
                    name:'周日'
                },
            ],
            allStatus: false,
            isDialog:false,
            baseinfoForm:{      //基本信息表单数据
                name:'新消息',
                age:29,
                gender:1,
                country:'',
                province:'',
                city:'',
                nation:'',
                job:'',
                pain:'',
                scene:'',
                idnumber:'440589562356489564',
                certificateType:'',
                patientId:'',
                medicalRecordId:''
            }, 
            insulinFormLists:[
                {
                    id:1,
                    value:null,
                    unit:'U',
                    type:3,
                    name:'剂量'
                },
            ],
            hypoglycemicFormLists:[
                {
                    id:1,
                    value:null,
                    unit:'粒',
                    type:3,
                    name:'剂量'
                },
            ],
            formLists:[
                // {
                //     id:1,
                //     value:null,
                //     unit:'粒',
                //     type:3,
                //     name:'剂量'
                // },
                // {
                //     id:2,
                //     value:null,
                //     unit:'U',
                //     type:3,
                //     name:'剂量'
                // },
                // {
                //     id:10,
                //     value:null,
                //     unit:'V',
                //     type:5,
                //     name:'指标1'
                // },
                // {
                //     id:10,
                //     value:null,
                //     unit:'V',
                //     type:5,
                //     name:'指标1'
                // },
                // {
                //     id:3,
                //     value:null,
                //     unit:'',
                //     type:6,
                //     name:'复苏开始时间'
                // },
                // {
                //     id:4,
                //     value:null,
                //     unit:'',
                //     type:6,
                //     name:'复苏结束时间'
                // },
                // {
                //     id:5,
                //     value:[100,200],
                //     unit:'',
                //     type:2,
                //     name:'多选',
                //     data:[
                //         {
                //             id:100,
                //             name:'多选1'
                //         },
                //         {
                //             id:200,
                //             name:'多选2'
                //         },
                //         {
                //             id:600,
                //             name:'多选3'
                //         }
                //     ]

                // },
                // {
                //     id:7,
                //     value:null,
                //     unit:'',
                //     type:1,
                //     name:'单选',
                //     data:[
                //         {
                //             id:300,
                //             name:'单选1'
                //         },
                //         {
                //             id:400,
                //             name:'单选2'
                //         }
                //     ]
                // }
            ],
            outCarDetailId:'1',          //出车id，来源未知
            patientType:1,                  //新增患者类型判断1：普通患者，2：三无患者
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        console.log(this.formLists)
    },
    watch: {
        
    },
    methods: {
        chooseMethod(item){
            var value = this.methodId
            this.panelStatus = true
            console.log('item---->',item)
            console.log('rescurelists===>',this.rescurelists)
            if(value && value.length==0){
                this.methodId.push(item.id)
            }
            else{
                var isHash = value.filter(items=>items==item.id)
                if(isHash && isHash.length>0){
                    // var currIndex = value.indexOf(isHash[0])
                    // value.splice(currIndex,1)
                    // this.methodId = value
                }
                else{
                    this.methodId.push(item.id)
                }
            }
            console.log('methods',this.methodId)
            // let result = this.saveTreatmentAndCare(firstAidMeasuresInfo,drugTreatmentInfo).then((res)=>{
            //     console.log('请求结果：',res);
            //     if(res.data.code==200){
            //         this.$message({
            //             message:'保存成功',
            //             type:'success'
            //         })
            //         this.getTreatmentAndCare()
            //     }
            //     else{
            //         this.$message({
            //             message:res.data.message,
            //             type:'error'
            //         })
            //     }
            // })

            if(item.id == 1){
                this.rescurelists = this.insulinlists
                this.formLists = this.insulinFormLists
            }
            else if(item.id = 2){
                this.rescurelists = this.medicalLists
                this.formLists = this.hypoglycemicFormLists
            }

            // if(this.methodId == item.id){
            //     this.methodId = ''
            // }
            // else{
            //     this.methodId = item.id
            // }
        },
        chooseRepeatAll(){
            this.repeatAllId = !this.repeatAllId
            if(this.repeatAllId){
                this.repeatLists.forEach((item,index)=>{
                    this.repeatId.push(item.id)
                })
            }
            else{
                this.repeatId = []
            }
        },
        chooseRepeat(item){
            var value = this.repeatId
        
            if(value && value.length==0){
                this.repeatId.push(item.id)
            }
            else{
                var isHash = value.filter(items=>items==item.id)
                if(isHash && isHash.length>0){
                    var currIndex = value.indexOf(isHash[0])
                    value.splice(currIndex,1)
                    this.repeatId = value
                }
                else{
                    this.repeatId.push(item.id)
                }
            }
            this.repeatId.forEach((itt,ind)=>{
                if(ind == 6){
                    this.repeatAllId = true
                    console.log('11111111111')
                }
                else{
                    this.repeatAllId = false
                }
            })
        },
        chooseRescure(item){
            this.rescureId = item.id
            this.openDialog()
        },
        removeMethodItem(item){
            // this.methodId = ''
            // var value = this.methodId
            var value = []
            this.methodId.forEach((itt,ind)=>{
                value.push(itt)
            })
            var isHash = value.filter(items=>items==item.id)
            var currIndex = value.indexOf(isHash[0])
            value.splice(currIndex,1)
            this.methodId = value
            this.panelStatus = false
            // var value = []
            // this.methodId.forEach((itt,ind)=>{
            //     value.push(itt)
            // })

            // if(value && value.length==0){
            //     value.push(item.id)
            // }
            // else{
            //     var isHash = value.filter(items=>items==item.id)
            //     if(isHash && isHash.length>0){
            //         var currIndex = value.indexOf(isHash[0])
            //         value.splice(currIndex,1)

            //     }
            //     else{
            //         value.push(item.id)
            //     }
            // }
            
            // let id = item.id   
            // let result = this.removefatherItem(id).then((res)=>{
            //     if(res.data.code==200){
            //         this.$message({
            //             message:'保存成功',
            //             type:'success'
            //         })
            //         this.methodId = value
            //     }
            //     else{
            //         this.$message({
            //             message:res.data.message,
            //             type:'error'
            //         })
            //     }
            // })
            
        },
        paramsValid(params,necessarys,msg){
            return paramsValid(params,necessarys,msg)
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
    },  
    components: {
        cusdialog,
        dynamicform,
    },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/rem.scss';
.patientinfo{
    font-size:rem(24);
	padding-left: rem(80);
	// min-height: rem(560);
	box-sizing: border-box;
    .personal-item{
        margin-bottom:rem(59);
        display: flex;
        align-items: center;
        .item-title{
            // background:red;
            text-align:left;
            font-size:rem(28);
            width: rem(140);
        }   
        .el-select{
            width: rem(600);
            // height: rem(100);
            box-sizing:border-box;
            .el-input{
                width: rem(600);
                height: rem(100);
                .el-input__inner{
                    width: rem(600);
                    height: rem(100);
                    box-sizing:border-box;
                }
                .el-select__caret{
                    
                }
            }
        }   
        .el-date-editor{
            width: rem(600);
        } 
        .username{
            width: rem(600);
            height: rem(100);
            box-sizing:border-box;
            border-radius: rem(10);
            border: none;
        }     
    }
    .green-item{
        margin-bottom:rem(60);
        .title{
            text-align:left;
            margin-bottom:rem(30);
        }
        .title-time{
            font-size:rem(24);
            color:rgba(255,255,255,0.5);
        }
        .title-main{
            font-size:rem(30);
        }
        .first-content{
            display: flex;
            flex-wrap: wrap;
        }

        .second-content{
            // width:rem(600);
            width:100%;
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

    
    .panel{
        border:1px solid rgba(255,255,255,.5);
        width: 88%;
        // min-height: rem(149);
        margin-top: rem(20);
        position: relative;
        border-radius: rem(10);
        padding:rem(30);
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        .trans{
            position: absolute;
            width: 0;
            height: 0;
            border: rem(13) solid;
            border-color: transparent transparent #fff transparent;
            top: rem(-27);
            left: rem(105);
            &::after{
                content: "";
                position: absolute;
                width: rem(15);
                height: rem(15);
                background: #514d71;
                box-sizing: border-box;
                border: rem(3) dashed #514d71;
                transform: rotate(45deg);
                top: rem(6);
                left: rem(-9);
            }
        }
        .panel-content{
            display: flex;
            .con{
                margin-right: rem(60);
                display: flex;
                flex-direction: column;
                .value{
                    display: inline-block;
                    margin-bottom: rem(30);
                }
                .value-slider{
                    display: inline-block;
                }
            }
        }
        .marginTop{
            margin-top: rem(40);
        }
    }

    .marginBottom{
        margin-bottom: rem(40);
    }
    .securebtns{
        display: flex;
        align-items: center;
        margin-right: rem(40);
        .checkbox-small{
            margin-right: 0 !important;
        }
    }
    .btn-unact .iconing{
        display: none;
    }
    .btn-act .iconing{
        width: rem(50);
        height: rem(50);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: rem(20);
        margin-right: rem(20);
    }
}
</style>
