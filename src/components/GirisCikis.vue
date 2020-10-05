<template>
  <div class="row">
    <div class="col-md-6">
    <!-- TABLE: LATEST ORDERS -->
    <div class="box box-info">
      <div class="box-header with-border">
        <h3 class="box-title">Son Durumlar</h3>
      </div>
      <!-- /.box-header -->
      <div class="box-body">
        <div class="table-responsive">
          <table class="table no-margin">
            <thead>
            <tr>
              <th>Tag</th>
              <th>Bölge</th>
              <th>Son Durum</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in taglists">
              <td>{{item.tagName}}</td>
              <td>{{item.gateway}}</td>
              <td>
                <span v-if="item.state === 1" class="label label-success">Bölgeye Giriş Yaptı</span>
                <span v-else-if="item.state === 2" class="label label-warning">Bölgede</span>
                <span v-else-if="item.state === 3" class="label label-primary">Bölgeden Çıkış Yaptı</span>
                <span v-else class="label label-danger">Bölge Dışında</span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- /.table-responsive -->
      </div>
      <!-- /.box-body -->
      <div class="box-footer clearfix">
        <!-- <a href="javascript:void(0)" class="btn btn-sm btn-info btn-flat pull-left">Place New Order</a> -->
        <!-- <a href="javascript:void(0)" class="btn btn-sm btn-default btn-flat pull-right">View All Orders</a> -->
      </div>
      <!-- /.box-footer -->
    </div>
    </div>
      <div class="col-md-6">
    <!-- TABLE: LATEST ORDERS -->
    <div class="box box-info">
      <div class="box-header with-border">
        <h3 class="box-title">Giriş Çıkışlar</h3>
      </div>
      <!-- /.box-header -->
      <div class="box-body">
        <div class="table-responsive">
          <table class="table no-margin">
            <thead>
            <tr>
              <th>Tag</th>
              <th>Bölge</th>
              <th>Durum</th>
              <th>Tarih / Saat</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in tagHistory">
              <td>{{item.tagName}}</td>
              <td>{{item.gateway}}</td>
              <td>
                <span v-if="item.state === 1" class="label label-success">Bölgeye Giriş Yaptı</span>
                <span v-else-if="item.state === 2" class="label label-warning">Bölgede</span>
                <span v-else-if="item.state === 3" class="label label-primary">Bölgeden Çıkış Yaptı</span>
                <span v-else class="label label-danger">Bölge Dışında</span>
              </td>
              <td>{{item.saat}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- /.table-responsive -->
      </div>
      <!-- /.box-body -->
      <div class="box-footer clearfix">
        <!-- <a href="javascript:void(0)" class="btn btn-sm btn-info btn-flat pull-left">Place New Order</a> -->
        <!-- <a href="javascript:void(0)" class="btn btn-sm btn-default btn-flat pull-right">View All Orders</a> -->
      </div>
      <!-- /.box-footer -->
    </div>
    </div>
  </div>
</template>

<script>
import taglist from '../gateway'
export default {
  name: 'giriscikis',
  data () {
    return {
      intervalObj: null,
      taglists: [],
      taglistsPrev: [],
      tagHistory: []
    }
  },
  created () {
    taglist.tagListGet().then((data) => {
      this.guncelle(data.data)
      this.intervalObj = setInterval(() => {
        taglist.tagListGet().then((data) => {
          this.guncelle(data.data)
        })
      }, 3000)
    })

    taglist.tagHisyoryGet().then((data) => {
      // debugger
      this.tagHistory = data.data.slice().sort((a, b) => new Date(b.saat) - new Date(a.saat))
    })
  },
  methods: {
    guncelle (data) {
      this.taglists = data
      // debugger
      console.log('data : ', data)
      console.log('this.tagHistory : ', this.taglistsPrev)
      for (var item in data) {
        for (var itm in this.taglistsPrev) {
          if (this.taglistsPrev[itm].id === data[item].id) {
            if ((this.taglistsPrev[itm].state !== data[item].state) && ((this.taglistsPrev[itm].state === 1) || (this.taglistsPrev[itm].state === 3))) {
              console.log('degisiklik varrr')
              taglist.addTagHistory(data[item]).then(() => {
                taglist.tagHisyoryGet().then((data) => {
                  this.tagHistory = data.data.slice().sort((a, b) => new Date(b.saat) - new Date(a.saat))
                  // this.tagHistory = data.data
                })
              })
            }
            break
          }
        }
      }
      this.taglistsPrev = data
    }
  },
  destroyed () {
    clearInterval(this.intervalObj)
  }
}
</script>
