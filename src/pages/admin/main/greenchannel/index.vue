<template>
    <div class="greenchannel">
        <div class="green-item">
            <div class="title title-main">绿色通道</div>
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
            <div class="underline"></div>
            <div class="makesure">
                <el-button type="primary" class="main-btn" @click.native="makesure">确定</el-button>
            </div>

        </div>
        <div class="green-item" v-if="isApplySuccess">
            <div class="title title-time">发起时间：{{createTime}}</div>
            <div class="content">
                <div class="response-list">
                    <div :class="'response-item ' + (colorType[item.id])"
                        v-for="(item,index) in responseLists"
                        :key="index"
                        >
                        <span class="title-type">
                            {{item.name}}{{item.moreinfo.timeConsuming?'（'+item.moreinfo.timeConsuming+'s）':''}}
                        </span>
                        <img class="img" src="" alt="">
                        <span class="sub">{{item.moreinfo.branchName}}</span>
                    </div>

                    <!-- <div class="response-item red">
                        <span class="title-type">
                            未响应（10s）
                        </span>
                        <img class="img" src="" alt="">
                        <span class="sub">急诊医学科</span>
                    </div>

                    <div class="response-item yellow">
                        <span class="title-type">
                            等待响应（10s）
                        </span>
                        <img class="img" src="" alt="">
                        <span class="sub">急诊医学科</span>
                    </div>

                    <div class="response-item green">
                        <span class="title-type">
                            已响应（10s）
                        </span>
                        <img class="img" src="" alt="">
                        <span class="sub">急诊医学科</span>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getGreenChannelTypes,getGreenChannelResponseBranchList,greenChannelApply } from '@/api/greenchannel/greenchannel'
import { paramsValid,dealDatetime } from '@/utils/common'
import {mapState} from 'vuex'

export default {
    data() {
        return {
            greenchannelLists:[
                // {
                //     id:1,
                //     name:'急诊通道'
                // },
                // {
                //     id:2,
                //     name:'卒中通道'
                // },
                // {
                //     id:3,
                //     name:'胸痛通道'
                // },
                // {
                //     id:4,
                //     name:'创伤通道'
                // },
                // {
                //     id:5,
                //     name:'孕产妇通道'
                // },
                // {
                //     id:6,
                //     name:'危重婴儿通道'
                // }
            ],
            currId:'',
            patientId:'',
            medicalRecordId:'',
            createTime:'',
            isApplySuccess:false,
            responseLists:[
                // {
                //     id:1,
                //     name:'等待响应',
                //     moreinfo:{
                //         branchName:'急诊医学科1'
                //     }
                // },
                // {
                //     id:2,
                //     name:'已响应',
                //     moreinfo:{
                //         branchName:'急诊医学科2'
                //     }
                // },
                // {
                //     id:3,
                //     name:'正在进行',
                //     moreinfo:{
                //         branchName:'急诊医学科3'
                //     }
                // },
                // {
                //     id:4,
                //     name:'已完成',
                //     moreinfo:{
                //         branchName:'急诊医学科3'
                //     }
                // },
                // {
                //     id:5,
                //     name:'未响应',
                //     moreinfo:{
                //         branchName:'急诊医学科3'
                //     }
                // }
            ]
        };
    },
    computed: {
         ...mapState({
            patientLists:state=>state.patientLists
        }),
        colorType(){
            var obj = {
                1:'yellow',
                2:'green',
                3:'green',
                4:'grey',
                5:'red'
            }   
            return obj
        }
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
            this.getGreenChannelTypes()
        },
        choose(item){
            this.currId = item.id;
        },
        getGreenChannelTypes(){
            getGreenChannelTypes().then((res)=>{
                console.log('绿色通道类型查询接口',res);
                if(res.data.code==200){
                    this.greenchannelLists = []
                    var lists = res.data.data
                    lists.forEach((item,index)=>{
                        this.greenchannelLists.push({
                            id:item.key,
                            name:item.value
                        })
                    })
                }
            })
        },
        getGreenChannelResponseBranchList(id){
            var params = {
                greenChannelId:id,        //类型编号
            }
            this.responseLists = []
            getGreenChannelResponseBranchList(params).then((res)=>{
                console.log('绿色通道响应部门查询结果：',res);
                if(res.data.code==200){
                    var lists = res.data.data
                    lists.forEach((item,index)=>{
                        this.responseLists.push({
                            ...item.value,
                            moreinfo:{
                                ...item.key
                            }
                        })
                    })
                }
            })
        },
        greenChannelApply(){
            this.createTime = dealDatetime(new Date())
            var params = {
                // medicalRecordId:this.medicalRecordId,
                // patientId:this.patientId,
                greenChannelType:this.currId,
                createTime:this.createTime
            }
            
            var necessarys = ['greenChannelType']
            var msg = {
                'greenChannelType':[
                    {
                        reg:/./,
                        msg:'请先选择绿色通道'
                    }
                ]
            }


            var status = paramsValid(params,necessarys,msg)
            if(!status){
                return false;
            }

            console.log('请求参数：：',params);
            this.isApplySuccess = false;
            greenChannelApply(params).then((res)=>{
                console.log('绿色通道申请返回结果：',res);
                if(res.data.code==200){
                    var id = res.data.data.greenChannelId
                    this.isApplySuccess = true;
                    this.getGreenChannelResponseBranchList(id);
                }
                else{
                    this.$message({
                        message:res.data.message,
                        type:'error'
                    })
                }
            })
        },
        makesure(){
            console.log('点击确定');
            this.greenChannelApply()
            
        }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/rem.scss';
.greenchannel{
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
            margin-bottom:rem(60);
            display: flex;
        }

    }
    .response-list{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .response-item{
            width: 18%;
            margin-right: 4%;
            display: flex;
            flex-direction: column;

            .title-type{
                font-size: rem(24);
                display: inline-block;
                height: 0.5rem;
                line-height: 0.5rem;
                color: #ffffff;
                text-align: center;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
            }
            .img{
                border-bottom-left-radius: 10px;
                border-bottom-right-radius: 10px;
                width: 100%;
                height: 1.1rem;
                background: #EEEEEE;
            }
            .sub{
                color: #ffffff;
                font-size: 0.18rem;
                display: inline-block;
                text-align: center;
                margin-top: 10px;
            }
        }
        .green{
            .title-type{
                background: #3DCC9C;
            }
        }
        .red{
            .title-type{
                background: #FF667F;
            }
        }
        .yellow{
            .title-type{
                background: #FFBF00;
            }
        }
        .grey{
            .title-type{
                background: #999999;
            }
        }
    }



    .checkbox-small{
        width:rem(176);
        line-height:rem(80);
        height:rem(80);
        margin-right:rem(40);
        
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

    .underline{
        width: 100%;
        height: 2px;
        background:-webkit-linear-gradient(right, rgba(0,0,0,0.1) , rgba(255,255,255,0.6),rgba(0,0,0,0.1)); /* Safari 5.1 - 6.0 */
    }
    .makesure{
        margin-top: rem(50);
        margin-bottom: rem(80);
    }

}
</style>
