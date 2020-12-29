<template>
  <div id="app">
    <div class="wrapper">
      <va-navibar></va-navibar>
      <va-slider :slideMenuItems="bolgelerList" :slideMenuFixItems="slideMenuFixItems"></va-slider>
      <va-content-wrap></va-content-wrap>
      <Modal></Modal>
      <PersonelSearchModal></PersonelSearchModal>
      <PolygonAddModal></PolygonAddModal>
    </div>
  </div>
</template>

<script>
import VANaviBar from 'NaviBar.vue'
import VASlider from 'Slider.vue'
import VAContentWrap from 'ContentWrap.vue'
import Modal from './components/Modal.vue'
import PersonelSearchModal from './components/PersonelSearchModal.vue'
import PolygonAddModal from './components/PolygonAddModal.vue'
import store from './vuex/store.js'
// import { mapGetters, mapActions } from 'vuex'
import slideMenuFixItems from './lib/slideMenuItems.js'
import expressServer from './expressServer'

export default {
  name: 'app',
  data () {
    return {
      bolgelerList: [],
      slideMenuFixItems: slideMenuFixItems
    }
  },
  created () {
    // this.fetchBolgeler()
    expressServer.getAllCategorys().then((response) => {
      this.bolgelerList = response.data
      console.log(this.bolgelerList)
    })
  },
  computed: {
//     ...mapGetters([
//       // 'currentUser',
// //      'bolgelerList'
//     ])
  },
  methods: {
    // ...mapActions([
    //   'fetchBolgeler'
    // ])
  },
  components: {
    'va-navibar': VANaviBar,
    'va-slider': VASlider,
    'va-content-wrap': VAContentWrap,
    Modal,
    PersonelSearchModal,
    PolygonAddModal
  },
  store
}
</script>

<style>

</style>
