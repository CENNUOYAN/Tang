<template>
    <div class="dyanmicform" ref="dynamicform">
        <div class="con-item" v-for="(item,index) in formLists" :key="index">
            <!-- 文本框3 -->
            <div class="item" v-if="item.type==3">
                <div class="item-title">{{item.name}}</div>
                <div class="con">
                    <span class="value">
                        <inputnumber :index="index" @getNumber="getNumber" :value="item.value" :unit="item.unit"></inputnumber>
                    </span>
                    <span class="value-slider">
                        <cusslider :index="index" :num="item.value" @updateVal="updateVal"></cusslider>
                    </span>
                </div>
            </div>

            <!-- 区间范围4 -->

            <!-- 文本标签（数字+文本）5 -->
            <div class="item" v-if="item.type==5">
                <div class="item-title">{{item.name}}</div>
                <div class="con">
                    <span class="value">
                        <inputnumber :index="index" @getNumber="getNumber" :value="item.value" :unit="item.unit"></inputnumber>
                    </span>
                    <span class="value-slider">
                        <cusslider :index="index" :num="item.value" @updateVal="updateVal"></cusslider>
                    </span>

                    <span class="unit-item">
                        <span class="unit-side">左</span>
                        <el-input class="main-input" v-model="item.value2" placeholder="请输入"></el-input>
                        <span class="unit-side">右</span>
                    </span>
                </div>
            </div>

            <!-- 文本标签（文本+文本）5 -->
            <div class="item" v-if="item.type==5">
                <div class="item-title">{{item.name}}</div>
                <div class="con">
                   <span class="unit-item">
                        <span class="unit-side">左</span>
                        <el-input class="main-input" v-model="item.value" placeholder="请输入"></el-input>
                        <span class="unit-side">右</span>
                    </span>

                    <span class="unit-item">
                        <span class="unit-side">左</span>
                        <el-input class="main-input" v-model="item.value" placeholder="请输入"></el-input>
                        <span class="unit-side">右</span>
                    </span>
                </div>
            </div>

            <!-- 时间类型6 -->
            <div class="item" v-if="item.type==6">
                <div class="item-title">
                    {{item.name}}
                </div>
                <div class="con">
                    <el-date-picker
                        class="main-picker"
                        v-model="item.value"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </div>
            </div>

            <!-- 复选框2 -->
            <div class="item" v-if="item.type==2">
                <!-- <div class="item-title">
                </div> -->
                <div class="con" 
                    v-for="(itt,ind) in item.data" :key="ind">
                    <span :class="'checkbox checkbox-small '+(item.value.includes(itt.id)==true?'active':'unactive')"
                        @click="choose(item,itt)"
                        >
                        <div class="inner-shadow"></div>
                        {{itt.name}}
                    </span>
                </div>
            </div>

            <!-- 单选框1 -->
            <div class="item" v-if="item.type==1">
                <!-- <div class="item-title">
                </div> -->
                <div class="con"
                    v-for="(itt,ind) in item.data" :key="ind"
                    >
                    <span :class="'checkbox checkbox-small '+(item.value==itt.id?'active':'unactive')"
                        @click="choose(item,itt)"
                        >
                        <div class="inner-shadow"></div>
                        {{itt.name}}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/**
 * 动态表单组件
 * formLists结构：
 * 
 * item_type（1:单选框、2:复选框、3:文本框、4:区间范围 5:文本标签 6:时间类型）
 * weight：排列顺序（纯数字，123456）
 * situate：位于（只有需要输入文本时才有）（1:前 2:后）
 * 
 * 1:单选框
 * {itemId:100}
 * 
 * 2:复选框
 * {itemId:100},{itemId:1000},{itemId:3000}
 * 
 * 3:文本框
 * {itemId:100,value:'输入'}
 * 
 * 4:区间范围
 * {itemId:100,min:'10',max:'12'}
 * 
 * 5:文本标签：顺序根据weight字段
 * {itemId:100,values:[100,200]}
 * 
 * 6:时间类型
 * {itemId:100,start:'2019-11-12',end:'2019-12-12'}
 * 
 */
