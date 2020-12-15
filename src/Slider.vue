<template>
  <aside id="slider" class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel -->
      <!-- <div class="user-panel">
        <div class="pull-left image">
          <img src="~admin-lte/dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <p>{{ currentUser.name }}</p>
          <a href="#"><i class="fa fa-circle" :style="`color:${currentUser.state.color}`"></i> {{ currentUser.state.name }}</a>
        </div>
      </div>
      <form action="#" method="get" class="sidebar-form">
        <div class="input-group">
          <input type="text" name="q" class="form-control" placeholder="Search...">
              <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                </button>
              </span>
        </div>
      </form> -->
      
      <!-- /.search form -->
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul data-widget="tree" class="sidebar-menu">
        <li class="treeview">
          <a href="/Map">
            <i class="fa fa-share"></i>
            <span>{{ $t("Slider.Map") }}</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <va-slide-item
              v-for="(item,index) in slideMenuItems"
              :data="item"
              :key="index"
              :name="item.UstKategoriAdi"
              :items="item.AltKategori"
              :router="encodeURI(item.UstKategoriAdi)"
            >
            </va-slide-item>
          </ul>
        </li>
        <li>
          <!-- <a href="/personelSearch" @click="openModal"> -->
          
          <router-link to="/personelSearch">
          <!-- <a href="/personelSearch"> -->
            <i class="fa fa-user"></i>
            <span>{{ $t("Slider.Person") }}</span> 
          <!-- </a> -->
          </router-link>
        </li>
        
        <!-- <va-slide-item
          v-for="(item,index) in slideMenuFixItems"
          :data="item"
          :type="item.type"
          :isHeader="item.isHeader"
          :icon="item.icon"
          :name="item.name"
          :badge="item.badge"
          :items="item.items"
          :router="item.router"
          :link="item.link"
        >
        </va-slide-item> -->
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>
</template>

<script>

// import { mapGetters, mapActions } from 'vuex'
import VASlideItem from './components/VASlideItem'

export default {
  name: 'va-slider',
  props: {
    slideMenuItems: {
      type: Array,
      default: []
    },
    slideMenuFixItems: {
      type: Array,
      default: []
    }
  },
  created () {
  //   this.fetchRooms()
  },
  computed: {
    // ...mapGetters([
    //   'currentUser',
    //   'roomsList'
    // ])
  },
  methods: {
    openModal () {
      console.log('testtt modal')
      this.$bus.$emit('personelsearchmodal-open', {
        title: 'Hello',
        description: 'Arama',
        type: 'modal-primary',
        confirmText: 'Ara',
        cancelText: 'İptal',
        confirmBefore: () => {
          console.log('confirmBefore')
        },
        confirmAfter: () => {
          console.log('confirmAfter')
        },
        cancelBefore: () => {
          console.log('cancelBefore')
        },
        cancelAfter: () => {
          console.log('cancelAfter')
        }
      })
    }
    // ...mapActions([
    //   'fetchRooms'
    // ])
  },
  components: {
    'va-slide-item': VASlideItem
  }
}
</script>
