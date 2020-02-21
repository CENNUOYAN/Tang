<template>
    <div class="diagnosis">
        <div class="personal-item">
            <div class="item-title">
                是否是患者
            </div>
            <el-select v-model="value" placeholder="请选择">
            <el-option
                v-for="item in patientLists"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="personal-item">
            <div class="item-title">
                姓名
            </div>
            <el-input v-model="input" placeholder="未填写" class="username-input"></el-input>
        </div>
        <div class="personal-item">
            <div class="item-title">
                性别
            </div>
            <el-select v-model="sex" placeholder="请选择">
            <el-option
                v-for="item in sexlists"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="personal-item">
            <div class="item-title">
                身高
            </div>
            <el-select v-model="height" placeholder="请选择">
            <el-option
                v-for="item in heightlists"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="personal-item">
            <div class="item-title">
                体重
            </div>
            <el-select v-model="weight" placeholder="请选择">
            <el-option
                v-for="item in weightlists"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="personal-item">
            <div class="item-title">
                年龄
            </div>
            <el-date-picker
            v-model="age"
            type="date"
            placeholder="选择日期">
            </el-date-picker>
        </div>
        <div class="personal-item">
            <div class="item-title">
                糖尿病类型
            </div>
            <el-select v-model="type" placeholder="请选择">
            <el-option
                v-for="item in typelists"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="personal-item">
            <div class="item-title">
                确诊年份
            </div>
            <el-date-picker
            v-model="year"
            type="year"
            placeholder="选择年">
            </el-date-picker>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {diagnosisInsert,getAllClassify,getDiagnosisInfo} from '@/api/diagnosis/diagnosis'
import { paramsValid } from '@/utils/common'

