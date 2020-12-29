<template> 
<div class="box">
  <div class="box-header with-border">
    <h3 class="box-title">{{ this.$route.params.id }} / {{ filteredBeacon }}</h3> 
    <!-- /.box-tools -->
  </div>
  
   <!-- /.box-header -->
  <div class="box-body">
    <SvgPanZoom 
      :fit="false"
      :center="true"
      :zoomEnabled="true"
      @svgpanzoom="registerSvgPanZoom"
      >
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" >
      <!-- <g>
      <rect width="100%" height="100%" fill="green" />
      <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
      </g> -->
      <g v-html="deneme">
      </g>
      <!-- <g>
        <circle r="20" v-for="ii in filteredBeacon" :key="ii.id" :cx="ii.x" :cy="ii.y" class="circle"/>
      </g> -->
    </svg>
    
    </SvgPanZoom>
  </div>
</div>
</template>

<script>
import SvgPanZoom from 'vue-svg-pan-zoom'
import { mapGetters, mapActions } from 'vuex'
import socketio from '../socketio'
import expressServer from '../expressServer'
import plain from '../vuex/api/services/plain'

export default {
  name: 'va-svgpanel',
  data () {
    return {
      bolgesvg: null,
      deneme: null,
      svgpanzoom: null
    }
  },
  props: {},
  components: { SvgPanZoom, mapGetters, mapActions, socketio, plain },
  computed: {
    ...mapGetters([
      'getBeaconsList'
    ]),
    filteredBeacon: function () {
      var dddd = this.$route.params.id
      var ddd = this.$store.getters.getBeaconsList.filter(function (bolge) {
        return bolge.Bolge.BolgeAdi.replace(/\s/g, '') === dddd
      })
      var beac = ddd.pop()
      if (beac) {
        if (typeof beac.Beacons !== 'undefined') {
          return beac.Beacons
        } else {
          return []
        }
      } else {
        return []
      }
    }
  },
  created () {
    // socketio.start()
    // plain.getAll(this.$route.params.id)
    // .then((response) => {
    //   this.deneme = response.data[0].svg
    //   // setPlainList(response.data[0])
    // })
    // .catch((error) => {
    //   console.error(error)
    // })
    // this.fetchPlane('Kat1')
  },
  beforeDestroy () {
    // socketio.stop()
  },
  beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter : ', to.params, from.params)
    expressServer.getMap(to.params.id)
    .then((response) => {
      // this.deneme = response.data[0].svg
      // this.setPlainList(response.data)
      // next()
      next(vm => vm.setPlainList(response.data))
    })
    .catch((error) => {
      console.error(error)
    })
    // plain.getAll(to.params.id)
    // .then((response) => {
    //   console.log('aa: ', response.data)
    //   // this.deneme = response.data[0].svg
    //   next(vm => vm.setPlainList(response.data[0]))
    // })
    // .catch((error) => {
    //   console.error(error)
    // })
  },
  beforeRouteUpdate (to, from, next) {
    console.log('beforeRouteUpdate : ', to.params, from.params)
    expressServer.getMap(to.params.id)
    .then((response) => {
      // this.deneme = response.data[0].svg
      this.setPlainList(response.data)
      next()
      // next(vm => vm.setPlainList(response.data))
    })
    .catch((error) => {
      console.error(error)
    })
    // plain.getAll(to.params.id)
    // .then((response) => {
    //   console.log('bb: ', response.data)
    //   // this.deneme = response.data[0].svg
    //   this.setPlainList(response.data[0])
    //   next()
    // })
    // .catch((error) => {
    //   console.error(error)
    // })
  },
  beforeRouteLeave (to, from, next) {
    console.log('beforeRouteLeave : ', to.params, from.params)
    next()
  },
  methods: {
    ...mapActions([
      'fetchPlane'
    ]),
    setPlainList (list) {
      this.deneme = list
      if (!this.svgpanzoom) return
      console.log(this.svgpanzoom.getSizes())
      this.svgpanzoom.updateBBox()
      this.svgpanzoom.center()
    },
    registerSvgPanZoom (svgpanzoom) {
      console.log('--->', svgpanzoom)
      this.svgpanzoom = svgpanzoom
    }
  }
}
</script>

<style scoped>
polygon {
  fill: #42b983;
  opacity: 0.75;
}
.circle {
  fill:#42b983;
  stroke:#aaaaaa;
  stroke-width: .25px;
  stroke-miterlimit:10;
}
</style>

