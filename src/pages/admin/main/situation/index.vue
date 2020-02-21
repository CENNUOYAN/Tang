<template>
    <div class="situation">
        <div class="target-table">
            <div class="table-header">
                <span class="header-item"
                    v-for="(item,index) in greenchannelLists"
                    @click="choose(item)"
                    :key="index"
                    >
                    <div class="inner-shadow"></div>
                    {{item.name}}
                </span>
            </div>
            <div class="table-center">
                <span class="title">推荐值</span>
                <span class="header-item"
                    v-for="(item,index) in recommendlLists"
                    @click="choose(item)"
                    :key="index"
                    >
                    <div class="inner-shadow"></div>
                    {{item.name}}
                </span>
            </div>
            <div class="table-center">
                <span class="title">目标值</span>
                <span class="header-item"
                    v-for="(item,index) in recommendlLists"
                    @click="choose(item)"
                    :key="index"
                    >
                    <div class="inner-shadow"></div>
                    {{item.name}}
                </span>
            </div>
        </div>
        <div class="tips">
            <div class="title">温馨提示</div>
            <div class="tip-text">
                1.推荐值是根据年龄，糖尿病类型、并发症等情况而智能分析出的最适合你的个性化控糖目标，你可完善个人资料，以获得准确的推荐值。
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import { saveVisitResults,getVisitResults } from '@/api/situation/situation'
import { paramsValid } from '@/utils/common'

export default {
    data() {
        return {
            greenchannelLists:[
                {
                    id:1,
                    name:'糖化'
                },
                {
                    id:2,
                    name:'空腹'
                },
                {
                    id:3,
                    name:'餐前'
                },
                {
                    id:4,
                    name:'餐后'
                },
                {
                    id:5,
                    name:'睡前'
                },
                {
                    id:6,
                    name:'凌晨'
                },
            ],
            recommendlLists:[
                {
                    id:1,
                    name:'<7.0%'
                },
                {
                    id:2,
                    name:'4.4-7.0'
                },
                {
                    id:3,
                    name:'4.4-7.0'
                },
                {
                    id:4,
                    name:'5.0-10.0'
                },
                {
                    id:5,
                    name:'5.0-10.0'
                },
                {
                    id:6,
                    name:'5.0-10.0'
                },
            ],
            currId:1,
            price:'',
            remark:'',
            patientId:'',
            medicalRecordId:'',
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
            this.getVisitResults()
        },
        choose(item){
            this.currId = item.id;
        },
        saveVisitResults(){
            var params = {
                medicalRecordId:this.medicalRecordId,
                visitResults:this.currId,
                remark:this.remark,
                visitFee:this.price
            }

             var necessarys = ['visitResults']
            var msg = {
                'visitResults':[
                    {
                        reg:/./,
                        msg:'请先选择出车结果'
                    }
                ]
            }


            var status = paramsValid(params,necessarys,msg)
            if(!status){
                return false;
            }

            saveVisitResults(params).then((res)=>{
                console.log('保存出车情况返回结果：',res);
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
        getVisitResults(){
            var params = {
                medicalRecordId:this.medicalRecordId,
            }
            getVisitResults(params).then((res)=>{
                console.log('保存出车情况返回结果：',res);
                if(res.data.code==200){
                    var result = res.data.data
                    this.price = result.visitFee
                    this.remark = result.remark
                    this.currId = result.visitResults
                }
            })

        },
        saving(){
            this.saveVisitResults();
        }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/rem.scss';
.situation{
    color: #ffffff;
    background:linear-gradient(0deg,rgba(64,60,97,1),rgba(81,77,113,1));
    box-shadow:0px rem(10) rem(30) 0px rgba(16,15,24,0.2);
    border-radius:rem(20);
    overflow:auto;
    box-sizing:border-box;
    padding:rem(39) rem(60) rem(39) rem(60);
    height:100%;
    width:100%;
    display:flex;
    flex-direction:column;
    .target-table{
        text-align: left;
        .table-header{
            padding-left: rem(108);
            margin-bottom: rem(20);
            display: flex;
            .header-item{
                /* margin-right: rem(108); */
                width: rem(120);
            }
        }
        .table-center{
            /* padding-left: rem(88); */
            margin-bottom: rem(20);
            display: flex;
            .title{
                margin-right: rem(20);
            }
            .header-item{
                /* margin-right: rem(80); */
                width: rem(120);
            }
        }
    }
    .tips{
        display: flex;
        flex-direction: column;
        .title{
            background-color: #da4f4f;
            border-radius: rem(20);
            width: rem(150);
            height: rem(30);
            line-height: rem(30);
            margin-bottom: rem(20);
        }
        .tip-text{
            text-align: left;
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

    .main-input{
        display:flex;
        margin-bottom:rem(30);
        width:auto !important;
    }
    .unit{
        height:rem(80);
        line-height:rem(80);
        display:inline-block;
        padding-left:rem(20);
    }

}
</style>
