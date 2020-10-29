<template> 
  <div class="row">
    <div class="col-md-12">
      <!-- TABLE: LATEST ORDERS -->
      <div class="box box-info direct-chat direct-chat-warning">
        <div class="box-header with-border">
          <h3 class="box-title pull-right">{{ this.$route.params.id }} / {{ filteredBeacon }}</h3>
          <div class="box-tools pull-left">
            <div class="has-feedback">
              <!-- <input type="text" class="form-control input-sm" placeholder="Personel Ara" @input="addEvent" @change="addEvent" >  -->
              <button type="button" class="btn btn-box-tool" data-toggle="tooltip" title="" @click="displaySearchBar()" data-original-title="Contacts">
                      <i class="fa fa-search"></i></button>
            </div>
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body"  :class="{'personel-search-bar-open': visibleSearchBar}">
          <div class="my-map-class deneme" style="height: auto;">
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
              :max-zoom="maxZoom"
              :zoom="zoom"
              :crs="crs"
              :center="center"
              style="height: 600px; width: 100%"
              @ready="doSomethingOnReady()"
            >
              <l-control-fullscreen position="topleft"
                :options="{ title: { 'false': 'Go big!', 'true': 'Be regular' } }" />
              <l-control-layers position="topright" ></l-control-layers>
              <!-- <v-axesgrid :options="opts"/> -->
              <l-control-scale position="topright" :imperial="false" :metric="true"></l-control-scale>
              <!-- <l-tile-layer url="/static/tiles/{z}/{x}/{y}.png"></l-tile-layer> -->
              <l-image-overlay :url="'/static/plane/' + url" :bounds="bounds">
              </l-image-overlay>

              <l-layer-group>
                <l-layer-group layer-type="overlay" name="Nodes" :visible="true">
                  <l-marker v-for="basestation in basestationsFiltered" :key="basestation.Adi" :lat-lng="[basestation.Y, basestation.X]">
                    <l-popup :content="basestation.Adi" />
                  </l-marker>
                </l-layer-group>

                <!-- <l-marker v-for="gateway in gateways" :icon="gatewayIcon" :key="gateway.Adi" :lat-lng="setCoordinat(gateway.X, gateway.Y)">
                  <l-popup :content="gateway.Adi" />
                </l-marker>  -->

                <l-layer-group layer-type="overlay" name="Base Station" :visible="true">
                  <l-marker :icon="gatewayIcon" :lat-lng="asd">
                  </l-marker>
                </l-layer-group>
              </l-layer-group>
              <!-- <l-polyline :lat-lngs="travel" /> -->
            </l-map>
          </div>
          <div class="personel-search-bar deneme">
            <div class="sidebar-form">
              <div class="input-group">
                <input type="text" name="q" class="form-control" placeholder="Personel adı" @input="addEvent" @change="addEvent">
                <span class="input-group-btn">
                      <div class="btn">
                        <i class="fa fa-search"></i>
                      </div>
                    </span>
              </div>
            </div>
            
            <ul class="contacts-list"> 
              <li v-for="basestation in basestationsFiltered" :key="basestation.Adi">
                <div style="btn" @click="focusMaker(basestation)">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=" class="contacts-list-img" style="width: 20px;"> 
                  <div class="contacts-list-info" style="margin-left: 25px;">
                    <span class="contacts-list-name"> {{basestation.Adi}}</span>
                    <span class="contacts-list-msg">How have you been? I was...</span>
                  </div>
                </div>
              </li> 
              </ul>
          </div>
        </div>
        <!-- /.box-body -->
      </div>
    </div>
  </div>
</template>

