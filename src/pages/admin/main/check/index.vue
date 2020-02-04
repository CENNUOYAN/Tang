<template>
    <div class="check">
        运动安排
    </div>
</template>

<script>
import inputnumber from '@/components/inputnumber/index';
import cusslider from '@/components/slider/index';
import {mapState} from 'vuex'
import {getPhysicalCheck,savePhysicalCheck} from '@/api/check/check'
import cusdialog from '@/components/dialog/index'
import dynamicform from '@/components/dynamicForm/index'

export default {
    data() {
        return {
            input:'',
            bloodValue:null,
            spoValue:null,
            heartValue:'',
            otherValue:'',
            picLists:[
                {
                    value:1,
                    label:'心电图1',
                },
                {
                    value:2,
                    label:'心电图2'
                }
            ],
            statement:[
                {
                    id:1,
                    name:'清醒'
                },{
                    id:2,
                    name:'昏迷'
                },
                {
                    id:3,
                    name:'死亡'
                },
                {
                    id:4,
                    name:'其他'
                }
            ],
            stateId:'',
            bodyLists:[
                [{
                    id:1,
                    name:'发育',
                    value:1,
                    data:[
                        {
                            id:1,
                            name:'良好'
                        },
                        {
                            id:2,
                            name:'不良'
                        }
                    ]
                }, {
                    id:5,
                    name:'头颅',
                    value:1,
                    data:[
                        {
                            id:1,
                            name:'变形'
                        },
                        {
                            id:2,
                            name:'血肿'
                        },
                        {
                            id:3,
                            name:'伤口'
                        }
                    ]
                }],[{
                    id:2,
                    name:'体位',
                    value:1,
                    data:[
                        {
                            id:1,
                            name:'自主体位'
                        },
                        {
                            id:2,
                            name:'被动体位'
                        },
                        {
                            id:3,
                            name:'强迫体位'
                        }
                    ]
                },{
                    id:6,
                    name:'眼',
                    value:1,
                    data:[
                        {
                            id:1,
                            name:'结膜'
                        },
                        {
                            id:2,
                            name:'充血'
                        },
                        {
                            id:3,
                            name:'出血'
                        }
                    ]
                }],[{
                    id:3,
                    name:'皮肤',
                    value:1,
                    data:[
                        {
                            id:1,
                            name:'苍白'
                        },
                        {
                            id:2,
                            name:'发红'
                        },
                        {
                            id:3,
                            name:'黄染'
                        },
                        {
                            id:4,
                            name:'出血点'
                        },
                        {
                            id:5,
                            name:'湿冷'
                        },
                        {
                            id:6,
                            name:'水肿'
                        }
                    ]
                },],[
                {
                    id:4,
                    name:'淋巴结',
                    value:1,
                    data:[
                        {
                            id:1,
                            name:'正常'
                        },
                        {
                            id:2,
                            name:'部分肿大'
                        },
                        {
                            id:3,
                            name:'全身肿大'
                        }
                    ]
                },]
            ],
            // growId:1,
            // poseId:1,
            // skinId:1,
            // lymphId:1
            patientId:'',
            medicalRecordId:'',

            title:'标题',
            isDialog:false,

            formLists:
            [
                {
                    id:1,
                    value:null,
                    unit:'J',
                    type:3,
                    name:'指标1'
                },
                {
                    id:2,
                    value:null,
                    unit:'mg',
                    type:3,
                    name:'指标2'
                },
                {
                    id:10,
                    value:null,
                    unit:'V',
                    type:5,
                    name:'指标1'
                },
                {
                    id:10,
                    value:null,
                    unit:'V',
                    type:5,
                    name:'指标1'
                },
                {
                    id:3,
                    value:null,
                    unit:'',
                    type:6,
                    name:'复苏开始时间'
                },
                {
                    id:4,
                    value:null,
                    unit:'',
                    type:6,
                    name:'复苏结束时间'
                },
                {
                    id:5,
                    value:[100,200],
                    unit:'',
                    type:2,
                    name:'多选',
                    data:[
                        {
                            id:100,
                            name:'多选1'
                        },
                        {
                            id:200,
                            name:'多选2'
                        },
                        {
                            id:600,
                            name:'多选3'
                        }
                    ]

                },
                {
                    id:7,
                    value:null,
                    unit:'',
                    type:1,
                    name:'单选',
                    data:[
                        {
                            id:300,
                            name:'单选1'
                        },
                        {
                            id:400,
                            name:'单选2'
                        }
                    ]
                }
            ]

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
            this.dealQuery()
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
            this.getPhysicalCheck();
        },
        chooseState(item){
            this.stateId = item.id
        },
        choose(inds,index,item){
            this.bodyLists[inds][index].value = item.id;
            this.openDialog();
            console.log('choose---->');
            
        },
        goCollect(){
            console.log('去采集');
            
        },
        getBlood(value){
            this.bloodValue = value
        },
        updateBlood(value){
            this.bloodValue = value
        },
        getSpo(value){
            this.spoValue = value;
        },
        updateSpo(value){
            this.spoValue = value;
        },
        getPhysicalCheck(){
            var params = {
                medicalRecordId:this.medicalRecordId
            }
            getPhysicalCheck(params).then((res)=>{
                console.log('获取检查数据返回结果：',res);
                if(res.data.code==200){
                    this.bloodValue = parseFloat(res.data.data.boodSugar)
                    this.heartValue = res.data.data.electrocardiogram
                    this.spoValue = parseFloat(res.data.data.oxygenSaturation)
                    this.otherValue = res.data.data.other
                    this.stateId = res.data.data.patientSituation
                }
            })
        },
        savePhysicalCheck(){
            var params = {
                boodSugar: this.bloodValue,
                electrocardiogram:this.heartValue,
                oxygenSaturation:this.spoValue,
                other:this.otherValue,
                patientSituation:this.stateId,
                physicalCheckInfo:[],
                medicalRecordId:this.medicalRecordId
            }
            savePhysicalCheck(params).then((res)=>{
                if(res.data.code==200){
                    this.$message({
                        message:'保存成功',
                        type:'success'
                    })
                }
                else{
                    this.$message({
                        message:res.data.message,
                        type:'error'
                    })
                }
            })
        },
        saving(){
            this.savePhysicalCheck();
        },
        openDialog(){
            this.isDialog = true;
            this.title = '请选择'
        },
        closeDialog(value){
            this.isDialog = value;
        },
        dialogSave(){
            console.log('dialog保存',this.formLists);
            this.isDialog = false;
        },
        updateFormLists(lists){
            this.formLists = lists;
        },
    },
    components: {
        inputnumber,
        cusslider,
        cusdialog,
        dynamicform        
    },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/rem.scss';
.check{
    background:linear-gradient(0deg,rgba(64,60,97,1),rgba(81,77,113,1));
    box-shadow:0px rem(10) rem(30) 0px rgba(16,15,24,0.2);
    border-radius:rem(20);
    overflow:auto;
    box-sizing:border-box;
    padding:rem(60) rem(80) rem(80) rem(80);
    height:100%;
    width:100%;
    display:flex;
    flex-direction:column;
    .check-item{
        margin-bottom:rem(59);
        .title{
            // background:red;
            text-align:left;
            font-size:rem(30);

        }  
        .values-spec{
            flex-wrap:wrap;
        } 
        .values{
            // display:-webkit-box;
            display:flex;
            // flex-direction:row;
            margin-top:rem(30);
            width:100%;
            .value-item{
                display:flex;
                flex-direction:row;
                // margin-right:rem(60);
                margin-bottom:rem(40);
                margin-right:3%;
                .item-title{
                    display:inline-block;
                    // display:flex;
                    width: 33%;
                    height: rem(80);
                    line-height: rem(80);
                    margin-right: rem(22);
                }   
                .main-input{
                    
                }
                .cusselect{
                    margin-right:3%;
                }             
            }

        }   
        .check-values{
            display:flex;
            justify-content:space-between;
            .check-con{
                width:20%;
                // float:left;
            }
            .value-check-item{
                width:100%;
                // margin-right:5%;
                background:linear-gradient(0deg,rgba(64,60,97,1),rgba(81,77,113,1));
                box-shadow:0px rem(10) rem(30) 0px rgba(16,15,24,0.2), 0px 0px 2px 0px rgba(230,227,255,1);
                border-radius:rem(10);
                display:flex;
                flex-direction:column;
                align-items: center;
                padding-top:rem(39);
                padding-bottom:rem(39);
                position: relative;
                // float:left;
                margin-top:rem(40);
                .vc-title{
                    margin-bottom:rem(20);
                }
            }
            .value-check-item:last-nth-child(1){
                margin-right:0;
            }
        }          
    }

    .checkbox-spec{
        width:rem(168);
        line-height:rem(80);
        height:rem(80);
        margin-bottom:rem(30);
    }

    .checkbox-middle{
        width:rem(176);
        line-height:rem(80);
        height:rem(80);
        margin-bottom:rem(30);
    }
    .checkbox-small{
        width:rem(128) !important;
        line-height:rem(80);
        height:rem(80);
        margin-right:rem(80);
        
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

    .con{
        display:flex;
        // width:100%;
        flex-direction:column;
        .value{
            width:100%;
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

    .saving-con{
        margin-bottom: rem(60);
    }
}
</style>
