<template>
   <div class="dialog" v-if="isShow">
       <div class="content">
           <div class="box">

                <!-- <div class="inner-shadow"></div> -->
                <!-- <div class="box-con"> -->

                    <div class="title">
                        <div class="tit-con">
                            <span class="txt">{{title}}</span>
                            <img class="add-icon" src="./images/add.png" alt="" @click="addExtract" v-if="isAdd">
                        </div>
                        <span class="underline"></span>
                    </div>
                    <div class="main-box">
                        <slot  name="body-slot"></slot>
                    </div>
                <!-- </div> -->
           </div>
           <div class="close" @click="closeDialog">
               <img src="./images/close.png" alt="">
           </div>
       </div>
   </div>
</template>

<script>
   export default {
       data () {
           return {
               isShow:true
           }
       },
       props:{
           status:{
               type:Boolean,
               default:true
           },
           title:{
               type:String,
               default:'标题'
           },
           isAdd:{
               type:Boolean,
               default:false
           }
       },
       watch:{
           status(newval,oldval){
               this.isShow = this.status;
           }
       },
       methods:{
           closeDialog(){
            //    this.isShow = false;
               this.$emit('closeDialog',false)
           },
           addExtract(){
               this.$emit('addExtract')
           }
       },
       mounted(){
           this.isShow = this.status
       },
       components: {

       }
   }
</script>

<style lang="scss">
@import '@/assets/scss/rem.scss';
.dialog{
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.62);
    display: flex;
    justify-content: center;
    z-index:1002;
    .content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .inner-shadow{
            border-radius:rem(20);
            box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0.25rem 0.04167rem inset;
        }
        .box-con{
            position: relative;
        }
        .box{
            min-width: rem(800);
            // min-height: rem(500);
            min-height: rem(400);
            background:linear-gradient(0deg,rgba(64,60,97,1),rgba(81,77,113,1));
            // box-shadow:0px ren(10) rem(30) 0px rgba(16,15,24,0.2), 0px 0px 2px 0px rgba(230,227,255,1);
            border-radius:rem(20);
            // padding:rem(60);
            padding: rem(60) rem(60) 0 rem(60);
            box-sizing: border-box;
            max-height: 70%;
            // max-width: 50%;
            max-width: 100%;

            display: flex;
            flex-direction: column;
            position: relative;

            box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0.25rem 0.04167rem inset;

            .title{
                min-height: rem(56);
                display: flex;
                flex-direction: column;
                z-index: 1;
                .tit-con{
                    display: flex;
                    width: 100%;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: rem(10);
                }
                span{
                    display: inline-block;
                }
                .txt{
                    text-align: left;
                    // width: 100%;
                }
                .add-icon{
                    width:rem(56);
                    height:rem(56);
                }
            }
            .main-box{
                width: 100%;
                // height: calc(70% - 0.43rem);
                overflow: auto;
                min-height: calc(3.3rem - 0.43rem);
                // position: relative;
            }
        }   
        .close{
            margin-top: rem(31);
            cursor: pointer;
            img{
                width: rem(110);
                height: rem(110);
            }
        }
    }

    .underline{
        width: 100%;
        height: 2px;
        background:-webkit-linear-gradient(right, rgba(0,0,0,0.1) , rgba(255,255,255,0.6),rgba(0,0,0,0.1)); /* Safari 5.1 - 6.0 */
    }

    .slot-con{
        min-height: calc(3.3rem - 0.43rem);
        // position: relative;
        .gradient-mask{
            position: absolute;
            width: calc(100%);
            margin-left: rem(-60);
            height: rem(100);
            // background: red;
            background:linear-gradient(0deg,#403c61,rgba(255,255,255,0));
            bottom: 0;
            z-index: 10;
            border-bottom-left-radius: rem(20);
            border-bottom-right-radius: rem(20);
        }
        .form-con{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            min-height: calc(3.3rem - 0.43rem);
            .dialog-form{
                padding-top: rem(47);
                width: 100%;
                .form-item{
                    width: 100%;
                    display: flex;
                    .tit{
                        width: 20%;
                        height: rem(80);
                        line-height: rem(40);
                        display: flex;
                        align-items: center;
                        text-align: left;
                    }
                    .select-content{
                        display: flex;
                        width: 100%;
                        justify-content: flex-start;
                    }
                }

                .main-input{
                    display: flex;
                    .form-item{
                        width: 30% !important; 
                    }
                }

                
            }
            .dialog-form-rate{
                display: flex;
                padding-top: rem(40);

                .form-left{
                    width: rem(560);
                    margin-right: rem(180);
                }
                .form-right{
                    width: rem(560);
                }
                .question-item{
                    min-height: 10px;
                    display: flex;
                    flex-direction: column;
                    .title{
                        display: inline-block;
                        font-size: rem(24);
                        text-align: left;
                        width: 90%;
                        height: rem(28);
                        line-height: rem(28);
                    }
                    .desc{
                        display: inline-block;
                        color:rgba(255,255,255,1);
                        opacity:0.5;
                        font-size: rem(20);
                        text-align: left;
                        margin-top: rem(20);
                        width: 90%;

                    }
                    .choose-item{
                        display: flex;
                        margin-top: rem(30);
                        margin-bottom: rem(20);
                        flex-wrap: wrap;
                    }
                }
            }
            .dialog-form-2{
                display: flex;
                flex-wrap: wrap;
                width: rem(1080);
                padding-top: rem(47);
                justify-content: flex-start;
                // width: 100%;
                margin-bottom: rem(20);
                .form-item{
                    width: 33%;
                    display: flex;
                    margin-bottom: rem(40);
                    .tit{
                        width: 20%;
                        height: rem(80);
                        line-height: rem(25);
                        display: flex;
                        align-items: center;
                        text-align: left;
                    }
                }

                .main-input{
                    display: flex;
                    width: auto !important;
                    .form-item{
                        width: 30% !important; 
                    }
                }

            }

            .dialog-form-3{
                .form-item{
                    margin-bottom: rem(40);
                }

                .person-item{
                    margin-bottom: rem(40);
                    display: flex;
                    flex-direction: column;
                }
            }
            .dialog-operate{
                margin-top: rem(10);
                margin-bottom: rem(90);
                position: relative;
            }
        }
    }


    .checkbox-small{
        width:rem(128);
        line-height:rem(80);
        height:rem(80);
        margin-right:rem(40);
        
    }
    .checkbox-score{
        width:rem(100) !important;
        line-height:rem(70);
        height:rem(70);
        margin-right:rem(40);
        margin-bottom: rem(40);
    }
    .checkbox{
        font-size:rem(24);
        display:inline-block;
        color:#ffffff;
        text-align:center;
        border-radius:rem(10);
        cursor:pointer;
        position: relative;
        .inner-shadow{
            border-radius: rem(10) !important;
        }
    }
    .active{
        background:rgba(48,113,242,1);
        box-shadow:0px rem(5) rem(15) 0px rgba(19,23,30,0.1), 0px 0px 2px 0px rgba(255,255,255,1);
    }
    .unactive{
        background:rgba(96,96,128,0);
        box-shadow:0px rem(5) rem(15) 0px rgba(19,23,30,0.1), 0px 0px 2px 0px rgba(255,255,255,1);
    }

    .qrcode{
        width:rem(200);
        height:rem(200)
    }  


    .main-input-70{
        display: flex;
        .form-item{
            width: 100% !important; 
        }
    }


}
</style>