<script>
import { CRS, Icon } from 'leaflet'
import {
  LMap,
  LImageOverlay,
  LMarker,
  LPopup,
  LPolyline,
  LTileLayer,
  LControlLayers,
  LControlScale,
  LLayerGroup
} from 'vue2-leaflet'
import LControlFullscreen from 'vue2-leaflet-fullscreen'
// import Vue2LeafletAxesGrid from 'vue2-leaflet-axesgrid'
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
    LTileLayer,
    LControlLayers,
    LControlFullscreen,
    // 'v-axesgrid': Vue2LeafletAxesGrid,
    LControlScale,
    LLayerGroup,
    mapGetters,
    mapActions,
    socketio,
    plain
  },
  data () {
    return {
      asd: [50, 100],
      gatewayIcon: L.icon({
        iconUrl: '/static/img/marker-icon.png',
        shadowUrl: '/static/img/marker-shadow.png',
        iconSize: [25, 41],
        shadowSize: [41, 41],
        iconAnchor: [12, 41]
      }),
      visibleSearchBar: false,
      basestations: null,
      basestationsFiltered: null,
      map: null,
      bolgesvg: null,
      deneme: null,
      url: null,
      bounds: [
        [0, 0],
        [1000, 1000]
      ],
      center: [0, 0],
      minZoom: -1,
      maxZoom: 5,
      zoom: -1,
      crs: CRS.Simple,
      stars: [],
      // travel: [
      //   latLng(0, 0),
      //   latLng(50, 50)
      // ],
      opts: {
        showLabel: true,
        label: {
          scale: 1,
          unit: 'm',
          color: '#404040',
          size: 13
        }
      },
      tileProviders: [
        {
          name: 'OpenStreetMap',
          visible: true,
          url: ' ',
          attribution:
            '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        },
        {
          name: 'OpenTopoMap',
          visible: false,
          url: ' ',
          attribution:
            'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }
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
      if (to.params.bolge) {
        expressServer.getBound(to.params.id, to.params.bolge)
        .then((response) => {
          console.log(response.data)
          // tmpbound = response.data
        })
        .catch((error) => {
          console.error(error)
        })
      }

      expressServer.getBaseStations(to.params.id)
      .then((responseBaseStations) => {
        console.log(responseBaseStations.data)
        next(vm => {
          vm.setPlainList(response.data)
          vm.basestations = responseBaseStations.data
          vm.basestationsFiltered = vm.basestations
        })
      })
      .catch((error) => {
        console.error(error)
        basestations = {}
        basestationsFiltered = {}
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
    console.log('111beforeRouteUpdate : ', to.params, from.params)
    expressServer.getHarita(to.params.id)
    .then((response) => {
      // this.deneme = response.data[0].svg
      this.setPlainList(response.data)

      if (to.params.bolge) {
        expressServer.getBound(to.params.id, to.params.bolge)
        .then((response) => {
          console.log(response.data)
          this.setBounds(response.data)
        })
        .catch((error) => {
          console.error(error)
        })
      }
      console.log('-----------------')
      expressServer.getBaseStations(to.params.id)
      .then((response) => {
        console.log(response.data)
        this.basestations = response.data
        this.basestationsFiltered = this.basestations
      })
      .catch((error) => {
        console.error(error)
      })
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
    displaySearchBar () {
      console.log('displaySearchBar')
      this.visibleSearchBar = !this.visibleSearchBar
    },
    addEvent ({type, target}) {
      this.basestationsFiltered = this.basestations.filter(
        a => a.Adi
        .toLowerCase()
        .includes(target.value.toLowerCase()))
    },
    setPlainList (list) {
      this.url = list.svg
      // this.bounds = [[0, 0], [list.height, list.width]]
      var map = this.$refs.map.mapObject
      var southWest = map.unproject([0, (list.height)], 0)
      var northEast = map.unproject([(list.width), 0], 0)
      southWest.lat = Math.abs(southWest.lat)
      // console.log('---', southWest, northEast)
      var bounds = new L.LatLngBounds(southWest, northEast)
      this.bounds = bounds
      // console.log(bounds)
      map.setMaxBounds(bounds)
      // this.zoom = -1
      map.setZoom(-1)
      // map.fitBounds(bounds)
      // this.setBounds(bounds)
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
      // this.$refs.map.fitBounds(bounds)
    },
    setCoordinat (x, y) {
      var map = this.$refs.map.mapObject
      var latlng = map.unproject([x, y], 0)
      latlng.lat = Math.abs(latlng.lat)
      return latlng
    },
    test () {
      // this.$nextTick(() => {
      //  console.log(this.$refs.map.mapObject.ANY_LEAFLET_MAP_METHOD())
      // })
      console.log(this.map.unproject([380, 444], this.map.getMinZoom() + 1))
      // console.log(this.$refs.map.fitBounds([[5, 10], [50, 100]]))
      // this.$nextTick(() => {
      //   var map = this.$refs.map.mapObject
      //   var southWest = map.unproject([0, 800], map.getMaxZoom() - 1)
      //   var northEast = map.unproject([600, 0], map.getMaxZoom() - 1)
      //   // var bounds = new L.LatLngBounds(southWest, northEast)
      //   console.log(map.getMaxZoom())
      //   console.log(new L.LatLngBounds(southWest, northEast))
      // })
    },
    doSomethingOnReady () {
      this.map = this.$refs.map.mapObject
      this.stars = [
        { name: 'Sol', x: 1000, y: 2000 },
        { name: 'Mizar', x: 41.6, y: 130.1 },
        { name: 'Krueger-Z', x: 5, y: 56.5 },
        { name: 'Deneb', x: 218.7, y: 8.3 }
      ]
      console.log('doSomethingOnReady')
    },
    getIcon () {
      return L.divIcon({
        className: 'my-custom-pin',
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 34.892337" height="60" width="40"><g transform="translate(-814.59595,-274.38623)"><g transform="matrix(1.1855854,0,0,1.1855854,-151.17715,-57.3976)"><path d="m 817.11249,282.97118 c -1.25816,1.34277 -2.04623,3.29881 -2.01563,5.13867 0.0639,3.84476 1.79693,5.3002 4.56836,10.59179 0.99832,2.32851 2.04027,4.79237 3.03125,8.87305 0.13772,0.60193 0.27203,1.16104 0.33416,1.20948 0.0621,0.0485 0.19644,-0.51262 0.33416,-1.11455 0.99098,-4.08068 2.03293,-6.54258 3.03125,-8.87109 2.77143,-5.29159 4.50444,-6.74704 4.56836,-10.5918 0.0306,-1.83986 -0.75942,-3.79785 -2.01758,-5.14062 -1.43724,-1.53389 -3.60504,-2.66908 -5.91619,-2.71655 -2.31115,-0.0475 -4.4809,1.08773 -5.91814,2.62162 z" style="fill:red;stroke:red;"/><circle r="3.0355" cy="288.25278" cx="823.03064" id="path3049" style="display:inline;fill:red;"/></g></g></svg>`
      })
    },
    focusMaker (maker) {
      this.$refs.map.mapObject.setView([maker.Y, maker.X], 3)
      // this.$refs.map.fitBounds([maker.Y, maker.X])
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

.personel-search-bar-open .personel-search-bar {
  -webkit-transform: translate(0, 0);
  transform: translate(0, 0);
}

.personel-search-bar-open .my-map-class {
  margin-left: 250px;
}

.personel-search-bar {
  -webkit-transform: translate(-250px, 0);
  transform: translate(-250px, 0);
  background: #343a40;
  bottom: 0;
  color: #ffffff;
  height: 100%;
  overflow: auto;
  position: absolute;
  top: 0;
  width: 250px;
}

.deneme {
  -webkit-transition: -webkit-transform .5s ease-in-out, margin .5s ease-in-out;
  -moz-transition: -moz-transform .5s ease-in-out, margin .5s ease-in-out;
  -o-transition: -o-transform .5s ease-in-out, margin .5s ease-in-out;
  transition: transform .5s ease-in-out, margin .5s ease-in-out;
}
</style>

