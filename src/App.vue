<template>
  <div id="app">
    <div class="wrapper">
      <va-navibar></va-navibar>
      <va-slider :slideMenuItems="roomsList" :slideMenuFixItems="slideMenuFixItems"></va-slider>
      <va-content-wrap></va-content-wrap>
      <Modal></Modal>
    </div>
  </div>
</template>

<script>
import VANaviBar from 'NaviBar.vue'
import VASlider from 'Slider.vue'
import VAContentWrap from 'ContentWrap.vue'
import Modal from './components/Modal.vue'
import store from './vuex/store.js'
import { mapGetters, mapActions } from 'vuex'
import slideMenuFixItems from './lib/slideMenuItems.js'

export default {
  name: 'app',
  data () {
    return {
      slideMenuFixItems: slideMenuFixItems
    }
  },
  created () {
    this.fetchRooms()
  },
  computed: {
    ...mapGetters([
      'currentUser',
      'roomsList'
    ])
  },
  methods: {
    ...mapActions([
      'fetchRooms'
    ])
  },
  components: {
    'va-navibar': VANaviBar,
    'va-slider': VASlider,
    'va-content-wrap': VAContentWrap,
    Modal
  },
  store
}
</script>

<style>

</style>
