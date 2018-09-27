<style lang="stylus" scoped>
.particles
  position fixed
  top 0
  bottom 0
  right 0
  left 0
  z-index 0
  .wrapper
    z-index 100
</style>

<template>
  <div id="particles"
       class="particles"
       :style="{backgroundColor:bgColor}">
    <router-view class="wrapper"></router-view>
  </div>
</template>

<script>
import 'particles.js'
import defaultConfig from './config.js'

export default {
  name: 'Particles',
  props: {
    bgColor: {
      type: String,
      default: '#3498DB'
    },
    config: {
      type: Object,
      default: () => {
        return defaultConfig
      }
    }
  },
  mounted() {
    window.particlesJS('particles', this.config, () => {
      console.log('particles created!')
    })
  }
}
</script>
