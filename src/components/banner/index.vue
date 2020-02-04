<template>
    <div class="banner">
        <div class="banner-item" v-for="(item,index) in lists" :key="index" @click="openpage(item)">
            <div class="icon-con">
                <img class="icon" :src="currId==item.id?item.active:item.icon" alt="">
            </div>
            <span class="title">{{item.name}}</span>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data() {
        return {
             lists:[
                {
                    id:'patientinfo',
                    name:'服用药物',
                    icon:require('./images/yhxx.png'),
                    active:require('./images/hzxx_celect.png'),
                },
                {
                    id:'tutelage',
                    name:'治疗计划',
                    icon:require('./images/tizhen.png'),
                    active:require('./images/tzjh_celect.png'),
                },
                {
                    id:'check',
                    name:'运动安排',
                    icon:require('./images/jiancha.png'),
                    active:require('./images/jc_celect.png'),
                },
                {
                    id:'rate',
                    name:'自测指标',
                    icon:require('./images/pingfen.png'),
                    active:require('./images/pf_celecct.png'),
                },
                {
                    id:'diagnosis',
                    name:'个人资料',
                    icon:require('./images/zhenduan.png'),
                    active:require('./images/cbzd_celect.png'),
                },
                {
                    id:'care',
                    name:'治疗/护理',
                    icon:require('./images/huli.png'),
                    active:require('./images/zlhl_celect.png'),
                },
                {
                    id:'caserecord',
                    name:'病历',
                    icon:require('./images/bingli.png'),
                    active:require('./images/bl_celect.png'),
                },
                {
                    id:'greenchannel',
                    name:'绿色通道',
                    icon:require('./images/tongdao.png'),
                    active:require('./images/lstd_celect.png'),
                },
                {
                    id:'situation',
                    name:'出车情况',
                    icon:require('./images/chuche.png'),
                    active:require('./images/ccqk_celect.png'),
                }
            ],
			currId:''
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
		this.currId = this.$route.name
    },
    watch: {
		$route(to,from){
			console.log('dddddddd',to.name)
			this.currId = to.name
        },
        patientLists(val){
		    console.log('this::::',this.patientLists)
        }
    },
    methods: {
        openpage(item){
            console.log('点击了:',item);
            var patient = this.patientLists.length>0?this.patientLists[0]:{}
            var pid = patient?patient.patientId:''
            var mid = (patient && patient.moreinfo && patient.moreinfo.medicalRecordId?patient.moreinfo.medicalRecordId:'')
            this.$router.push({
                name:item.id,
                query:{
                    pid:pid,
                    mid:mid
                }
            })
            
        }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/rem.scss';
.banner{
    display: flex;
    justify-content: space-around;
    padding-left: rem(59);
    padding-right: rem(59);
    box-sizing: border-box;
    padding-bottom: rem(70);
    
    .banner-item{
        display: flex;
        flex-direction: column;
        cursor: pointer;
        .icon-con{
            height: rem(180);
			width: rem(180);
			display: flex;
            align-items: flex-end;
			justify-content: center;
            .icon{
                margin-bottom: rem(5);
                width: 100%;
            }
        }
        .title{
            font-size: rem(24);
            height: rem(24);
            line-height: rem(24);
        }
    }
}
</style>
