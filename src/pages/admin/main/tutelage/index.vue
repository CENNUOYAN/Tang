<template>
    <div class="tutelage">
        治疗计划
    </div>
</template>

<script>
import inputnumber from '@/components/inputnumber/index';
import cusslider from '@/components/slider/index';
import { CONFIG_DATA } from '@/libs/defaultdata/index'
import { saveVitalSign,getVitalSign } from '@/api/tutelage/tutelage'
import { paramsValid } from '@/utils/common'
import {mapState} from 'vuex'

export default {
    data() {
        return {
            options:[
                {
                    value:1,
                    label:'选项1'
                }
            ],
            value:'',
            num: 1,
            value2: 50,
            info:[
				{
					id:1,
					name:'体征',
					time:'15:45',
					data:['T:23','B:20','R:35']
				},
            ],
            signLists:CONFIG_DATA.SIGN_,
            sign:'',
            mindLists:CONFIG_DATA.MIND_,
            mind:'',
            stateId:'',
            recordLists:[
                // {
                //     id:1,
                //     name:'到达现场',
                //     address:1,
                //     time:'2019-12-12 12:12',
                //     consciousness:1,
                //     temperature:35,
                //     respiration:80,
                //     pulse:80,
                //     bloodPressure:[100,102],
                //     signsId:1,
                // },
                // {
                //     id:2,
                //     name:'转运途中',
                //     address:2,
                //     time:'2019-12-12 12:12',
                //     consciousness:2,
                //     temperature:40,
                //     respiration:82,
                //     pulse:78,
                //     bloodPressure:[99,104],
                //     signsId:2,
                // }
            ],
            numberT:null,
            numberR:null,
            numberBp1:null,
            numberBp2:null,
            numberP:null,
            patientId:'',
            medicalRecordId:'',
            signsId:'',
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
            this.getVitalSign();

        },
        formatTooltip(val) {
            return val / 100;
        },
        changeSign(val){
            console.log('修改了标志',val);
            // 选择了修改标志后，先寻找匹配数据，找不到数据则清空当前数据
            // var item = this.recordLists.filter(item=>item.address == val)
            // if(item && item.length > 0){
            //     this.dealData(item[0]);
            // }
            // else{
            //     this.dealData('',val)
            // }
            this.dealData('',val)
        },
        handleChange(value) {
            console.log(value);
        },
        goSelect(){
            console.log('去采集了');
            
        },
        openDetail(item){
            this.dealData(item)
        },
        dealData(item,sign){
            let address = ''
            let mind = ''
            let numberT = null
            let numberR = null

            let numberBp1 = null
            let numberBp2 = null
            let numberP = null

            let signsId = ''
            if(item){

                let id = item.id
                console.log('item=>',id);
                address = item && item.address?item.address:''
                mind =  item && item.consciousness?item.consciousness:''
    
                numberT = item && item.temperature?item.temperature:null
                numberR = item && item.respiration?item.respiration:null
    
                var bloodPressure = item.bloodPressure
                if(typeof bloodPressure == 'string' && bloodPressure!==''){
                    bloodPressure = JSON.parse(bloodPressure)
                    console.log('bloodz字符串',bloodPressure);
                    item.bloodPressure = bloodPressure
                }
                
                if(item.bloodPressure){
                    numberBp1 = item && item.bloodPressure && item.bloodPressure.length>0?item.bloodPressure[0]:null
                    numberBp2 = item && item.bloodPressure && item.bloodPressure.length>1?item.bloodPressure[1]:null
                }
                numberP = item && item.pulse?item.pulse:null
                signsId = item && item.signsId?item.signsId:''
            }

            this.sign = sign?sign:address
            this.mind = mind
            this.numberT = numberT
            this.numberR = numberR
            this.numberBp1 = numberBp1
            this.numberBp2 = numberBp2
            this.numberP = numberP     
            this.signsId = signsId       
        },
        getNumberT(value){
            this.numberT = value
        },
        updateNumberT(value){
            this.numberT = value
        },
        getNumberR(value){
            this.numberR = value
        },
        updateNumberR(value){
            this.numberR = value
        },
        getNumberBp1(value){
            this.numberBp1 = value
        },
        updateNumberBp1(value){
            this.numberBp1 = value
        },
        getNumberBp2(value){
            this.numberBp2 = value
        },
        updateNumberBp2(value){
            this.numberBp2 = value
        },
        getNumberP(value){
            this.numberP = value
        },
        updateNumberP(value){
            this.numberP = value
        },
        saveVitalSign(){
            var bloodPressure = (this.numberBp1 !== '' && this.numberBp1 !== null && !window.isNaN(this.numberBp1))
                        &&(this.numberBp2 !== '' && this.numberBp2 !== null && !window.isNaN(this.numberBp2))?JSON.stringify([this.numberBp1,this.numberBp2]):''

            var numberT = (this.numberT !== '' && this.numberT !== null && !window.isNaN(this.numberT))?this.numberT:''
            var numberR = (this.numberR !== '' && this.numberR !== null && !window.isNaN(this.numberR))?this.numberR:''
            var numberP = (this.numberP !== '' && this.numberP !== null && !window.isNaN(this.numberP))?this.numberP:''


            console.log('this.numberBp1::',bloodPressure);
            
            var params = {
                signsId: this.signsId,
                medicalRecordId:this.medicalRecordId,
                address:this.sign,                                      //地点标志
                consciousness:this.mind,                                //意识
                temperature:numberT,                               //体温
                respiration:numberR,                               //呼吸
                bloodPressure:bloodPressure,                            //血压区间
                pulse:numberP,                                     //脉搏
            }

            // var necessarys = ['address','consciousness','temperature','respiration','bloodPressure','pulse']
            // var msg = {
            //     'address':[
            //         {
            //             reg:/./,
            //             msg:'请选择标志'
            //         }
            //     ],
            //     'consciousness':[
            //         {
            //             reg:/./,
            //             msg:'请选择意识判断'
            //         }
            //     ],
            //     'temperature':[
            //         {
            //             reg:/./,
            //             msg:'请填写体温'
            //         }
            //     ],
            //     'respiration':[
            //         {
            //             reg:/./,
            //             msg:'请填写呼吸'
            //         }
            //     ],
            //     'bloodPressure':[
            //          {
            //             reg:/./,
            //             msg:'请填写完整的血压区间'
            //         }
            //     ],
            //     'pulse':[
            //         {
            //             reg:/./,
            //             msg:'请填写脉搏'
            //         }
            //     ],

            // }
            // var status = paramsValid(params,necessarys,msg)
            // if(!status){
            //     return
            // }
            
            saveVitalSign(params).then((res)=>{
                console.log('保存体征监护返回结果：',res);
                if(res.data.code==200){
                    this.$message({
                        message:'保存成功',
                        type:'success'
                    })
                    this.getVitalSign()
                }
                else{
                    this.$message({
                        message:res.data.message,
                        type:'error'
                    })
                }
            })
        },
        getVitalSign(){

            /**
             * sign
             * mind
             * numberT
             * numberR
             * numberBp1,numberBp2
             * numberP
             */
            var params = {
                medicalRecordId:this.medicalRecordId
            }
            getVitalSign(params).then((res)=>{
                console.log('获取体征监护数据接口',res);
                if(res.data.code==200){
                    var result = res.data.data
                    if(result && result.length > 0){
                        // 获取第一个数据并且进行匹配 
                        this.dealData(result[0])
                    }
                    else{
                        this.dealData()
                    }
                    this.recordLists = result
                }
            }).finally(()=>{
                
            })
        },
        saveTutelage(){
            this.saveVitalSign();
        }
    },
    components: {
        inputnumber,
        cusslider
    },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/rem.scss';
.tutelage{
    color: #ffffff;
    font-size: rem(24);
    height:100%;
    width:100%;
    display:flex;
    .tutelage-left{
        width:72%;
        height:100%;
        margin-right:3%;
        background:linear-gradient(0deg,rgba(64,60,97,1),rgba(81,77,113,1));
        box-shadow:0px rem(10) rem(30) 0px rgba(16,15,24,0.2);
        border-radius:rem(20);
        overflow:auto;
        box-sizing:border-box;
        padding:rem(60) rem(80) rem(80) rem(80);
        .line{
            display:flex;
            margin-bottom:rem(60);
            justify-content:space-between;
            .item-flexend{
                align-items:flex-start !important;
            }
            .line-con{
                width:80%;
                display:flex;
            }
            .list-item-spec{
                display:flex;
                justify-content:flex-end;
            }
            .line-item{
                display:flex;
                align-items:center;            
                width:50%;
                .title{
                    margin-right:rem(19);
                    width:13%;
                    display:inline-block;
                    // height:40px;
                    // line-height:40px;
                    height: rem(60);
                    line-height: rem(30);
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                }
                .con{
                    display:flex;
                    width:100%;
                    flex-direction:column;
                    .value{
                        width:50%;
                        display:flex;
                        align-items:center;
                        margin-bottom:rem(24);
                        .unit{
                            margin-left:rem(15);
                        }
                    }
                    .value-slider{
                        width:50%;
                    }
                }
            }
        }
    }
    .tutelage-right{
        width:25%;
        height:100%;
        background:linear-gradient(0deg,rgba(64,60,97,1),rgba(81,77,113,1));
        box-shadow:0px rem(10) rem(30) 0px rgba(16,15,24,0.2);
        border-radius:rem(20);
        overflow:auto;
        .home-box{
            // margin-right: 2%;
            /*min-height: rem(194);*/
            background:linear-gradient(0deg,rgba(64,60,97,1),rgba(81,77,113,1));
            // box-shadow:0px 10px 30px 0px rgba(16,15,24,0.2);
            border-radius:8px;
            margin-bottom: rem(32);
            flex: 0 0 31.2%;
            box-sizing: border-box;
            .title-con{
                height: rem(78);
                display: flex;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                .title{
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                    align-items: flex-end;
                    padding-bottom: rem(10);
                    padding-left: rem(40);
                    padding-right: rem(40);
                    box-sizing: border-box;
                    font-size:rem(30);
                }
            }
            .underline{
                width: 100%;
                height: 2px;
                background:-webkit-linear-gradient(right, rgba(0,0,0,0.1) , rgba(255,255,255,0.6),rgba(0,0,0,0.1)); /* Safari 5.1 - 6.0 */
            }
            .content{
                padding-left: rem(40);
                padding-right: rem(40);
                // padding-bottom: rem(60);
                box-sizing: border-box;
                width: 100%;
                margin-top:rem(40);
                cursor: pointer;
                .con-item{
                    display:flex;
                    flex-direction:column;
                    align-items:flex-start;
                    .tit{
                        font-size:rem(24);
                         color:rgba(255,255,255,0.7);
                    }
                    .time{
                        margin-top:rem(20);
                        font-size:rem(18);
                        color:rgba(255,255,255,0.5);
                    }
                    .target{
                        margin-top:rem(20);
                        font-size:rem(18);
                        display: flex;
                        justify-content: space-between;
                        width: 100%;
                    }
                }
                .underline{
                    margin-top:rem(39);
                }
            }
        }

    }
    .marginSide{
        margin-left: rem(39) !important;
        margin-right: rem(39) !important;
    }

    // 按钮样式
    .checkbox-small{
        width:rem(128);
        line-height:rem(80);
        height:rem(80);
        // margin-right:rem(80);
        
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
