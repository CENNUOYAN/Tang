<template>
    <div class="analysis">
        <div class="check-item">
            <div class="value value-check">
                <div class="nav-content">
                    <div class="target">
                        <span class="before-target">02/17-02/23</span>
                        <span>100%</span>
                        <span class="text">血糖测量次数达标率</span>
                    </div>
                    <div class="charts-item" v-for="(item,index) in chartsLists" :key="index">
                        <div :id="'main'+index" style="width: 600px;height: 280px;"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="save-item">
            <el-button type="primary" class="main-btn" @click.native="saving">保存</el-button>
        </div> -->
    </div>
</template>

<script>
import cusdialog from '@/components/dialog/index'
import inputnumber from '@/components/inputnumber/index'
import slider from '@/components/slider/index'
import { saveTraumaScore,getTraumaScore,getScoreItems } from '@/api/rate/rate'
import {mapState} from 'vuex'
import echarts from 'echarts'
export default {
    data() {
        return {
            currCheck:1,
            charts: '',
            measureDate: '',
            chartsLists: [
                {
                    id: 1,
                    value: 20,
                    date: '2020/02/02',
                    timeList: [
                        {
                            time: '2020/02/02-08:30',
                            value: 10,
                        },
                        {
                            time: '2020/02/02-11:30',
                            value: 7,
                        },
                        {
                            time: '2020/02/02-13:30',
                            value: 16,
                        },
                        {
                            time: '2020/02/02-16:30',
                            value: 12,
                        },
                    ]
                },
                {
                    id: 2,
                    value: 6,
                    date: '2020/02/09',
                    timeList: [
                        {
                            time: '2020/02/09-08:30',
                            value: 5,
                        },
                        {
                            time: '2020/02/09-11:30',
                            value: 10,
                        },
                        {
                            time: '2020/02/09-13:30',
                            value: 10,
                        },
                        {
                            time: '2020/02/09-16:30',
                            value: 8,
                        },
                    ]
                },
                {
                    id: 3,
                    value: 10,
                    date: '2020/02/10',
                    timeList: [
                        {
                            time: '2020/02/10-08:30',
                            value: 10,
                        },
                        {
                            time: '2020/02/10-11:30',
                            value: 7,
                        },
                        {
                            time: '2020/02/10-13:30',
                            value: 16,
                        },
                        {
                            time: '2020/02/10-16:30',
                            value: 8,
                        },
                    ]
                },
                {
                    id: 4,
                    value: 8,
                    date: '2020/02/11',
                    timeList: [
                        {
                            time: '2020/02/11-08:30',
                            value: 10,
                        },
                        {
                            time: '2020/02/11-11:30',
                            value: 7,
                        },
                        {
                            time: '2020/02/11-13:30',
                            value: 20,
                        },
                        {
                            time: '2020/02/11-16:30',
                            value: 8,
                        },
                    ]
                },
                {
                    id: 5,
                    value: 7,
                    date: '2020/02/12',
                    timeList: [
                        {
                            time: '2020/02/12-08:30',
                            value: 6,
                        },
                        {
                            time: '2020/02/12-11:30',
                            value: 7,
                        },
                        {
                            time: '2020/02/12-13:30',
                            value: 18,
                        },
                        {
                            time: '2020/02/12-16:30',
                            value: 8,
                        },
                    ]
                },
            ],
            // opinionData: ["6", "10", "8", "10", "12"], 
            opinionData: [],
            dateLists: ['00:00','06:00','12:00','18:00','00:00'],
        };
    },
    computed: {
        ...mapState({
            patientLists:state=>state.patientLists
        }),   
    },
    created() {
        this.chartsLists.forEach((item,index)=>{
            // this.dateLists.push(item.date)
            item.timeList.forEach((itt,ind)=>{
                this.opinionData.push(itt.value)
                // this.measureDate = item.date
            })
            // if(index==this.chartsLists.length-1){
            //     item.date.split('/')[1]
            // }
        })
        var date=new Date;
        var year=date.getFullYear();
        var month=date.getMonth()+1;
    },
    mounted() {
        this.dealQuery();
        this.$nextTick(function() {
            var data = [],time = [];
            this.chartsLists.forEach((item,index)=>{
                data = []
                time = []
                item.timeList.forEach((itt,ind)=>{
                    data.push(itt.value)
                    time.push(itt.time.split('-')[1])
                })
                console.log('index',data)
                this.drawLine('main'+index,item.date,data,time)
            })
        })
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
        choose(item){
            this.currCheck = item.id;
            this.currContent = 1;
        }, 
        drawLine(id,date,sugarValue,time) {
            this.charts = echarts.init(document.getElementById(id))
            this.charts.setOption({
                tooltip: {
                    trigger: 'axis'
                },
                // legend: {
                //     // data: ['近七日收益']
                // },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },

                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    // data: ["3","6","9","12","15","18"]
                    // data: this.dateLists,
                    data: time,
                    axisLine: {
                        lineStyle: {
                        // 设置x轴颜色
                        color: '#ffffff'
                        }
                    },
                },
                yAxis: {
                    name: date,
                    type: 'value',
                    min:0, // 设置y轴刻度的最小值
                    max:24,  // 设置y轴刻度的最大值
                    splitNumber:7,  // 设置y轴刻度间隔个数
                    axisLine: {
                        lineStyle: {
                        // 设置y轴颜色
                        color: '#ffffff'
                        }
                    },
                    splitLine :{    //网格线
                        lineStyle:{
                            type:'dashed',    //设置网格线类型 dotted：虚线   solid:实线
                            // color: ['red','yellow']
                        },
                        show:true //隐藏或显示
                    },
                    // splitArea: {
                    //     show: true,
                    //     areaStyle: {
                    //         color: ''
                    //     }
                    // }
                },
                visualMap: {
                    show: false,
                    // type: 'piecewise',
                    seriesIndex:0,//控制series 对应的区域
                    pieces: [{
                        gt: 11.1,
                        color: '#ff0c0c'
                    }, {
                        gt: 3.9,
                        lte: 11.1,
                        color: '#2c8ff7'
                    }, {
                        gt: 0,
                        lte: 3.9,
                        color: 'yellow'
                    }],
                },
                series: [{
                    name: '血糖数据',
                    type: 'line',
                    stack: '总量',
                    data: sugarValue,
                    smooth: true,
                    // areaStyle: {
                    //     normal: {
                    //         color: '#091e3b' //改变区域颜色
                    //     }
                    // },
                }]
            })
        }
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
.analysis{
    background:linear-gradient(0deg,rgba(64,60,97,1),rgba(81,77,113,1));
    box-shadow:0px rem(10) rem(30) 0px rgba(16,15,24,0.2);
    border-radius:rem(20);
    overflow:auto;
    box-sizing:border-box;
    height:100%;
    width:100%;
    padding-top: rem(30);
    .check-item{
        /* margin-bottom:rem(59); */
        padding-left: rem(59);
        .title{
            text-align:left;
            font-size:rem(30);
            margin-bottom: rem(35);
        }   
        .value{
            display:flex;
            width:100%;
            .nav{
                width:100%;
                .nav-lists{
                    display:flex;
                    justify-content:flex-start;
                    margin-bottom:rem(50);
                    span{
                        display:inline-block;
                        margin-right:rem(60);
                        font-size:rem(24);
                        cursor: pointer;
                    }
                    .nav-active{
                        font-weight:bold;
                        color:#6BA5FF;
                    }
                }
            }
            .nav-content{
                display:flex;
                flex-direction: column;
                /* padding-left: rem(20); */
                text-align: left;
                .data-item{
                    display: flex;
                    align-items: center;
                    margin-bottom: rem(20);
                    .item-title{
                        /* margin-right: rem(50); */
                        width: rem(128);
                    }
                    .data-input{
                        width: rem(600);
                        height: rem(70);
                        box-sizing:border-box;
                        margin-right: rem(20);
                        border-radius: rem(10);
                        border: none;
                        .el-input__inner{
                            width: rem(600);
                            height: rem(70);
                        }
                    }  
                    .el-date-editor{
                        width: rem(600);
                        .el-input__inner{
                            width: rem(600);
                            height: rem(70);
                        }
                    }
                    .el-select{
                        width: rem(600);
                        // height: rem(100);
                        box-sizing:border-box;
                        .el-input{
                            width: rem(600);
                            /* height: rem(100); */
                            .el-input__inner{
                                width: rem(600);
                                /* height: rem(100); */
                                box-sizing:border-box;
                            }
                            .el-select__caret{
                                
                            }
                        }
                    }
                    .inputnumber{
                        margin-right: rem(80);
                    }
                }
                .target{
                    .before-target{
                        margin-right: rem(30);
                    }
                }
            }
        }  
        .second-content{
            // width:rem(600);
            width:88%;
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
        .value-check{
            flex-direction:column;
        }            
    }
    .sugar-table{
        margin-top: rem(30);
        margin-left: rem(59);
        .table-title{
            text-align: left;
            margin-bottom: rem(30);
            display: flex;
            .title-text{
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
        .el-table{
            width: 80%;
            border-radius: rem(8);
            background:linear-gradient(0deg,rgba(64,60,97,1),rgba(81,77,113,1));
            .cell{
                display: flex;
                justify-content: center;
            }
            .red{
                color: #da1313;
            }
            .yellow{
                color: #efa140;
            }
            .normal{
                color: #333333;
            }
        }
    }
    .save-item{
        /* display: flex;
        padding-left: rem(50);
        margin-bottom: rem(20); */
        padding-bottom: rem(30);
        .main-btn{
            width: rem(80);
            height: rem(50);
        }
    }
}
</style>
