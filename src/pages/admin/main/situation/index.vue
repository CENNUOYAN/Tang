<template>
    <div class="situation">
        <div class="green-item">
            <div class="title title-main">出车结果</div>
            <div class="content first-content">
                <span :class="'checkbox checkbox-small '+(currId==item.id?'active':'unactive')"
                    v-for="(item,index) in greenchannelLists"
                    @click="choose(item)"
                    :key="index"
                    >
                    <div class="inner-shadow"></div>
                    {{item.name}}
                </span>
            </div>

        </div>
        
        <div class="green-item">
            <div class="title title-main">收费金额</div>
            <div class="content first-content">
                <el-input type="number" class="main-input" v-model="price" placeholder="请输入收费金额"></el-input>
                <span class="unit">元</span>
            </div>

        </div>

        <div class="green-item">
            <div class="title title-main">备注</div>
            <div class="content second-content">
                <textarea v-model="remark" placeholder="请输入患者既往病史.."/>
            </div>
        </div>

        <div class="check-item">
            <el-button type="primary" class="main-btn" @click.native="saving">保存</el-button>
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
                    name:'回本院'
                },
                {
                    id:2,
                    name:'送往其他医院'
                },
                {
                    id:3,
                    name:'拒绝治疗'
                },
                {
                    id:4,
                    name:'现场治疗'
                },
                {
                    id:5,
                    name:'留原地'
                },
                {
                    id:6,
                    name:'警察处理'
                },
                {
                    id:7,
                    name:'取消出车'
                }
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
    padding:rem(39) rem(80) rem(39) rem(80);
    height:100%;
    width:100%;
    display:flex;
    flex-direction:column;
    .green-item{
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
            margin-bottom:rem(39);
            display: flex;
            flex-wrap:wrap;
            .checkbox {
                margin-bottom:rem(30);
            }
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
