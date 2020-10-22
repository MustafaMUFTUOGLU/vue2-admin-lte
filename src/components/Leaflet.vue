<template> 
<div class="box">
  <div class="box-header with-border">
    <h3 class="box-title">{{ this.$route.params.id }} / {{ filteredBeacon }}</h3> 
    <button @click="test">t5est</button>
    <!-- /.box-tools -->
  </div>
  
   <!-- /.box-header -->
  <div class="box-body">
    <!-- <SvgPanZoom 
      :fit="false"
      :center="true"
      :zoomEnabled="true"
      @svgpanzoom="registerSvgPanZoom"
      >
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" >
      <g v-html="deneme">
      </g>
    </svg>
    </SvgPanZoom> -->
    <l-map 
      ref="map"
      :min-zoom="minZoom"
      :crs="crs"
      style="height: 600px; width: 1200px"
    >
      <l-image-overlay :url="'/static/plane/' + url" :bounds="bounds" />
      <l-marker v-for="star in stars" :key="star.name" :lat-lng="star">
        <l-popup :content="star.name" />
      </l-marker>
      <l-polyline :lat-lngs="travel" />
    </l-map>
  </div>
</div>
</template>

<script>
import { CRS, Icon } from 'leaflet'
import { LMap, LImageOverlay, LMarker, LPopup, LPolyline } from 'vue2-leaflet'
import { mapGetters, mapActions } from 'vuex'
import socketio from '../socketio'
import expressServer from '../expressServer'
import plain from '../vuex/api/services/plain'

delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  name: 'va-svgpanel',
  components: {
    LMap,
    LImageOverlay,
    LMarker,
    LPopup,
    LPolyline,
    mapGetters,
    mapActions,
    socketio,
    plain
  },
  data () {
    return {
      bolgesvg: null,
      deneme: null,
      url: null,
      bounds: [
        [0, 0],
        [100, 100]
      ],
      minZoom: 1,
      crs: CRS.Simple,
      stars: [
        { name: 'Sol', lng: 175.2, lat: 145.0 },
        { name: 'Mizar', lng: 41.6, lat: 130.1 },
        { name: 'Krueger-Z', lng: 5, lat: 56.5 },
        { name: 'Deneb', lng: 218.7, lat: 8.3 }
      ],
      travel: [
        [0, 0],
        [50, 50]
      ]
    }
  },
  props: {},
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
    expressServer.getHarita(to.params.id)
    .then((response) => {
      // var tmpbound = null
      if (to.params.bolge) {
        console.log(to.params.bolge)
        expressServer.getBound(to.params.id, to.params.bolge)
        .then((response) => {
          console.log(response.data)
          // tmpbound = response.data
        })
        .catch((error) => {
          console.error(error)
        })
      }
      // this.deneme = response.data[0].svg
      // this.setPlainList(response.data)
      // next()
      next(vm => {
        vm.setPlainList(response.data)
        // vm.setBounds(tmpbound)
      })
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
    expressServer.getHarita(to.params.id)
    .then((response) => {
      // this.deneme = response.data[0].svg
      this.setPlainList(response.data)

      if (to.params.bolge) {
        console.log(to.params.bolge)
        expressServer.getBound(to.params.id, to.params.bolge)
        .then((response) => {
          console.log(response.data)
          this.setBounds(response.data)
        })
        .catch((error) => {
          console.error(error)
        })
      }
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
      this.url = list
      // if (!this.svgpanzoom) return
      // console.log(this.svgpanzoom.getSizes())
      // this.svgpanzoom.updateBBox()
      // this.svgpanzoom.center()
    },
    registerSvgPanZoom (svgpanzoom) {
      // console.log('--->', svgpanzoom)
      // this.svgpanzoom = svgpanzoom
    },
    zoomUpdate (zoom) {
      this.currentZoom = zoom
    },
    centerUpdate (center) {
      this.currentCenter = center
    },
    showLongText () {
      this.showParagraph = !this.showParagraph
    },
    innerClick () {
      alert('Click!')
    },
    setBounds (bounds) {
      this.$refs.map.fitBounds(bounds)
    },
    test () {
      console.log(this.$refs.map.fitBounds([[5, 10], [50, 100]]))
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