export default {
    data() {
        return {
            age: '',
            year: '',
            height: '',
            weight: '',
            sex: '',
            type: '',
            patientLists: [
                {
                    value: '选项1',
                    label: '我是家属'
                }, 
                {
                    value: '选项2',
                    label: '我是患者'
                }
            ],
            sexlists: [
                {
                    value: 1,
                    label: '男'
                },
                {
                    value: 2,
                    label: '女'
                    
                }
            ],
            heightlists: [
                {
                    value: 1,
                    label: '50cm'
                },
                {
                    value: 2,
                    label: '51cm'
                    
                },
                {
                    value: 3,
                    label: '52cm'
                },
                {
                    value: 4,
                    label: '53cm'
                    
                },
                {
                    value: 5,
                    label: '54cm'
                },
                {
                    value: 6,
                    label: '55cm'
                    
                },
                {
                    value: 7,
                    label: '56cm'
                },
                {
                    value: 8,
                    label: '57cm'
                    
                },
                {
                    value: 9,
                    label: '58cm'
                },
                {
                    value: 10,
                    label: '59cm'
                    
                },
                {
                    value: 11,
                    label: '60cm'
                },
                {
                    value: 12,
                    label: '61cm'
                    
                },
                {
                    value: 13,
                    label: '62cm'
                },
                {
                    value: 14,
                    label: '63cm'
                    
                },
                {
                    value: 15,
                    label: '64cm'
                },
                {
                    value: 6,
                    label: '65cm'
                    
                },
                {
                    value: 17,
                    label: '66cm'
                },
                {
                    value: 18,
                    label: '67cm'
                    
                },
                {
                    value: 19,
                    label: '68cm'
                },
                {
                    value: 20,
                    label: '69cm'
                    
                },
            ],
            weightlists: [
                {
                    value: 1,
                    label: '50kg'
                },
                {
                    value: 2,
                    label: '51kg'
                    
                },
                {
                    value: 3,
                    label: '52kg'
                },
                {
                    value: 4,
                    label: '53kg'
                    
                },
                {
                    value: 5,
                    label: '54kg'
                },
                {
                    value: 6,
                    label: '55kg'
                    
                },
                {
                    value: 7,
                    label: '56kg'
                },
                {
                    value: 8,
                    label: '57kg'
                    
                },
                {
                    value: 9,
                    label: '58kg'
                },
                {
                    value: 10,
                    label: '59kg'
                    
                },
                {
                    value: 11,
                    label: '60kg'
                },
                {
                    value: 12,
                    label: '61kg'
                    
                },
                {
                    value: 13,
                    label: '62kg'
                },
                {
                    value: 14,
                    label: '63kg'
                    
                },
                {
                    value: 15,
                    label: '64kg'
                },
                {
                    value: 6,
                    label: '65kg'
                    
                },
                {
                    value: 17,
                    label: '66kg'
                },
                {
                    value: 18,
                    label: '67kg'
                    
                },
                {
                    value: 19,
                    label: '68kg'
                },
                {
                    value: 20,
                    label: '69kg'
                    
                },
            ],
            typelists: [
                {
                    value: 1,
                    label: '1型糖尿病'
                },
                {
                    value: 2,
                    label: '2型糖尿病'
                },
                {
                    value: 3,
                    label: '妊娠糖尿病'
                },
                {
                    value: 4,
                    label: '特殊糖尿病'
                },
                {
                    value: 5,
                    label: '糖尿病前期'
                }
            ],
            value: ''
        };
    },
    computed: {
        ...mapState({
            patientLists:state=>state.patientLists
        }),
        contents(){
            var contents = this.contentLists.filter(item=>item.id==this.currCheck)
            return contents[0] && contents[0].data
        }
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
            this.currCheck = 1;
            this.getAllClassify();
            this.getDiagnosisInfo();
        },
        choose(item){
            this.currCheck = item.id;
            this.currContent = 1;
        },
        goSelect(item){
            // classifyIdLists
            console.log('item->',item.id);
            var value = this.classifyIdLists

            if(value && value.length==0){
                this.classifyIdLists.push(item.id)
            }
            else{
                var isHash = value.filter(items=>items==item.id)
                if(isHash && isHash.length>0){
                    var currIndex = value.indexOf(isHash[0])
                    value.splice(currIndex,1)
                    this.classifyIdLists = value
                }
                else{
                    this.classifyIdLists.push(item.id)
                }
            }
            console.log('item',value);
            this.diagnosisInsert({
                id:this.currId
            })

        },
        selectGrade(item){
            // this.currId = item.id
            this.diagnosisInsert(item)
        },
        diagnosisInsert(item){
            var params = {
                medicalRecordId:this.medicalRecordId,
                level:item.id,
                classifyIdList:this.classifyIdLists?this.classifyIdLists.join(','):''
            }

            var necessarys = ['level']
            var msg = {
                'level':[
                    {
                        reg:/./,
                        msg:'请先选择分诊级别'
                    }
                ]
            }

            var status = paramsValid(params,necessarys,msg)
            if(!status){
                return;
            }
            diagnosisInsert(params).then((res)=>{
                if(res.data.code==200){
                    this.$message({
                        message:'保存成功',
                        type:'success'
                    })
                    this.currId = item.id
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
        },
        getAllClassify(){
            // console.log('getAllClassify:');
            this.resultLists = []
            this.contentLists = []
            getAllClassify().then((res=>{
                if(res.data.code==200){
                    // console.log('getAllClassify：',res.data.data);
                    var lists = res.data.data
                    lists.forEach((item,index)=>{
                        this.resultLists.push({
                            id:item.parentNode.classifyId,
                            name:item.parentNode.classifyName,
                            ...item.parentNode
                        })
                        var children = []
                        item.childNode.forEach((itt,ind)=>{
                            children.push({
                                id:itt.parentNode.classifyId,
                                name:itt.parentNode.classifyName,
                                ...itt,
                            })
                        })
                        this.contentLists.push({
                            id:item.parentNode.classifyId,
                            data:children
                        })
                    })
                }
            }))
        },
        getDiagnosisInfo(){
            var params = {
                medicalRecordId:this.medicalRecordId
            }
            getDiagnosisInfo(params).then((res)=>{
                if(res.data.code==200){
                    this.currId = res.data.data.level
                    this.classifyIdLists = res.data.data.classifyIds?res.data.data.classifyIds:[]
                }
            })
        }
    },
    components: {

    },
};
</script>

<style lang="scss">
@import '@/assets/scss/rem.scss';
.diagnosis{
    background:linear-gradient(0deg,rgba(64,60,97,1),rgba(81,77,113,1));
    box-shadow:0px rem(10) rem(30) 0px rgba(16,15,24,0.2);
    border-radius:rem(20);
    /* overflow:auto; */
    box-sizing:border-box;
    padding:rem(60) rem(80) rem(80) rem(80);
    height:100%;
    width:100%;
    display:flex;
    flex-direction:column;
    .personal-item{
        margin-bottom:rem(30);
        display: flex;
        align-items: center;
        .item-title{
            // background:red;
            text-align:left;
            font-size:rem(20);
            width: rem(140);
        }   
        .el-select{
            width: rem(600);
            height: rem(50);
            display: flex;
            .el-input{
                width: rem(600);
                height: rem(50);
            }
            .el-input__inner{
                width: rem(600);
                height: rem(50);
                box-sizing: border-box;
                /* border: none;
                border: 1px solid rgba(242,242,242,1); */
            }
            .el-input__suffix{
                display: none;
            }
            }
        .el-date-editor{
            width: rem(600);
        } 
        .username-input{
            width: rem(600);
            height: rem(50);
            box-sizing:border-box;
            border-radius: rem(10);
            border: none;
            .el-input__inner{
                width: rem(600);
                height: rem(50);
            }
        }     
    }




}
</style>