import inputnumber from '@/components/inputnumber/index';
import cusslider from '@/components/slider/index';
export default {
    data(){
        return {
            // formLists:
            // [
            //     {
            //         id:1,
            //         value:null,
            //         unit:'',
            //         type:1,
            //         name:'指标1'
            //     },
            //     {
            //         id:2,
            //         value:null,
            //         unit:'',
            //         type:1,
            //         name:'指标2'
            //     },
            //     {
            //         id:3,
            //         value:null,
            //         unit:'',
            //         type:6,
            //         name:'复苏开始时间'
            //     },
            //     {
            //         id:4,
            //         value:null,
            //         unit:'',
            //         type:6,
            //         name:'复苏结束时间'
            //     },
            //     {
            //         id:5,
            //         value:[100,200],
            //         unit:'',
            //         type:3,
            //         name:'多选',
            //         data:[
            //             {
            //                 id:100,
            //                 name:'多选1'
            //             },
            //             {
            //                 id:200,
            //                 name:'多选2'
            //             },
            //             {
            //                 id:600,
            //                 name:'多选3'
            //             }
            //         ]

            //     },
            //     {
            //         id:7,
            //         value:null,
            //         unit:'',
            //         type:4,
            //         name:'单选',
            //         data:[
            //             {
            //                 id:300,
            //                 name:'单选1'
            //             },
            //             {
            //                 id:400,
            //                 name:'单选2'
            //             }
            //         ]
            //     }
            // ]
        }
    },
    props:{
        formLists:Array,
    },
    watch:{
        formLists:{
            handler: function(val, olVal){
                // formLists = val
                console.log('我变化了::',this.formLists)
                this.$emit('updateFormLists',this.formLists)
            },
            deep: true
        }
    },
    computed:{

    },
    methods:{
        getNumber(val,index){
            this.formLists[index].value = val
        },
        updateVal(val,index){
            this.formLists[index].value = val
        },
        choose(item,item2){
            console.log('选择了',item);
            if(item.type==2){
                this.formLists.forEach((itt,ind)=>{
                    if(itt.type==2){
                        // 多选
                        this.formLists[ind].data.forEach((its,ids)=>{
                            console.log('dddddddddddd');
                            if(item2.id == its.id){
                                var value = this.formLists[ind].value
                                if(value && value.length==0){
                                    this.formLists[ind].value.push(item2.id)
                                }
                                else{
                                    var isHash = value.filter(items=>items==item2.id)
                                    if(isHash && isHash.length>0){
                                        var currIndex = value.indexOf(isHash[0])
                                        value.splice(currIndex,1)
                                        this.formLists[ind].value = value
                                    }
                                    else{
                                        this.formLists[ind].value.push(item2.id)
                                    }
                                }
                            }
                        })
                    }
                })
            }
            else if(item.type==1){
                // 单选
                this.formLists.forEach((itt,ind)=>{
                    if(itt.type==1){
                        if(itt.id == item.id){
                            if(this.formLists[ind].value == item2.id){
                                this.formLists[ind].value = ''
                            }
                            else{
                                this.formLists[ind].value = item2.id
                            }
                        }
                    }
                })
            }
        }
    },
    mounted(){
    },
    components:{
        inputnumber,
        cusslider
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/rem.scss';
.dyanmicform{
    width: 100%;
    .con-item{
        margin-top: rem(20);
        margin-bottom: rem(30);
    }   
    .item{
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: rem(40);
        // justify-content: center;
        .item-title{
            width: 25%;
            margin-right: rem(40);
            text-align: right;
            min-height: rem(1);
        }
    }
    .con{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
       
    }

    .unit-item{
        display: flex;
        align-items: center;
        margin-top: rem(20);
        .unit-side{
            margin-left: rem(10);
            margin-right: rem(10);
        }
    }
}
</style>