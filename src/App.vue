<template>
  <div id="app" ontouchmove='event.preventDefault();'>
    <kaleido-scope ref="scope" :images="images" style="width: 100%;margin-top: 60px"></kaleido-scope>

    <vue-smart-upload ref="upload"
                      :class="['btn', 'btn-primary']"
                      :crop="false"
                      @imageuploaded="imageuploaded" @imagechanged="imagechanged" @errorhandle="errorhandle"
                      :data="{}"
                      :max-file-size="524288000" :is-xhr="false"
                      url="" >
      <div style="color: #f0f0f0;border: 1px solid #ccc;padding: 10px;margin:50px auto 10px auto;width: 200px">
        Upload
      </div>

    </vue-smart-upload>

    <vue-view-blocker></vue-view-blocker>
  </div>
</template>

<script>
  import fastclick from 'fastclick'

  import KaleidoScope from './components/KaleidoScope'
  import SmartQuaternion from 'smart-quaternion'
  import VueViewBlocker from 'vue-view-blocker'
  import VueSmartUpload  from 'vue-smart-upload';
  export default {
    name: 'app',
    data() {
      return {deg: {x: 0, y: 0, z: 0},images:[]}
    },
    methods: {
      clickMe: function () {
        this.count += 1;
      },
      mousemove: function (e) {

        // this.move(e.pageX, e.pageY)

      },
      touchmove: function (e) {

        //  this.move(e.touches[0].pageX, e.touches[0].pageY)

      },
      imagechanged:function (d) {
        let self=this;
        this.$refs.upload.getFileBase64(function (code) {
          self.images.push(code)
          self.$refs.scope.reset()

        })
        // console.log(d)

      },
      errorhandle:function (msg) {
        console.log(msg)
      },

      imageuploaded(res) {

      }
    },
    mounted: function () {
      fastclick.attach(this.$el)
      var self = this;
      var diplayEulerDiff = function (deg) {
        self.deg = deg
        self.$refs.scope.move(deg.x * 60, deg.y * 60)
      }

      var initqa;

      if (window.DeviceOrientationEvent) {
        function orientationHandler(e) {
          var qa = new SmartQuaternion()
          qa.alphaBetaGamma(e.alpha, e.beta, e.gamma);
          if (!initqa) {
            initqa = qa;
          }
          var def = initqa.difference(qa);
          var deg = def.rad2deg();
          diplayEulerDiff(deg)

        }

        window.addEventListener("deviceorientation", orientationHandler, false);
      }


    },
    components: {KaleidoScope,VueViewBlocker,VueSmartUpload}

  }
</script>

<style lang="scss">
  @import "assets/css/base.css";
  @import "assets/css/mobile_h5.css";

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #000;
  }
</style>
