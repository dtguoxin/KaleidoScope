<template>

  <canvas ref="canvas">

  </canvas>


</template>

<script>
  import JohnnyUtils from 'johnny-utils'
  import SmartLoader from 'smart-loader'

  const TWO_PI = Math.PI * 2
  const HALF_PI = Math.PI / 2
  let IV = 0

  export default {
    name: "kaleido-scope",
    props: {
      options: {
        type: Object,
        default: function () {
          return {}
        }
      },
      images: {
        type: Array,
        default: []
      }

    },
    data: function () {
      return {_option: {}, canvas: null, context: null, img: [], tx: 0, ty: 0, tr: 0}
    },


    methods: {
      reset: function () {

        let self = this;
        let loader = new SmartLoader()
        self.img = []
        for (let i = 0; i < self.images.length; i++) {
          self.img.push(loader.addImage([self.images[i]]))
        }

        loader.addCompletionListener(function () {
          self.update()
          console.log('loaded')
        });
        loader.start();


      },

      draw: function () {
        let self = this;
        self.canvas.width = self.canvas.height = self._option.radius * 2


        let img
        for (let index = 0; index < self._option.slices; index++) {
          img = self.img[index % self.img.length];

          self.context.fillStyle = self.context.createPattern(img, 'repeat')
          let scale = self._option.zoom * (self._option.radius / Math.min(img.width, img.height))
          let step = TWO_PI / self._option.slices
          let cx = img.width / 2

          self.context.save()
          self.context.translate(self._option.radius, self._option.radius)
          self.context.rotate(index * step)

          self.context.beginPath()
          self.context.moveTo(-0.5, -0.5)
          self.context.arc(0, 0, self._option.radius, step * -0.51, step * 0.51)
          self.context.lineTo(0.5, 0.5)
          self.context.closePath()

          self.context.rotate(HALF_PI)
          self.context.scale(scale, scale)
          self.context.scale([-1, 1][index % 2], 1)
          self.context.translate(self._option.offsetX - cx, self._option.offsetY)
          self.context.rotate(self._option.offsetRotation)
          self.context.scale(self._option.offsetScale, self._option.offsetScale)

          self.context.fill()
          self.context.restore()
        }
      },
      move: function (x, y) {

        let cx = this.canvas.width / 2
        let cy = this.canvas.height / 2

        let dx = x / this.canvas.width
        let dy = y / this.canvas.height

        let hx = dx - 0.5
        let hy = dy - 0.5

        this.tx = hx * this._option.radius * -2
        this.ty = hy * this._option.radius * 2
        this.tr = Math.atan2(hy, hx)

      },
      update: function () {
        let delta = this.tr - this._option.offsetRotation
        let theta = Math.atan2(Math.sin(delta), Math.cos(delta))

        this._option.offsetX += (this.tx - this._option.offsetX) * this._option.ease
        this._option.offsetY += (this.ty - this._option.offsetY) * this._option.ease
        this._option.offsetRotation += (theta - this._option.offsetRotation) * this._option.ease

        this.draw()
        IV = setTimeout(this.update, 1000 / 20)
      }
    }
    ,
    mounted: function () {

      let self = this;
      self.canvas = this.$refs.canvas;
      self.context = self.$refs.canvas.getContext('2d');
      self._option = JohnnyUtils.extend(self.option, {
        offsetRotation: 0.0,
        offsetScale: 1.0,
        offsetX: 0.0,
        offsetY: 0.0,
        radius: 260,
        slices: 12,
        zoom: 1.0,
        ease: 0.1
      })
      self.tx = self._option.offsetX;
      self.ty = self._option.offsetY;
      self.tr = self._option.offsetRotation;


    }


  }
</script>

<style scoped>

</style>
