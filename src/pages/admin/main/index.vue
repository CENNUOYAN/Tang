<template>
    <div class="main">
        <!-- <span>欢迎来到老人慢性病辅助管理系统</span> -->
        <router-view/>
    </div>
</template>

<script>
import cusdialog from '@/components/dialog/index'
import { getPatientList,bindWristband } from '@/api/patientinfo/patientinfo'
import { paramsValid } from '@/utils/common'

export default {
    data() {
        return {
            lists:[
                // {
                //     id:1,
                //     name:'欧阳南宁',
                //     age:54,
                //     info:'三无人员',
                //     patientId:1,
                //     moreinfo:{
                //         medicalRecordId:10,
                //     }
                // },
                // {
                //     id:2,
                //     name:'欧阳南宁',
                //     age:54,
                //     info:'三无人员',
                //     patientId:2,
                //     moreinfo:{
                //         medicalRecordId:20,
                //     }
                // },
                // {
                //     id:3,
                //     name:'欧阳南宁',
                //     age:54,
                //     info:'三无人员',
                //     patientId:3,
                //     moreinfo:{
                //         medicalRecordId:30,
                //     }
                // },
            ],

            isDialog:false,
            title:'',
            bindForm:{          //腕带绑定表单数据
                medicalRecordId:'',
                number:''
            },
            titleLists:['腕带绑定','温馨提示'],
            type:1,
            outCarDetailId:1,

            patientId:'',
            medicalRecordId:''
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.getLists();
        
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

        },
        bindBand(){
            // 腕带绑定
            var params = {
                medicalRecordId:this.bindForm.medicalRecordId,
                wristbandId:this.bindForm.number,               //腕带号
            }

            var necessarys = ['wristbandId']
            var msg = {
                'wristbandId':[
                    {
                        reg:/./,
                        msg:'腕带编号不能为空'
                    }
                ]
            }
            var status = paramsValid(params,necessarys,msg)
            if(!status){
                return false;
            }

            bindWristband(params).then((res)=>{
                console.log('绑定腕带返回结果',res);
                if(res.data.code==200){
                    this.isDialog = false
                    this.getLists();
                }
                else{
                    this.$message({
                        message:res.data.message,
                        type:'error'
                    })
                }
            })
        },

        openDetail(item){
            this.patientId = (item && item.patientId ? item.patientId:'')
            this.medicalRecordId = (item && item.moreinfo && item.moreinfo.medicalRecordId?item.moreinfo.medicalRecordId:'')
            var name = this.$route.name
            this.$router.push({
                name:name,
                query:{
                    pid:this.patientId,
                    mid:this.medicalRecordId
                }
            })
            console.log('this.currId');

        },
        bindCard(item){
            event.stopPropagation();
            console.log('弹窗提示用户');
            this.type=2;
            this.openDialog();
        },
        bindService(item){
            event.stopPropagation();
            console.log('绑定设备');
            this.type=1;
            console.log('item------>',item);
            this.bindForm.number = item.moreinfo.wristbandId
            this.bindForm.medicalRecordId = item.moreinfo.medicalRecordId
            this.openDialog();
        },
        openDialog(){
            this.title = this.titleLists[this.type-1];
            this.isDialog = true;
            
        },
        closeDialog(value){
            this.isDialog = value;
        },
        saving(){
            // this.isDialog = false;
            var type = this.type
            switch(type){
                case 1:{
                    this.bindBand()
                    break;
                }
                case 2:{
                    this.isDialog = false;
                    break;
                }
            }
        },
        getLists(){
            getPatientList({
                outCarDetailId:this.outCarDetailId
            }).then((res)=>{
                if(res.data.code==200){
                    this.lists = []
                    var lists = res.data.data
                    console.log('list:',lists);
                    lists.forEach((item,index)=>{
                        this.lists.push({
                            ...item.value,
                            moreinfo:{
                                ...item.key
                            }
                        })
                    })

                    this.$store.commit('setpatientLists',this.lists)
                    console.log('PatientLists::',this.lists[0],this.$store.state.patientLists[0]);
                    var patient = this.lists.length>0?this.lists[0]:{}
                    var pid = patient?patient.patientId:''
                    var mid = (patient && patient.moreinfo && patient.moreinfo.medicalRecordId?patient.moreinfo.medicalRecordId:'')
                    this.patientId = pid;
                    this.medicalRecordId = mid;
                    this.dealQuery();
                }
            })
        },

    },
    components: {
        cusdialog
    },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/rem.scss';
.main{
    font-size: rem(24);
    display: flex;
    padding-left: rem(80);
    padding-right: rem(80);
    height:calc(100vh - 1.5rem - 0.2rem - 0.58rem - 0.83rem );
    padding-bottom:rem(60);
	box-sizing: border-box;
    .main-left{
        width: rem(230);
        // width: 13%;
        margin-right: 2%;
        height:100%;
        overflow:auto;
        font-size: rem(20);
		.main-left-item-active{
			background:rgba(48,113,242,1);
			box-shadow:0px 0px 2px 0px rgba(255,255,255,0.8);

		}
		.main-left-item-unactive{
			background:rgba(47,47,60,0);
			box-shadow:0px 5px 15px 0px rgba(19,23,30,0.1), 0px 0px 2px 0px rgba(255,255,255,1);

		}
        .main-left-item{
            min-height: rem(280);
            /*width: 100%;*/
            border-radius:rem(16);
            margin-bottom: rem(40);
			box-sizing:border-box;
			display: flex;
			flex-direction: column;
			font-size: rem(20);
			align-items: flex-start;
			justify-content: space-between;
			cursor: pointer;
            position: relative;
            .item-detail{
                display: flex;
			    flex-direction: column;
                width:100%;
                align-items: flex-start;
			    justify-content: space-between;
                min-height: rem(280);
    			padding: rem(18) rem(25) rem(29) rem(25);
			    box-sizing:border-box;
                z-index:1;

            }
			.gender{
				display: flex;
				justify-content: center;
				width: 100%;
			}
			.icon-gender{
				width: rem(40);
				height: rem(40);
				display: inline-block;
			}
			.icon-con{
				display: flex;
				justify-content: space-between;
				width: 100%;
				img{
					width: rem(44);
					height: rem(44);
				}
			}
        }
        .inner-shadow{
            border-radius:rem(16);
            z-index:0;
        }
    }
}
</style>
