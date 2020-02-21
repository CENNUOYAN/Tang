<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
/**
 * # todo
 * 封装websocket到vuex，以便供需要的页面进行调用
 * 
 * 
 */
export default {
    name: 'app',
    data(){
        return {
            path:"ws://192.168.0.200:8005/qrCodePage/ID=1/refreshTime=5",
            socket:""
        }
    },
    components: {

    },
    methods:{
        getBaseInfo(res){
            console.log('打印出来:::',res);
        },
        init: function () {
            if(typeof(WebSocket) === "undefined"){
                alert("您的浏览器不支持socket")
            }else{
                // 实例化socket
                this.socket = new WebSocket(this.path)
                // 监听socket连接
                this.socket.onopen = this.open
                // 监听socket错误信息
                this.socket.onerror = this.error
                // 监听socket消息
                this.socket.onmessage = this.getMessage
            }
        },
        open: function () {
            console.log("socket连接成功")
        },
        error: function () {
            console.log("连接错误")
        },
        getMessage: function (msg) {
            console.log(msg.data)
        },
        send: function () {
            this.socket.send(params)
        },
        close: function () {
            console.log("socket已经关闭")
        }
    },
    mounted(){
        // 初始化
        // this.init()

        window.getBaseInfo = function(res){
        //    this.getBaseInfo(res)
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/rem.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.inner-shadow{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    box-shadow: rgba(255, 255, 255, 0.1) 0px 0px rem(30) rem(5) inset;
}

/*修改滚动条样式*/
div::-webkit-scrollbar{
  width:5px;
  height:5px;
  position: absolute;
  /**/
}
div::-webkit-scrollbar-track{
//   background: rgb(239, 239, 239);
    background: rgba(0, 0, 0, 0.3);
    border-radius:2px;
}
div::-webkit-scrollbar-thumb{
//   background: #bfbfbf;
    background: rgba(0, 0, 0, 0.4);
    border-radius:10px;
}
div::-webkit-scrollbar-thumb:hover{
    background: #333;
}
div::-webkit-scrollbar-corner{
    background: #179a16;
}


.main-btn.el-button--primary {
     width: rem(400) !important;
    height: rem(80) !important;
}
.cusselect input.el-input__inner {
    font-size: rem(24);
    height: rem(80);
    line-height: rem(80);
    width: rem(233);
}

.cusselect-100 input.el-input__inner {
    font-size: rem(24);
    height: rem(80);
    line-height: rem(80);
    // width: rem(233);
     width: rem(513);
}

.main-input input.el-input__inner{
    font-size: rem(24);
    height: rem(80);
    line-height: rem(80);
    width: rem(233);
}

.main-input-100 input.el-input__inner{
    font-size: rem(24);
    height: rem(80);
    line-height: rem(80);
    width: rem(561);
}

.main-input-70 input.el-input__inner{
    font-size: rem(24);
    height: rem(80);
    line-height: rem(80);
}

.el-message{
  font-size: rem(24);
}

.main-picker input.el-input__inner{
    font-size: rem(24);
    height: rem(80);
    line-height: rem(80);
    width: rem(300);
}
</style>
