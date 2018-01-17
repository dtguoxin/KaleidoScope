import Vue from 'vue'
import App from './App.vue'

import WechatShare from 'johnny-wechat-share'
let option={}
option.api='http://h5.2smart.cn/wechat/js/'
option.shareData={
  appmessage: {
    title: "",//好友分享标题
    desc: "",//好友分享描述
    img: "",//好友分享图片
    link: "" //好友分享链接
  }, timeline: {
    title: "",//朋友圈分享标题
    img: "",//朋友圈分享图片
    link: ""//朋友圈分享链接
  }
}
Vue.prototype.WECHAT_SHARE= new WechatShare('http://h5.2smart.cn',option);
new Vue({
  el: '#app',
  render: h => h(App)
})
