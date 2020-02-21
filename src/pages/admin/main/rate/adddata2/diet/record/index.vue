<template>
    <div class="diet-record">
        <div class="check-item" v-for="(item,index) in drugRecordList" :key="index">
            <div class="item-left" @click="openDetail(item)">
                <div class="record-title">
                    <span class="time">{{item.time}}</span>
                    <!-- <span class="sample">
                        <span class="low">
                            <span class="low-color"></span>
                            <span class="low-text">偏低</span>
                        </span>
                    </span> -->
                </div>
                <div class="data-item">
                    <span class="item-title">早餐</span>
                    <span class="drug-size">{{item.breakfast}}</span>
                </div>
                <div class="data-item">
                    <span class="item-title">午餐</span>
                    <span class="drug-size">{{item.lunch}}</span>
                </div>
                <div class="data-item">
                    <span class="item-title">晚餐</span>
                    <span class="drug-size">{{item.dinner}}</span>
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
                    time: '2020-02-17',
                    drugName: '肾上腺素',
                    breakfast: '米粥一碗，外加一根玉米',
                    lunch: '两碗米饭，50克黄瓜，80克白菜',
                    dinner: '两碗米饭，50克黄瓜，80克白菜',
                    drugMethod: '注射剂',
                    morningDose: 2,
                    noonDose: 3,
                    nightDose: 3,
                    // remark: '11111111111111',
                },
                {
                    id: 2,
                    time: '2020-02-17',
                    drugName: '多巴胺',
                    breakfast: '米粥一碗，外加一根玉米',
                    lunch: '两碗米饭，50克黄瓜，80克白菜',
                    dinner: '两碗米饭，50克黄瓜，80克白菜',
                    drugMethod: '口服药',
                    morningDose: 2,
                    noonDose: 3,
                    nightDose: 3,
                    // remark: '2222222222222222',
                },
                {
                    id: 3,
                    time: '2020-02-17',
                    drugName: '多巴胺',
                    breakfast: '米粥一碗，外加一根玉米',
                    lunch: '两碗米饭，50克黄瓜，80克白菜,100克牛肉',
                    dinner: '两碗米饭，50克黄瓜，80克白菜',
                    drugMethod: '口服药',
                    morningDose: 2,
                    noonDose: 3,
                    nightDose: 3,
                    // remark: '3333333333333333',
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
                name: 'dietrecorddetail',
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
.diet-record{
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
        height: rem(260);
        display: flex;
        .item-left{
            border-right: 1px solid #ffffff;
            /* width: 75%; */
            width: rem(800);
            text-overflow: ellipsis;
            white-space: nowrap;
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
            .sample{
                display: flex;
                .low{
                    display: flex;
                    align-items: center;
                    margin-right: rem(30);
                    .low-color{
                        width: rem(20);
                        height: rem(20);
                        background-color: #efa140;
                        margin-right: rem(20);
                    }
                }
                .high{
                    display: flex;
                    align-items: center;
                    .high-color{
                        width: rem(20);
                        height: rem(20);
                        background-color: #da1313;
                        margin-right: rem(20);
                    }
                }
            }
        } 
        .data-item{
            display: flex;
            align-items: center;
            margin-bottom: rem(20);
            .item-title{
                /* margin-right: rem(80); */
                width: rem(80);
            }
            .drug-size{
                font-size: rem(24);
                text-align: left;
                width: rem(300);
                color: #efa140;
                text-overflow: ellipsis;
                white-space: nowrap;
                /* margin-right: rem(80); */
            }
            .drug-type{
                font-size: rem(20);
                text-align: left;
                width: rem(300);
                color: #efa140;
                text-overflow: ellipsis;
                white-space: nowrap;
                /* margin-right: rem(30); */
            }
        }  
        .item-right{
            line-height: rem(210);
            color: #ff133f;
            font-size: rem(28);
            padding-left: rem(60);
            /* width: 25%; */
            width: rem(200);
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
