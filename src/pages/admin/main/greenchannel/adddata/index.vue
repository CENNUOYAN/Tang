<template>
    <div class="greenchannel">
        <div class="personal-item">
            <div class="item-title">
                看诊时间
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
            <div class="title title-main">重复</div>
            <div class="content first-content">
                <div :class="'marginBottom securebtns ' + (repeatId.includes(item.id)==true?'btn-act':'btn-unact')" v-for="(item,index) in repeatLists"
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

            </div>

        </div>
    </div>
</template>

<script>
import cusdialog from '@/components/dialog/index'
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
            eatTime: '',
            patientLists:[
            ],
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
            rescureId:1,
            repeatId: [],
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
                {
                    id:8,
                    name:'全部'
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
            outCarDetailId:'1',          //出车id，来源未知
            patientType:1,                  //新增患者类型判断1：普通患者，2：三无患者
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
                    var currIndex = value.indexOf(isHash[0])
                    value.splice(currIndex,1)
                    this.methodId = value
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
            }
            else if(item.id = 2){
                this.rescurelists = this.medicalLists
            }

            // if(this.methodId == item.id){
            //     this.methodId = ''
            // }
            // else{
            //     this.methodId = item.id
            // }
        },
        chooseRepeat(item){
            if(item.id == 8){
                this.allStatus = !this.allStatus
                console.log(this.allStatus)
                if(this.allStatus){
                    this.repeatLists.forEach((item,index)=>{
                        this.repeatId.push(item.id)
                    })
                    console.log('this.repeat',this.repeatId)
                }
                else{
                    console.log()
                    this.repeatId = []
                }
            }
            
            else{
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
                this.repeatLists.forEach((item,index)=>{
                     this.repeatId.forEach((itt,ind)=>{
                        if(item.id<8&&itt==item.id){
                            console.log('22',itt)
                            this.repeatId.push(item.id)
                        }
                    })
                    console.log('33',this.repeatId)
                })
                if(this.repeatId.length>=7){
                    this.repeatId.push(8)
                }
            }
        },
        chooseRescure(item){
            this.rescureId = item.id
        },
        paramsValid(params,necessarys,msg){
            return paramsValid(params,necessarys,msg)
        },
    },  
    components: {
        cusdialog
    },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/rem.scss';
.greenchannel{
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
