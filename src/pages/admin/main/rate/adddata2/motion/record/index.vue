<template>
    <div class="motion-record">
        <div class="check-item" v-for="(item,index) in drugRecordList" :key="index">
            <div class="item-left" @click="openDetail(item)">
                <div class="record-title">
                    <span class="time">{{item.time}}</span>
                </div>
                <div class="data-item">
                    <span class="item-title">{{item.time.split(':')[1]}}</span>
                    <span class="drug-size">{{item.motionName}}</span>
                    <span class="drug-type">{{item.duration}}分钟</span>
                </div>
            </div>
            <div class="item-right">
                删除
            </div>
        </div>
    </div>
</template>

<script>
import cusdialog from '@/components/dialog/index'
import inputnumber from '@/components/inputnumber/index'
import slider from '@/components/slider/index'
import { saveTraumaScore,getTraumaScore,getScoreItems } from '@/api/rate/rate'
import {mapState} from 'vuex'

var drugRecord = JSON.parse(localStorage.getItem('drugRecord'))
console.log('drugRecord',drugRecord)

export default {
    data() {
        return {
            drugRecord: '',
            drugRecordList:[
                {
                    id: 1,
                    time: '2020-02-17:08-10-43',
                    motionName: '快走',
                    duration: 30,
                    remark: '11111111111111',
                    type: 5,
                    unit: '分钟',
                    energy: 3.83,
                    name: '快走',
                    minute:30,
                },
                {
                    id: 5,
                    time: '2020-02-17:15-30-36',
                    motionName: '游泳',
                    duration: 20,
                    remark: '2222222222222222',
                    type: 5,
                    unit: '分钟',
                    energy: 3.83,
                    name: '游泳',
                    minute:30,
                },
                {
                    id: 3,
                    time: '2020-02-18:08-28-43',
                    motionName: '太极拳',
                    duration: 60,
                    remark: '3333333333333333',
                    type: 5,
                    unit: '分钟',
                    energy: 3.83,
                    name: '太极拳',
                    minute:30,
                },
            ],
            time: '', 
            numberP1: '',
            numberP2: '',
            currId:'',
            remark: '',
            patientId:'',
            medicalRecordId:'',
            classifyIdLists:[],
            isDialog: false,
        };
    },
    computed: {
        ...mapState({
            patientLists:state=>state.patientLists
        }),   
    },
    created() {
        this.drugRecord = drugRecord
        console.log(this.drugRecord)
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
        },
        openDetail(item){
            this.$router.push({
                name: 'motionrecorddetail',
                query: {
                    recordId: item.id,
                    record: item,
                }
            })
        },
    },
    components: {
        cusdialog,
        inputnumber,
        slider,
    },
};
</script>

<style lang="scss">
@import '@/assets/scss/rem.scss';
.motion-record{
    background:linear-gradient(0deg,rgba(64,60,97,1),rgba(81,77,113,1));
    box-shadow:0px rem(10) rem(30) 0px rgba(16,15,24,0.2);
    border-radius:rem(20);
    overflow:auto;
    box-sizing:border-box;
    height:100%;
    width:100%;
    padding-top: rem(30);
    display: flex;
    flex-wrap: wrap;
    .check-item{
        margin-bottom:rem(30);
        margin-left: rem(260);
        text-align: left;
        border: 1px solid #ffffff;
        background:linear-gradient(0deg,rgba(19,157,232,1),rgba(50,232,246,1));
        border-radius: rem(10);
        width: rem(680);
        height: rem(180);
        display: flex;
        .item-left{
            border-right: 1px solid #ffffff;
            width: 75%;
            font-size: rem(28);
        }
        .record-title{
            text-align:left;
            font-size:rem(30);
            margin-bottom: rem(35);
            display: flex;
            padding-right: rem(30);
            padding-top: rem(30);
            .time{
                margin-right: rem(50);
            }
        } 
        .data-item{
            display: flex;
            align-items: center;
            margin-bottom: rem(20);
            .item-title{
                /* margin-right: rem(80); */
                width: rem(160);
            }
            .drug-size{
                font-size: rem(28);
                text-align: right;
                width: rem(160);
                color: #efa140;
                /* margin-right: rem(80); */
            }
            .drug-type{
                font-size: rem(28);
                text-align: right;
                width: rem(160);
                color: #efa140;
                margin-right: rem(30);
            }
        }  
        .item-right{
            line-height: rem(210);
            color: #ff133f;
            font-size: rem(28);
            padding-left: rem(60);
            width: 25%;
        }
        .value-check{
            flex-direction:column;
        }            
    }
    .active{
        background:rgba(48,113,242,1);
        box-shadow:0px rem(5) rem(15) 0px rgba(19,23,30,0.1), 0px 0px 2px 0px rgba(255,255,255,1);
    }
    .unactive{
        background:rgba(96,96,128,0);
        box-shadow:0px rem(5) rem(15) 0px rgba(19,23,30,0.1), 0px 0px 2px 0px rgba(255,255,255,1);
    }
    .save-item{
        /* display: flex;
        padding-left: rem(50);
        margin-bottom: rem(20); */
        padding-top: rem(30);
        padding-bottom: rem(30);
        .main-btn{
            width: rem(80);
            height: rem(50);
        }
    }
}
</style>
