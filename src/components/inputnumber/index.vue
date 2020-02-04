<template>
   <div class="inputnumber">
       <img class="icon" src="./images/less.png" @click="goLess"/>
       <input v-model="number" class="number" type="number">
       <span class="unit">{{unit?unit:'C'}}</span>
       <img class="icon" src="./images/add.png" @click="goAdd"/>
   </div>
</template>

<script>
   export default {
       data () {
            return {
               number:null,
            }
       },
       props:{
            unit:{
               type:String,
               default:''
            },
            value:{
               type:Number,
               default:null
            },
            min:{
               type:Number,
               default:0.0
            },
            max:{
               type:Number,
               default:200
            },
            index:{
                type:Number,
                default:0
            }
       },
       methods:{
           goLess(){
               if(this.number > this.min){
                   this.number = (this.number*10 - 1)/10;
                //    console.log('this.number',this.number);
                   
               }
               else{
                   this.number = this.min
               }
           },
           goAdd(){

               if(this.number < this.max){
                   this.number = (this.number*10 + 1)/10;
               }
               else{
                   this.number = this.max;
               }
           }
       },
       components: {
           
       },
       watch:{
           number(oldval,newval){
               this.$emit('getNumber',parseFloat(this.number),this.index);
           },
           value(oldval){
               this.number = this.value;
           }

       },
       mounted(){
           if(this.value){
               this.number = this.value;
           }
           console.log('max:',this.max,this.min,this.number);
           
       }
   }
</script>

<style lang="scss">
@import '@/assets/scss/rem.scss';
.inputnumber{
    display: flex;
    align-items: center;
    .icon{
        display: inline-block;
        width:rem(56);
        height: rem(56);
        cursor: pointer;
    }
    .number{
        background:rgba(96,96,128,0.8);
        box-shadow:0px 0px rem(2) 0px rgba(255,255,255,1);
        border-radius:rem(10);
        height: rem(60);
        line-height: rem(60);
        width:rem(100);
        margin-left: rem(17);
        text-align: center;
        color: #ffffff;
        margin-right: rem(11);
    }
    .unit{
        display: inline-block;
        margin-right: rem(17);
        color: #ffffff;
        opacity: 0.5;
        font-size: rem(24);
    }
}
</style>
