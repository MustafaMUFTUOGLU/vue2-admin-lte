<template>
  <li class="treeview ">
    <router-link :to="{ name: 'Map',  params: {idTopCategory: topCategory.idTopCategory}}">
      <i class="fa fa-circle-o"></i><span>{{ topCategory.TopCategoryName }}</span>
    </router-link>
    <!-- <ul class="treeview-menu" v-if="items.length > 0"> -->
    <ul class="treeview-menu">
      <!-- encodeURI(item.SubCategoryName) -->
      <router-link tag="li" v-for="(item,index) in topCategory.SubCategory" :data="item" :key="index" 
      :to="{ name: 'MapBound', params:{idTopCategory: topCategory.idTopCategory, idSubCategory: item.idSubCategory}}">
        <a>
          <i class="fa fa-circle-o"></i> {{ item.SubCategoryName }}
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
    topCategory: {
      type: Object,
      default: []
    }
  },
  created () {
    console.log(this.topCategory)
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
