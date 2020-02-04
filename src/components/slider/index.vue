<template>
   <div class="slider">
       <span class="num">{{min}}</span>
       <div class="slider-con">
        <el-slider v-model="value" :min="min" :max="max"></el-slider>
       </div>
       <span class="num">{{max}}</span>
   </div>
</template>

<script>
   export default {
       data () {
           return {
               value:null,
           }
       },
       props:{
           min:{
               type:Number,
               default:0
           },
           max:{
               type:Number,
               default:200
           },
           num:{
               type:Number,
               default:null
           },
           index:{
               type:Number,
               default:0
           }
       },
       watch:{
           num(newval,oldval){
               if(window.isNaN(this.num)){
                   this.value = null;
               }
               else{
                   this.value = this.num;
               }
               console.log('变化的num:',this.value,this.num);
               
           },
           value(newval,oldval){
               if(this.num == null && this.value == 0){
                   console.log('value变化了',this.num);
                   this.$emit('updateVal',null,this.index)
               }
               else{
                   this.$emit('updateVal',this.value,this.index)
               }
           }
       },
       mounted(){
        //    if(this.num){
        //        }
            this.value = this.num;
            console.log('slider::',this.value,this.num);
           
       },
       components: {

       }
   }
</script>

<style lang="scss">
@import '@/assets/scss/rem.scss';
.slider{
    display: flex;
    // width: 100%;
    align-items: center;
    width: rem(266);

    .num{
        font-size: rem(20);
        color:rgba(255,255,255,1);
        opacity:0.5;
    }
    .slider-con{
        // width: rem(246);
        margin-left: rem(15);
        margin-right: rem(15);
        width: 100%;
    }
}

</style>
