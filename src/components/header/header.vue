<template>
    <div class="header">
        <div class="bangs">
            <div class="bangs-left">
                <span class="logo-text" @click="goHome">LOGO</span>
                <span class="name">粤A 12345 广州市花都区北站路123号瑞华大厦7楼501</span>
                <span class="result">头晕-心血管疾病</span>
            </div>
            <div class="bangs-right">
                <img class="icon-record" src="./images/record.png" alt="" @click="goTimeaxis">
                <img class="icon-code" src="./images/qr_code.png" alt="" @click="opendialog">
            </div>
        </div>

        <cusdialog :title="title" :status="isDialog" @closeDialog="closeDialog">
            <div class="slot-con" slot="body-slot">
                <div class="form-con">
                    <div class="dialog-form dialog-form-3" >
                        <div>
                            <img class="qrcode" :src="qrcodeSrc"/>
                        </div>
                    </div>
                </div>
            </div>
        </cusdialog>

    </div>
</template>

<script>
import cusdialog from '@/components/dialog/index'
// var QRCode = require('qrcode')
import QRCode from 'qrcode'
export default {
    data() {
        return {
            titleLists:['请扫描二维码'],
            type:1,
            isDialog:false,
            title:'',
            bindForm:{          //腕带绑定表单数据
                number:''
            },
            qrcodeSrc:''

        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {
        goTimeaxis(){
            console.log('进入timeaxis');
            // this.$router.push('timeaxis')
            this.$router.push('minitimeaxis')
            
        },
        goHome(){
            this.$router.push({
                name:'home'
            })
        },
        opendialog(){
            this.title = this.titleLists[this.type-1];
            this.isDialog = true;
            this.bindForm.number = '';
            this.makeQrcode();
        },
        closeDialog(value){
            this.isDialog = value;
        },
        makeQrcode(){
            // var canvas = document.getElementById('canvas')

            // QRCode.toCanvas(canvas, 'sample text', function (error) {
            //     if (error) console.error(error)
            //     console.log('success!');
            // })

            QRCode.toDataURL('I am a pony!')
                .then(url => {
                    console.log('图片：',url)
                    this.qrcodeSrc = url;
                })
                .catch(err => {
                    console.error('二维码生成错误：',err)
                })
        }
    },
    components: {
        cusdialog
    },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/rem.scss';
.header{
    font-size:rem(24);
    .bangs{
        background:linear-gradient(0deg,rgba(64,61,81,1),rgba(35,32,52,1));
        box-shadow:0px 0px 2px 0px rgba(227, 255, 222, 0.35);
        // border-radius:0px 0px 80px 80px;
        border-bottom-left-radius: rem(80);
        border-bottom-right-radius: rem(80);
        width: 100%;
        height: rem(100);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: rem(79);
        padding-right: rem(79);
        box-sizing: border-box;
        .bangs-left{
            display: flex;
            align-items: center;
            justify-content: flex-start;
            font-size: rem(24);
            height: rem(100);
            line-height: rem(100);
            .logo-text{
                font-weight: bold;
                cursor: pointer;
            }
            .name{
                margin-left: rem(41);
            }
            .result{
                margin-left: rem(80);
            }
        }
        .bangs-right{
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .icon-code{
                margin-left: rem(54);
                cursor: pointer;

            }
            .icon-record{
                cursor: pointer;
            }
        }
    }
}
</style>
