<template>
    <div class="caserecord">
        <div class="case-top">
            <div class="case-item">
                <div class="title">主诉</div>
                <div class="content">
                    <textarea v-model="chiefComplaint" placeholder="请输入患者自己描述的症状、体征..."/>
                </div>
            </div>

            <div class="case-item">
                <div class="title">既往病史</div>
                <div class="content">
                    <textarea v-model="medicalHistory" placeholder="请输入患者既往病史.."/>
                </div>
            </div>

        </div>
        <div class="check-item">
            <el-button type="primary" class="main-btn" @click.native="updateMedicalRecord">保存</el-button>
        </div>
    </div>
</template>

<script>
import { updateMedicalRecord } from '@/api/caserecord/caserecord'
import { paramsValid } from '@/utils/common'
import {mapState} from 'vuex'

export default {
    data() {
        return {
            textarea:'',
            chiefComplaint:'',
            medicalHistory:'',
            medicalRecordId:'',     //1019
            patientId:'',
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
        },
        dealLists(){
            var item = this.patientLists.filter(itt=>itt.moreinfo.medicalRecordId==this.medicalRecordId)
            if(item && item.length>0){
                this.chiefComplaint = ''
                this.medicalHistory = ''
            }
        },
        updateMedicalRecord(){
            var params = {
                chiefComplaint:this.chiefComplaint,          //主诉
                medicalHistory:this.medicalHistory,          //病史
                medicalRecordId:this.medicalRecordId
            }

            var necessarys = ['chiefComplaint']
            var msg = {
                'chiefComplaint':[
                    {
                        reg:/./,
                        msg:'请输入主诉'
                    }
                ]
            }

            var status = paramsValid(params,necessarys,msg)
            if(!status){
                return;
            }
            
            updateMedicalRecord(params).then((res)=>{
                console.log('更新病历返回结果');
            })

        }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/rem.scss';
.caserecord{
    font-size: rem(24);
    background:linear-gradient(0deg,rgba(64,60,97,1),rgba(81,77,113,1));
    box-shadow:0px rem(10) rem(30) 0px rgba(16,15,24,0.2);
    border-radius:rem(20);
    overflow:auto;
    box-sizing:border-box;
    padding:rem(60) rem(80) rem(80) rem(80);
    height:100%;
    width:100%;
    display:flex;
    flex-direction:column;
    .case-top{
        display:flex;
        flex-direction:row;
        width:100%;
        margin-bottom:rem(50);
        .case-item{
            width:50%;
            .title{
                text-align:left;
                margin-bottom:rem(20);
            }
            .content{
                width:rem(600);
                height:rem(280);
                textarea{
                    width:100%;
                    height:100%;
                    background:rgba(96,96,128,1);
                    box-shadow:0px 0px 2px 0px rgba(255,255,255,1);
                    border-radius:rem(20);
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
    }
}
</style>
