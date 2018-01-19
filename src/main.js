import Vue from 'vue'
import App from './App.vue'

import WechatShare from 'johnny-wechat-share'
import ImageShare from "./assets/img/end_screen.png"
let option={}
option.api='http://h5.2smart.cn/wechat/js/'
let url = "http://h5.2smart.cn/2018/kaleidoscope/"
let img = url + 'img/end_screen.png'
option.shareData={
  appmessage: {
    title: "万花筒",//好友分享标题
    desc: "上传任意图片你可以看到不一样的效果",//好友分享描述
    img_url: img,//好友分享图片
    link: url //好友分享链接
  }, timeline: {
    title: "万花筒test",//朋友圈分享标题
    img_url: img,//朋友圈分享图片
    link: url//朋友圈分享链接
  }
}
let shareURL = document.location.href;
window.WECHAT_SHARE = new WechatShare(encodeURIComponent(shareURL), option);
new Vue({
  el: '#app',
  render: h => h(App)
})
