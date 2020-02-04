<template>
    <div class="care">
        <div class="green-item">
            <div class="title title-main">自救措施</div>
            <div class="content first-content">
                <span :class="'checkbox checkbox-small '+(currId==item.id?'active':'unactive')"
                    v-for="(item,index) in saveSelfLists"
                    @click="choose(item)"
                    :key="index"
                    >
                    <div class="inner-shadow"></div>
                    {{item.name}}
                </span>
            </div>

            <div class="panel" v-if="currId==2">
                <div class="trans"></div>
                <span :class="'marginBottom checkbox checkbox-small '+(selfSaveId==item.id?'active':'unactive')"
                    v-for="(item,index) in selfSaveLists"
                    @click="chooseSelfSave(item)"
                    :key="index"
                    >
                    <div class="inner-shadow"></div>
                    {{item.name}}
                </span>
            </div>
        </div>


        <div class="green-item">
            <div class="title title-main">病情转归</div>
            <div class="content first-content">
                <span :class="'checkbox checkbox-small '+(painId==item.id?'active':'unactive')"
                    v-for="(item,index) in painLists"
                    @click="choosePain(item)"
                    :key="index"
                    >
                    <div class="inner-shadow"></div>
                    {{item.name}}
                </span>
            </div>
        </div>

        <div class="green-item">
            <div class="title title-main">急救措施</div>
            <div class="content first-content">
                <!-- <span :class="'marginBottom checkbox checkbox-small '+(methodId==item.id?'active':'unactive')"
                    v-for="(item,index) in methodLists"
                    @click="chooseMethod(item)"
                    :key="index"
                    >
                    <div class="inner-shadow"></div>
                    {{item.name}}
                </span> -->

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

            <div class="panel" v-if="true">
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
                <div class="panel-content marginTop">
                    <div class="con-1">
                        <span :class="'checkbox checkbox-small '+(id==item.id?'active':'unactive')"
                            v-for="(item,index) in lists"
                            @click="chooseId(item)"
                            :key="index"
                            >
                            <div class="inner-shadow"></div>
                            {{item.name}}
                        </span>
                    </div>
                    <div class="con">
                        <span class="value">
                            <inputnumber @getNumber="getNumber" :value="number" unit="J"></inputnumber>
                        </span>
                        <span class="value-slider">
                            <cusslider :num="number" @updateVal="updateVal"></cusslider>
                        </span>
                    </div>

                    <div class="con">
                        <span class="value">
                            <inputnumber @getNumber="getNumber2" :value="number2" unit="次"></inputnumber>
                        </span>
                        <span class="value-slider">
                            <cusslider :num="number2" @updateVal="updateVal2"></cusslider>
                        </span>
                    </div>

                </div>
            </div>

        </div>

        <div class="green-item">
            <div class="title title-main">药物治疗</div>
            <div class="content first-content">

                <div :class="'marginBottom securebtns ' + (medicalId.includes(item.id)==true?'btn-act':'btn-unact')" v-for="(item,index) in medicalLists"
                    :key="index">
                    <span :class="' checkbox checkbox-small '+(medicalId.includes(item.id)==true?'active':'unactive')"
                        @click="chooseMedical(item)"
                        >
                        <div class="inner-shadow"></div>
                        {{item.name}}
                    </span>
                    <span class="iconing">
                        <img class="icon" src="./images/less.png" @click="removeItem(item)"/>
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
/**
 * 准备一个对象，注入到弹窗里
 * 对象基本结构（数组对象）
 *     {
 *          id:string
 *          name:string
 *          type:number
 *          data:array
 *              [
 *                  {
 *                      id:string,
 *                      name:string,
 *                      type:number,
 *                      
 *                  }
 *              ]
 *     }
 */
import inputnumber from '@/components/inputnumber/index';
import cusslider from '@/components/slider/index';
import cusdialog from '@/components/dialog/index'
import dynamicform from '@/components/dynamicForm/index'
import { saveTreatmentAndCare,
        getFirstAidMeasuresItems,
        getDrugTreatmentItems,
        getTreatmentAndCare,
        getTreatmentAndCareItems,
        getChildItems,
        saveChildItems 
    } from '@/api/care/care'
import { mapState } from 'vuex'

