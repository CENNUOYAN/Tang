<template>
    <div class="home">
        <span>欢迎来到老人慢性病辅助管理系统</span>
    </div>
</template>

<script>
import { postJsonByEncode } from '@/api/demo'
import { getIndexData } from '@/api/home/home'
export default {
    data() {
        return {
			info:[
				{
					id:1,
					name:'体征',
					time:'15:45',
					data:['T:23','B:20','R:35']
				},
				{
					id:2,
					name:'评分',
					time:'15:45',
					data:['GCS：35','FAST：F A S','NIHSS：25']
				},
				{
					id:3,
					name:'分级分区',
					time:'15:45',
					data:[
						{
							id:1,
							name:'一级',
							color:'pink'
						},
						{
							id:2,
							name:'二级',
							color:'pink'
						},
						{
							id:3,
							name:'三级',
							color:'yellow'
						},
						{
							id:4,
							name:'四级',
							color:'green'
						}
					]
				},
				{
					id:4,
					name:'诊断',
					time:'15:45',
					data:['呼吸系统急症，急性呼吸困难，大脑缺 氧严重，休克']
				},
				{
					id:5,
					name:'出车团队',
					time:'15:45',
					data:['外科急症医生','护工','司机','护工']
				},
				{
					id:6,
					name:'体格',
					time:'15:45',
					data:['皮肤：良好','眼睛：红肿、出血','关节：移位','鼻子：正常','耳朵：正常','口腔：有异物']
				},

			],
			name:{
				0:'content-1',
				1:'content-2',
				2:'content-4',
				3:'content-3',
				4:'content-2',
				5:'content-2'
			},
			currId:3,
			outCarDetailId:'1',          //出车id，来源未知
			patientId:'',
            medicalRecordId:'',
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
		// this.testAjax()
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
			this.getIndexData()
        },
		selectGrade(item){
            this.currId = item.id
		},
		testAjax(){
			postJsonByEncode().then((res)=>{
				console.log('请求成功',res);
			}).catch((err)=>{
				console.log('请求失败',err);
			}).finally((e)=>{
				console.log('请求结束',e);
				
			})
		},
		getIndexData(){
			var params = {
				outCarDetailId:this.outCarDetailId,
				medicalRecordId:this.medicalRecordId
			}
			getIndexData(params).then((res)=>{
				if(res.data.code==200){
					
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
.home{
    font-size: rem(24);
    width: 100%;
	display: flex;
	flex-flow: row wrap;
	align-content: flex-start;
	overflow: auto;
    .home-box{
        margin-right: 2%;
        /*min-height: rem(194);*/
        background:linear-gradient(0deg,rgba(64,60,97,1),rgba(81,77,113,1));
        box-shadow:0px 10px 30px 0px rgba(16,15,24,0.2);
        border-radius:8px;
        margin-bottom: rem(32);
		flex: 0 0 31.2%;
		box-sizing: border-box;
		cursor: pointer;
		.title-con{
			height: rem(78);
			display: flex;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			.title{
				display: flex;
				width: 100%;
				justify-content: space-between;
				align-items: flex-end;
				padding-bottom: rem(10);
				padding-left: rem(40);
				padding-right: rem(40);
				box-sizing: border-box;
			}
			.underline{
				width: 100%;
				height: 2px;
				background:-webkit-linear-gradient(right, rgba(0,0,0,0.1) , rgba(255,255,255,0.6),rgba(0,0,0,0.1)); /* Safari 5.1 - 6.0 */
			}
		}
		.content{
			padding-left: rem(40);
			padding-right: rem(40);
			padding-bottom: rem(60);
			box-sizing: border-box;
			width: 100%;
			.txt{
				margin-top: rem(36);
				display: inline-block;
			}
		}
		.content-1{
			display: flex;
			justify-content: space-between;
		}
		.content-2{
			display: flex;
			flex-wrap: wrap;
			.txt{
				min-width: 50%;
				text-align: left;
			}
		}
		.content-3{
			.txt{
				text-align: left;
			}
		}
		.content-4{
			display:flex;
			flex-wrap:wrap;
			padding-top:rem(29);
		}
    }
	
	// 按钮样式
	.checkbox-middle{
        width:rem(176);
        line-height:rem(80);
        height:rem(80);
        margin-bottom:rem(30);
    }
    .checkbox-small{
        width:rem(160);
        line-height:rem(70);
        height:rem(70);
        margin-right:rem(25);
        
    }
    .checkbox{
        font-size:rem(24);
        display:inline-block;
        color:#ffffff;
        text-align:center;
        border-radius:rem(10);
        cursor:pointer;
        box-sizing:border-box;
        position: relative;

    }
    .pink-active{
        background:rgba(255,102,128,1);
        box-shadow:0px rem(5) rem(15) 0px rgba(19,23,30,0.1), 0px 0px 2px 0px rgba(255,255,255,1);
        border:1px solid rgba(255, 102, 128, 1);
        margin-bottom:rem(40);
    }
    .pink-unactive{
        background:rgba(96,96,128,0);
        box-shadow:0px rem(5) rem(15) 0px rgba(19,23,30,0.1), 0px 0px 2px 0px rgba(255,255,255,1);
        border:1px solid rgba(255, 102, 128, 1);
        color:#FF6680;
        margin-bottom:rem(40);
    }

    .yellow-active{
        background:rgba(255,190,0,1);
        box-shadow:0px rem(5) rem(15) 0px rgba(19,23,30,0.1), 0px 0px 2px 0px rgba(255,255,255,1);
        border:1px solid rgba(255,190,0,1);
    }
    .yellow-unactive{
        background:rgba(96,96,128,0);
        box-shadow:0px rem(5) rem(15) 0px rgba(19,23,30,0.1), 0px 0px 2px 0px rgba(255,255,255,1);
        border:1px solid rgba(255,190,0,1);
        color:#FFBE00;
    }

    .green-active{
        background:rgba(61, 204, 156, 1);
        box-shadow:0px rem(5) rem(15) 0px rgba(19,23,30,0.1), 0px 0px 2px 0px rgba(255,255,255,1);
        border:1px solid rgba(61, 204, 156, 1);
    }
    .green-unactive{
        background:rgba(96,96,128,0);
        box-shadow:0px rem(5) rem(15) 0px rgba(19,23,30,0.1), 0px 0px 2px 0px rgba(255,255,255,1);
        border:1px solid rgba(61, 204, 156, 1);
        color:#3DCC9C;
    }

}
</style>
