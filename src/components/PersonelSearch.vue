<template>
  <div class="row">
    <div class="col-md-12">
      <!-- TABLE: LATEST ORDERS -->
      <div class="box box-info">
        <div class="box-header with-border">
          <h3 class="box-title">Personeller</h3>
          <div class="box-tools pull-right">
            <div class="has-feedback">
              <input type="text" class="form-control input-sm" placeholder="Personel Ara">
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
                <th>Sicil No</th>
                <th>Personel Adi</th>
                <th>Tag MAC</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in personelList" v-bind:item="item" v-bind:key="item.PersonelId">
                <td>{{item.PersonelSicilNo}}</td>
                <td>{{item.PersonelAdi}}</td>
                <td>{{item.TagMac?item.TagMac:"BOS"}}</td>
                <th style="width: 150px">
                  <div>
                    <button v-if="item.TagMac" type="button" class="btn btn-success btn-flat btn-sm"><i class="fa fa-map-marker"></i></button>
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
            <li><a href="#">«</a></li>
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">»</a></li>
          </ul>
        </div>
        <!-- /.box-footer -->
      </div>
    </div>
  </div>
</template>

<script>
import expressServer from '../expressServer'
export default {
  name: 'personelSearch',
  data () {
    return {
      // intervalObj: null,
      // taglists: [],
      // taglistsPrev: [],
      // tagHistory: []
      personelList: []
    }
  },
  created () {
    expressServer.getPersonels().then((list) => {
      this.personelList = list.data.slice(0, 15)
      console.log(list)
    })
    // taglist.tagListGet().then((data) => {
    //   var tmpData = [
    //     {
    //       id: 1,
    //       tagName: 'tag1',
    //       gateway: 'depo',
    //       state: data.data.tag1
    //     },
    //     {
    //       id: 2,
    //       tagName: 'tag2',
    //       gateway: 'depo',
    //       state: data.data.tag2
    //     }
    //   ]
    //   this.guncelle(tmpData)
    //   this.intervalObj = setInterval(() => {
    //     taglist.tagListGet().then((data) => {
    //       // debugger
    //       var tmpData = [
    //         {
    //           id: 1,
    //           tagName: 'tag1',
    //           gateway: 'depo',
    //           state: data.data.tag1
    //         },
    //         {
    //           id: 2,
    //           tagName: 'tag2',
    //           gateway: 'depo',
    //           state: data.data.tag2
    //         }
    //       ]
    //       this.guncelle(tmpData)
    //     })
    //   }, 3000)
    // })

    // taglist.tagHisyoryGet().then((data) => {
    //   // debugger
    //   this.tagHistory = data.data.slice().sort((a, b) => new Date(b.saat) - new Date(a.saat))
    // })
  },
  methods: {
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
