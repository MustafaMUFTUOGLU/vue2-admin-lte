<template>
  <li class="treeview ">
    <router-link :to="'/Harita/' + router">
      <i class="fa fa-circle-o"></i><span>{{ name }}</span>
    </router-link>
    <ul class="treeview-menu" v-if="items.length > 0">
      <router-link tag="li" v-for="(item,index) in items" :data="item" :key="index" :to="'/Harita/' + router + '/' + item.AltKategoriAdi.replace(/\s/g, '+')">
        <a>
          <i class="fa fa-circle-o"></i> {{ item.AltKategoriAdi }}
        </a>
      </router-link>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'va-slide-item',
  props: {
    icon: {
      type: String,
      default: ''
    },
    name: {
      type: String
    },
    items: {
      type: Array,
      default () {
        return []
      }
    },
    router: {
      type: String,
      default: ''
    }
  },
  created () {

  },
  computed: {
    // getType () {
    //   if (this.isHeader) {
    //     return 'header'
    //   }
    //   return this.type === 'item' ? '' : 'treeview'
    // }
  }
}
</script>
