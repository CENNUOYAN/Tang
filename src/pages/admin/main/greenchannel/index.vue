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
            repeatAllId: false,
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
    },
    watch: {
        
    },
    methods: {
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
