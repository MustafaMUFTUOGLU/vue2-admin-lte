<template> 
<!-- <div>  -->

<!-- </div> -->
<div>
  <SvgPanZoom 
    style="width: 500px; height: 500px; border:1px solid black;" 
    :fit="false"
    :center="true"
    :controlIconsEnabled="true"
    :zoomEnabled="true"
    >
    <svg xmlns="http://www.w3.org/2000/svg" width="900px" height="900px"
    style="display: inline; width: inherit; min-width: inherit; max-width: inherit; height: inherit; min-height: inherit; max-height: inherit; " >
      <polygon :points="list"></polygon>
    </svg>  
    <svg slot="thumbnail">
      <polygon :points="list"></polygon>
    </svg>
  </SvgPanZoom>
</div>
</template>

<script>
import SvgPanZoom from 'vue-svg-pan-zoom'

export default {
  name: 'va-svgpanel',
  props: ['stats'],
  components: { SvgPanZoom },
  computed: {
    list: function () {
      return '100,20 169.28203230275508,59.99999999999999 169.2820323027551,140 100.00000000000001,180 30.717967697244916,140.00000000000003 30.717967697244873,60.00000000000006'
    }
  },
  created () {

  }

}
</script>

<style scoped>
polygon {
  fill: #42b983;
  opacity: 0.75;
}
</style>