export default {
    data() {
        return {
            saveSelfLists:[
                {
                    id:1,
                    name:'无',
                    data:[
                        {
                            id:1,
                            name:'心脏按压'
                        },
                        {
                            id:2,
                            name:'人工呼吸'
                        }
                    ]
                }, {
                    id:2,
                    name:'有',
                    data:[
                        {
                            id:1,
                            name:'心脏按压'
                        },
                        {
                            id:2,
                            name:'人工呼吸'
                        }
                    ]
                },
            ],
            currId:'',
            painLists:[
                {
                    id:1,
                    name:'好转'
                },
                {
                    id:2,
                    name:'无变化'
                },
                {
                    id:3,
                    name:'病情恶化'
                },
                {
                    id:4,
                    name:'已死亡'
                }
            ],
            painId:'',
            methodLists:[
                {
                    id:1,
                    name:'开放气道',
                    data:[

                    ]
                },
                {
                    id:2,
                    name:'吸痰',
                    data:[
                        
                    ]
                },
                {
                    id:3,
                    name:'辅助呼吸',
                    data:[]
                }
            ],
            methodId:[],
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
            selfSaveLists:[
                {
                    id:1,
                    name:'心脏按压'
                },
                {
                    id:2,
                    name:'人工呼吸'
                },
                {
                    id:3,
                    name:'止血'
                },
                {
                    id:4,
                    name:'固定'
                },
                {
                    id:5,
                    name:'解毒'
                },
                {
                    id:6,
                    name:'其他'
                }
            ],
            selfSaveId:'',
            rescurelists:[
                {
                    id:1,
                    name:'AED'
                },
                {
                    id:2,
                    name:'手动'
                }
            ],
            rescureId:1,
            lists:[
                {
                    id:1,
                    name:'能量'
                }
            ],
            id:1,
            number:20,
            number2:20,
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
            ],
            firstAidMeasuresInfo:[],
            drugTreatmentInfo:[],
            fatherId:'',

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
            this.getTreatmentAndCareItems();
            this.getTreatmentAndCare();
            // this.getFirstAidMeasuresItems();
        },
        choose(item){
            if(this.currId == item.id){
                this.currId = ''
            }
            else{
                this.currId = item.id;
            }
            // this.openDialog();
        },
        choosePain(item){
            if(this.painId == item.id){
                this.painId = ''
            }
            else{
                this.painId = item.id;
            }
        },
        chooseMethod(item){
            var value = this.methodId
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

            let firstAidMeasuresInfo = []
            this.methodId.forEach((itt,ind)=>{
                firstAidMeasuresInfo.push({
                    itemId:itt
                })
            })
            let drugTreatmentInfo = []
            this.medicalId.forEach((itt,ind)=>{
                drugTreatmentInfo.push({
                    itemId:itt
                })
            })
            
            let result = this.saveTreatmentAndCare(firstAidMeasuresInfo,drugTreatmentInfo).then((res)=>{
                console.log('请求结果：',res);
                if(res.data.code==200){
                    this.$message({
                        message:'保存成功',
                        type:'success'
                    })
                    this.getTreatmentAndCare()
                }
                else{
                    this.$message({
                        message:res.data.message,
                        type:'error'
                    })
                }
            })


            // if(this.methodId == item.id){
            //     this.methodId = ''
            // }
            // else{
            //     this.methodId = item.id
            // }
        },
        removeMethodItem(item){
            // this.methodId = ''
            var value = this.methodId
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


            let firstAidMeasuresInfo = []
            this.methodId.forEach((itt,ind)=>{
                firstAidMeasuresInfo.push({
                    itemId:itt
                })
            })
            let drugTreatmentInfo = []
            this.medicalId.forEach((itt,ind)=>{
                drugTreatmentInfo.push({
                    itemId:itt
                })
            })
            
            let result = this.saveTreatmentAndCare(firstAidMeasuresInfo,drugTreatmentInfo).then((res)=>{
                console.log('请求结果：',res);
                if(res.data.code==200){
                    this.$message({
                        message:'保存成功',
                        type:'success'
                    })
                    this.getTreatmentAndCare()
                }
                else{
                    this.$message({
                        message:res.data.message,
                        type:'error'
                    })
                }
            })
            
        },
        chooseMedical(item){
            
            var isRequest = true
            var value = this.medicalId
            if(value && value.length==0){
                this.medicalId.push(item.id)
            }
            else{
                var isHash = value.filter(items=>items==item.id)
                if(isHash && isHash.length>0){
                    // var currIndex = value.indexOf(isHash[0])
                    // value.splice(currIndex,1)
                    // this.medicalId = value
                    isRequest = false
                }
                else{
                    this.medicalId.push(item.id)
                }
            }


            let firstAidMeasuresInfo = []
            this.methodId.forEach((itt,ind)=>{
                firstAidMeasuresInfo.push({
                    itemId:itt
                })
            })
            let drugTreatmentInfo = []
            this.medicalId.forEach((itt,ind)=>{
                drugTreatmentInfo.push({
                    itemId:itt
                })
            })

            this.fatherId = item.id
            this.getChildItems(item.id)
            if(!isRequest){
                return false;
            }
            let result = this.saveTreatmentAndCare(firstAidMeasuresInfo,drugTreatmentInfo).then((res)=>{
                console.log('请求结果：',res);
                if(res.data.code==200){
                    this.$message({
                        message:'保存成功',
                        type:'success'
                    })
                    this.getTreatmentAndCare()
                }
                else{
                    this.$message({
                        message:res.data.message,
                        type:'error'
                    })
                }
            })
            
            
            // if(this.medicalId == item.id){
            //     this.medicalId = ''
            // }
            // else{
            //     this.medicalId = item.id
            // }
        },
        removeItem(item){
            console.log('移除当前项',item);
            var value = this.medicalId
            if(value && value.length==0){
                this.medicalId.push(item.id)
            }
            else{
                var isHash = value.filter(items=>items==item.id)
                if(isHash && isHash.length>0){
                    var currIndex = value.indexOf(isHash[0])
                    value.splice(currIndex,1)
                    this.medicalId = value
                }
                else{
                    this.medicalId.push(item.id)
                }
            }

            let firstAidMeasuresInfo = []
            this.methodId.forEach((itt,ind)=>{
                firstAidMeasuresInfo.push({
                    itemId:itt
                })
            })

            let drugTreatmentInfo = []
            this.medicalId.forEach((itt,ind)=>{
                drugTreatmentInfo.push({
                    itemId:itt
                })
            })
            
            console.log('参数：：',drugTreatmentInfo);
            
            let result = this.saveTreatmentAndCare(firstAidMeasuresInfo,drugTreatmentInfo).then((res)=>{
                console.log('请求结果：',res);
                if(res.data.code==200){
                    this.$message({
                        message:'保存成功',
                        type:'success'
                    })
                    this.getTreatmentAndCare()
                }
                else{
                    this.$message({
                        message:res.data.message,
                        type:'error'
                    })
                }
            })


        },
        chooseSelfSave(item){
            if(this.selfSaveId == item.id){
                this.selfSaveId = ''
            }
            else{
                this.selfSaveId = item.id
            }
        },
        chooseRescure(item){
            this.rescureId = item.id
        },
        chooseId(item){
            this.id = item.id;
        },
        getNumber(value){
            this.number = value;
        },
        getNumber2(value){
            this.number2 = value;
        },
        updateVal(value){
            this.number = value;
        },
        updateVal2(value){
            this.number2 = value;
        },
        async saveTreatmentAndCare(firstAidMeasuresInfo,drugTreatmentInfo){
            // 保存一级数据接口
            var params = {
                medicalRecordId:this.medicalRecordId,
                saveOneselfType:this.selfSaveId,
                illnessTransfer:this.painId,
                firstAidMeasuresInfo:firstAidMeasuresInfo && firstAidMeasuresInfo.length >0 ? JSON.stringify(firstAidMeasuresInfo):'',
                drugTreatmentInfo:drugTreatmentInfo && drugTreatmentInfo.length > 0 ? JSON.stringify(drugTreatmentInfo):''
            }
            console.log('请求参数：：：',params);
            
            let result = await saveTreatmentAndCare(params)
            return result;
        },
        openDialog(){
            this.isDialog = true;
        },
        closeDialog(value){
            this.isDialog = value;
        },
        saving(){
            // 保存操作
            this.isDialog = false
            console.log(this.formLists);

            let firstAidMeasuresInfo = []
            this.methodId.forEach((itt,ind)=>{
                firstAidMeasuresInfo.push({
                    itemId:itt
                })
            })

            let drugTreatmentInfo = []
            this.medicalId.forEach((itt,ind)=>{
                drugTreatmentInfo.push({
                    itemId:itt
                })
            })


            var children = []
            this.formLists.forEach((item,index)=>{
                if(item.type==2){
                    var value = item.value
                    value.forEach((itt,ind)=>{
                        children.push({
                            itemId:itt,
                        })
                    })
                    
                }
                else if(item.type==3){
                    children.push({
                        itemId:item.id,
                        value:item.value

                    })
                }
            })

            // drugTreatmentInfo.forEach((itt,ind)=>{
            //     if(itt.itemId==this.fatherId){
            //         drugTreatmentInfo[ind] = {
            //             itemId:this.fatherId,
            //             children:children
            //         }
            //     }
            // })

            drugTreatmentInfo = []
            drugTreatmentInfo.push({
                itemId:this.fatherId,
                children:children
            })

            console.log('params:',firstAidMeasuresInfo,drugTreatmentInfo);
            
            let result = this.saveChildItems(drugTreatmentInfo).then((res)=>{
                console.log('请求结果：',res);
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
        getTreatmentAndCare(){
            var params = {
                medicalRecordId:this.medicalRecordId
            }

            this.medicalId = []
            this.methodId = []
            getTreatmentAndCare(params).then((res)=>{
                console.log('获取治疗信息接口返回结果：',res);
                if(res.data.code==200){
                    var drugTreatmentInfo = res.data.data.drugTreatmentInfo
                    drugTreatmentInfo.forEach((item,index)=>{
                        this.medicalId.push(parseFloat(item.itemId))
                    })

                    var firstAidMeasuresInfo = res.data.data.firstAidMeasuresInfo
                    firstAidMeasuresInfo.forEach((item,index)=>{
                        this.methodId.push(parseFloat(item.itemId))
                    })
                    console.log('返回的medicalId',this.medicalId);
                    
                }
            })
        },
        getFirstAidMeasuresItems(){
            // #todo 获取急救措施接口
            getFirstAidMeasuresItems().then((res)=>{
                console.log('获取治疗措施项目接口：',res);
                if(res.data.code==200){
                    
                }
            })
        },
        getTreatmentAndCareItems(){
            this.medicalLists = []
            this.methodLists = []
            getTreatmentAndCareItems().then((res)=>{
                if(res.data.code==200){
                    console.log('返回结果：',res.data.data);
                    var drugTreatmentInfo = res.data.data.drugTreatmentInfo;
                    var firstAidMeasuresInfo = res.data.data.firstAidMeasuresInfo;
                    drugTreatmentInfo.forEach((item,index)=>{
                        this.medicalLists.push({
                            id:item.itemId,
                            ...item
                        })
                    })

                    firstAidMeasuresInfo.forEach((item,index)=>{
                        this.methodLists.push({
                            id:item.itemId,
                            ...item
                        })
                    })
                }
            })
        },
        updateFormLists(lists){
            this.formLists = lists;
        },
        getChildItems(id){
            var params = {
                itemId:id
            }
            getChildItems(params).then((res)=>{
                if(res.data.code==200){
                    this.formLists = []
                    var lists = res.data.data.items
                    var data = []
                    var obj = {}
                    lists.forEach((item,index)=>{
                        if(item.itemType==2){
                            data.push({
                                id:item.itemId,
                                name:item.name,
                            })
                            obj = {
                                id:item.itemId,
                                value:[],
                                unit:'',
                                type:2,
                                name:'',
                            }
                        }
                        else{
                            this.formLists.push({
                                id:item.itemId,
                                value:null,
                                unit:item.unit,
                                type:item.itemType,
                                name:item.name,
                            })
                        }
                    })

                    if(data && data.length>0){
                        this.formLists.push({
                            ...obj,
                            ...(data&&data.length>0?{data:data}:{})
                        })
                    }
                    console.log('返回子级数据：：',res.data.data,this.formLists);
                    this.openDialog();
                }
                else{
                    this.$message({
                        message:res.data.message,
                        type:'error'
                    })
                }
            })
        },
        saveChildItems(drugTreatmentInfo){
            var params = {
                medicalRecordId:this.medicalRecordId,
                drugTreatmentInfo:drugTreatmentInfo && drugTreatmentInfo.length > 0?JSON.stringify(drugTreatmentInfo):''
            }
            return saveChildItems(params);
        }
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
.care{
    color: #ffffff;
    background:linear-gradient(0deg,rgba(64,60,97,1),rgba(81,77,113,1));
    box-shadow:0px rem(10) rem(30) 0px rgba(16,15,24,0.2);
    border-radius:rem(20);
    overflow:auto;
    box-sizing:border-box;
    padding:rem(39) rem(80) rem(39) rem(80);
    height:100%;
    width:100%;
    display:flex;
    flex-direction:column;
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
