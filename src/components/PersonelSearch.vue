<template>
  <div class="row">
    <div class="col-md-12">
      <!-- TABLE: LATEST ORDERS -->
      <div class="box box-info">
        <div class="box-header with-border">
          <h3 class="box-title">Personeller</h3>
          <div class="box-tools pull-right">
            <div class="has-feedback">
              <input type="text" class="form-control input-sm" placeholder="Personel Ara" @input="addEvent" @change="addEvent" > 
              <span class="glyphicon glyphicon-search form-control-feedback"></span>
            </div>
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <div class="table-responsive">
            <table class="table no-margin">
              <thead>
              <tr>
                <th style="width: 150px">Sicil No</th>
                <th>Personel Adi</th>
                <th style="width: 200px">Tag MAC</th>
                <th style="width: 150px"></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in searchResultList.slice(pageStart, pageStart+15)" :item="item" :key="item.PersonelSicilNo">
                <td>{{item.PersonelSicilNo}}</td>
                <td>{{item.PersonelAdi}}</td>
                <td>{{item.TagMac?item.TagMac:"BOS"}}</td>
                <th>
                  <div>
                    <!-- <router-link :to='"/personelSearch/" + item.PersonelSicilNo'> -->
                    <button type="button" class="btn btn-success btn-flat btn-sm" 
                    :disabled="!item.TagMac"  @click="findUser(item.PersonelSicilNo)">
                      <i class="fa fa-map-marker"></i>
                    </button>
                    <!-- </router-link> -->
                    <button type="button" class="btn btn-warning btn-flat btn-sm"><i class="fa fa-edit"></i></button>
                    <button type="button" class="btn btn-danger btn-flat btn-sm"><i class="fa fa-trash"></i></button>
                  </div>
                </th>
              </tr>
              </tbody>
            </table>
          </div>
          <!-- /.table-responsive -->
        </div>
        <!-- /.box-body -->
        <div class="box-footer clearfix">
          <ul class="pagination pagination-sm no-margin pull-right">
            <li v-for="n in Math.ceil(searchResultCount / 15)" v-bind:key="n">
              <button type="button" class="btn btn-flat btn-sm" :value="n" @click="pageSelect">{{n}}</button>
            </li>
          </ul>
        </div>
        <!-- /.box-footer -->
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import expressServer from '../expressServer'
import Loading from 'vue-loading-overlay'

Vue.use(Loading)

export default {
  name: 'personelSearch',
  data () {
    return {
      // intervalObj: null,
      // taglists: [],
      // taglistsPrev: [],
      // tagHistory: []
      pageStart: 0,
      searchResultCount: 0,
      searchResultList: [],
      personelList: []
    }
  },
  created () {
    expressServer.getPersonels().then((list) => {
      this.personelList = list.data
      this.searchResultCount = this.personelList.length
      this.searchResultList = this.personelList
    })
  },
  methods: {
    addEvent ({type, target}) {
      this.searchResultList = this.personelList.filter(
        a => a.PersonelAdi
        .toLowerCase()
        .includes(target.value.toLowerCase()))
      this.searchResultCount = this.searchResultList.length
    },
    pageSelect ({type, target}) {
      this.pageStart = (target.value - 1) * 15
    },
    findUser (userid) {
      let loader = this.$loading.show({
        // Optional parameters
        container: null,
        canCancel: true
      })
      // simulate AJAX
      setTimeout(() => {
        loader.hide()
      }, 5000)
      console.log(userid)
    }
    // guncelle (data) {
    //   this.taglists = data
    //   // debugger
    //   console.log('data : ', data)
    //   console.log('this.tagHistory : ', this.taglistsPrev)
    //   for (var item in data) {
    //     for (var itm in this.taglistsPrev) {
    //       if (this.taglistsPrev[itm].id === data[item].id) {
    //         if ((this.taglistsPrev[itm].state !== data[item].state) && ((this.taglistsPrev[itm].state === 1) || (this.taglistsPrev[itm].state === 3))) {
    //           console.log('degisiklik varrr')
    //           taglist.addTagHistory(data[item]).then(() => {
    //             taglist.tagHisyoryGet().then((data) => {
    //               this.tagHistory = data.data.slice().sort((a, b) => new Date(b.saat) - new Date(a.saat))
    //               // this.tagHistory = data.data
    //             })
    //           })
    //         }
    //         break
    //       }
    //     }
    //   }
    //   this.taglistsPrev = data
    // }
  },
  destroyed () {
    // clearInterval(this.intervalObj)
  }
}
</script>
