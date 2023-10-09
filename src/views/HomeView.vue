<script>
import DOMOverlayComponent from '../components/DOMOverlayComponent.vue';
import { createScene } from '../scripts/xrScene.js'

export default {
  name: "HomeView",
  components: {
    DOMOverlayComponent
  },
  data() {
    return {
      webXRApp: null,
      showOverlay: false
    }
  },
  mounted() {
    if(navigator.xr) {
      this.webXRApp = createScene(this.$refs.renderCanvas, this.$refs.domOverlay);

      window.addEventListener('enter-xr', () => {
        this.showOverlay = true;
      });
    }
  }
}
</script>

<template>
  <main class="w-full h-full">
    <canvas id="renderCanvas" ref="renderCanvas" class="w-full h-full"></canvas>
    <div v-show="this.showOverlay">
      <DOMOverlayComponent ref="domOverlay"></DOMOverlayComponent>
    </div>  
  </main>
</template>
