<template>
    <div class="seedata">
        <div class="check-item">
            <div class="value value-check">
                <div class="nav">
                    <div class="nav-lists">
                        <span :class="currCheck==item.id?'nav-active':''" v-for="(item,index) in resultLists"
                            :key="index"
                            @click="choose(item)">
                            {{item.name}}
                        </span>
                    </div>
                    <div class="underline"></div>
                </div>
                <div class="nav-content">
                    <div class="target">
                        <span class="before-target">餐前目标：4.4 - 7.0mmol/L</span>
                        <span class="after-target">餐后目标：4.4 - 10.0mmol/L</span>
                    </div>
                    <div id="main" style="width: 600px;height: 280px;"></div>
                </div>
            </div>
        </div>
        <div class="sugar-table" >
            <div class="table-title">
                <span class="title-text">血糖数据</span>
                <span class="sample">
                    <span class="low">
                        <span class="low-color"></span>
                        <span class="low-text">偏低</span>
                    </span>
                    <span class="high">
                        <span class="high-color"></span>
                        <span class="high-text">偏高</span>
                    </span>
                </span>
            </div>
            <el-table :data="tableData" >
                <el-table-column prop="date" label="日期" > </el-table-column>
                <el-table-column prop="beforeDawn" label="凌晨3时">
                    <template slot-scope="scope">
                        <div :class="scope.row.beforeDawn > 11.1? 'red': (scope.row.beforeDawn > 4?'normal':'yellow')"> {{ scope.row.beforeDawn }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="早餐">
                    <el-table-column prop="beforeBreakfast" label="前">
                        <template slot-scope="scope">
                            <div :class="scope.row.beforeBreakfast > 11.1? 'red': (scope.row.beforeBreakfast > 4?'normal':'yellow')"> {{ scope.row.beforeBreakfast }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="afterBreakfast" label="后">
                        <template slot-scope="scope">
                            <div :class="scope.row.afterBreakfast > 11.1? 'red': (scope.row.afterBreakfast > 4?'normal':'yellow')"> {{ scope.row.afterBreakfast }}</div>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="午餐">
                    <el-table-column prop="beforeLunch" label="前">
                        <template slot-scope="scope">
                            <div :class="scope.row.beforeLunch > 11.1? 'red': (scope.row.beforeLunch > 4?'normal':'yellow')"> {{ scope.row.beforeLunch }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="afterLunch" label="后">
                        <template slot-scope="scope">
                            <div :class="scope.row.afterLunch > 11.1? 'red': (scope.row.afterLunch > 4?'normal':'yellow')"> {{ scope.row.afterLunch }}</div>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="晚餐">
                    <el-table-column prop="beforeDinner" label="前">
                        <template slot-scope="scope">
                            <div :class="scope.row.beforeDinner > 11.1? 'red': (scope.row.beforeDinner > 4?'normal':'yellow')"> {{ scope.row.beforeDinner }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="afterDinner" label="后">
                        <template slot-scope="scope">
                            <div :class="scope.row.afterDinner > 11.1? 'red': (scope.row.afterDinner > 4?'normal':'yellow')"> {{ scope.row.afterDinner }}</div>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column prop="beforeBed" label="睡前">
                    <template slot-scope="scope">
                        <div :class="scope.row.beforeBed > 11.1? 'red': (scope.row.beforeBed > 4?'normal':'yellow')"> {{ scope.row.beforeBed }}</div>
                    </template>
                </el-table-column>
              </el-table>
        </div>
        <!-- <el-table
            :data="tableData"
            style="width: 60%">
            <el-table-column
            prop="date"
            label="日期"
            width="150">
            </el-table-column>
            <el-table-column label="配送信息">
            <el-table-column
                prop="name"
                label="姓名"
                width="120">
            </el-table-column>
            <el-table-column label="地址">
                <el-table-column
                prop="province"
                label="省份"
                width="120">
                </el-table-column>
                <el-table-column
                prop="city"
                label="市区"
                width="120">
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址"
                width="300">
                </el-table-column>
                <el-table-column
                prop="zip"
                label="邮编"
                width="120">
                </el-table-column>
            </el-table-column>
            </el-table-column>
        </el-table> -->
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
            sugarLists: [
                {
                    id: 1,
                    value: 20,
                    time: '02/07',
                },
                {
                    id: 2,
                    value: 6,
                    time: '02/09',
                },
                {
                    id: 3,
                    value: 10,
                    time: '02/10',
                },
                {
                    id: 4,
                    value: 8,
                    time: '02/11',
                },
                {
                    id: 5,
                    value: 7,
                    time: '02/12',
                },
                {
                    id: 6,
                    value: 8,
                    time: '02/12',
                },
                {
                    id: 7,
                    value: 12,
                    time: '02/12',
                },
                {
                    id: 8,
                    value: 12,
                    time: '02/16',
                },
                {
                    id: 9,
                    value: 16,
                    time: '02/19',
                },
            ],
            // opinionData: ["6", "10", "8", "10", "12"], 
            opinionData: [],
            timeLists: [],
            resultLists:[
                {
                    id:1,
                    name:'两周'
                },
                {
                    id:2,
                    name:'一个月'
                },
                {
                    id:3,
                    name:'三个月'
                },
            ],
            tableData: [{
                    date: '2019-10-13',
                    beforeDawn: '',
                    beforeBreakfast: 13,
                    afterBreakfast: 16,
                    beforeLunch: '',
                    afterLunch: '',
                    beforeDinner: '',
                    afterDinner: 12,
                    beforeBed: '',
                }, {
                    date: '2020-02-07',
                    beforeDawn: '',
                    beforeBreakfast: 2,
                    afterBreakfast: '',
                    beforeLunch: '',
                    afterLunch: '',
                    beforeDinner: '',
                    afterDinner: 20.0,
                    beforeBed: '',
                }, {
                    date: '2020-02-09',
                    beforeDawn: '',
                    beforeBreakfast: 6.0,
                    afterBreakfast: 10.0,
                    beforeLunch: 8.0,
                    afterLunch: 10.0,
                    beforeDinner: '',
                    afterDinner: '',
                    beforeBed: '',
                }, {
                    date: '2020-02-18',
                    beforeDawn: '',
                    beforeBreakfast: '',
                    afterBreakfast: 3.0,
                    beforeLunch: '',
                    afterLunch: '',
                    beforeDinner: '',
                    afterDinner: 10,
                    beforeBed: '',
                }, {
                    date: '2020-02-19',
                    beforeDawn: '',
                    beforeBreakfast: 8.0,
                    afterBreakfast: '',
                    beforeLunch: '',
                    afterLunch: 12.0,
                    beforeDinner: '',
                    afterDinner: 2.0,
                    beforeBed: '',
                },
            ]
        };
    },
    computed: {
        ...mapState({
            patientLists:state=>state.patientLists
        }),   
    },
    created() {
        this.sugarLists.forEach((item,index)=>{
            this.timeLists.push(item.time)
            this.opinionData.push(item.value)
        })
    },
    mounted() {
        this.dealQuery();
        this.$nextTick(function() {
            this.drawLine('main')
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
        drawLine(id) {
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
                    data: this.timeLists,
                    axisLine: {
                        lineStyle: {
                        // 设置x轴颜色
                        color: '#ffffff'
                        }
                    },
                },
                yAxis: {
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
                    data: this.opinionData,
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
.seedata{
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
