<template>
    <div class="rate">
        <div class="sp-data">血糖数据</div>
        <div class="add-data">
            +
        </div>
        
    </div>
</template>

<script>
import cusdialog from '@/components/dialog/index'
import { saveTraumaScore,getTraumaScore,getScoreItems } from '@/api/rate/rate'
import {mapState} from 'vuex'

export default {
    data() {
        return {
            rateLists:[
                {
                    id:1,
                    title:'GCS',
                    subtitle:'格拉斯哥昏迷量表评分',
                    content:'格拉斯哥昏迷评分法是医学上评 估病人昏迷程度的方法。GCS包 括睁眼反应、语言反应、运动反 应3个子项目',
                    type:'pink-item',
                },
                {
                    id:2,
                    title:'NIHSS',
                    subtitle:'美国国立卫生院 脑卒中评分',
                    content:'HIHSS评分用于评估卒中患者神 经功能缺损程度。基线评估可以 评估卒中严重程度',
                    type:'blue-item',
                },
                {
                    id:3,
                    title:'FAST',
                    subtitle:'FAST脑卒中快速识别',
                    content:'脑卒中的典型症状仅为头痛、呕 吐，很容易与其他疾病混淆，可 通过“FAST”判断法，快速判断 患者是否有中风',
                    type:'green-item',
                },
            ],
            isDialog:false,
            statement:[
                {
                    id:1,
                    name:'0分'
                },
                {
                    id:2,
                    name:'1分'
                },
                {
                    id:3,
                    name:'2分'
                },
                {
                    id:4,
                    name:'4分'
                }
            ],
            // stateId:1,
            // stateIdLists:[1,2,1,1,1,1],
            state0:1,
            state1:1,
            state2:1,
            state3:1,
            state4:1,
            state5:1,
            title:'',

            leftLists:[],
            rightLists:[],

            currItem:{},
            patientId:'',
            medicalRecordId:'',

        };
    },
    computed: {
        ...mapState({
            patientLists:state=>state.patientLists
        }),
        titleScore(){
            return this.title + '（总分：'+this.totalScore+'分）'
        },
        totalScore(){
            var leftscore = 0
            var rightscore = 0
            this.leftLists.forEach((item,index)=>{
                if(item.value){
                    var score = item.scoreInfo.filter(itt=>itt.scoreId==item.value)
                    if(score && score.length >0){
                        leftscore = leftscore + score[0].score
                        // console.log('right--------->',score[0].score);
                    }
                }
            })

            this.rightLists.forEach((item,index)=>{
                if(item.value){
                    var score = item.scoreInfo.filter(itt=>itt.scoreId==item.value)
                    if(score && score.length >0){
                        rightscore = rightscore + score[0].score
                        // console.log('right--------->',score[0].score);
                    }
                }
            })
            return (leftscore+rightscore)
        }
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
        },
    },
    components: {
        cusdialog
    },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/rem.scss';
.rate{
    background:linear-gradient(0deg,rgba(64,60,97,1),rgba(81,77,113,1));
    box-shadow:0px rem(10) rem(30) 0px rgba(16,15,24,0.2);
    border-radius:rem(20);
    overflow:auto;
    box-sizing:border-box;
    height:100%;
    width:100%;

}
</style>
