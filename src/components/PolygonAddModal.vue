<template lang="html">
  <!-- Modal -->
  <div class="modal fade" id="bsPolygonAddModal" tabindex="-1" role="dialog" aria-labelledby="bsPolygonAddModalLabel" data-toggle="modal" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="bsPolygonAddModalLabel">Bolge Atama</h4>
        </div>
        <div class="modal-body">
          <div class="col-md-12">
            <div class="form-group">
              <label>Bolge</label>
              <select v-model="selectedSubCategory" class="form-control select2">
                <option v-for="i in SubCategorys" v-bind:value="i" >{{i.SubCategoryName}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" @click="cancel">İptal</button>
          <button type="button" class="btn btn-primary" @click="confirm">Ekle</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// const ModalTypes = ['modal-primary', 'modal-success', 'modal-info', 'modal-warning', 'modal-danger']
export default {
  mounted () {
    this.$bus.$on('polygonaddmodal-open', (args) => {
      this.confirmBeforeHook = args.confirmBefore
      this.confirmAfterHook = args.confirmAfter
      this.cancelBeforeHook = args.cancelBefore
      this.cancelAfterHook = args.cancelAfter
      this.SubCategorys = args.SubCategorys
      if (this.SubCategorys.length) {
        this.selectedSubCategory = this.SubCategorys[0]
      }
      $('#bsPolygonAddModal').modal('show')
    })
    $('#bsPolygonAddModal').on('show.bs.PolygonAddModal', (e) => {
    })

    $('#bsPolygonAddModal').on('hidden.bs.PolygonAddModal', (e) => {
      this.confirmAfterHook()
      this.cancelAfterHook()
      this.resetProperties()
    })
  },
  data () {
    return {
      selectedSubCategory: {},
      SubCategorys: [],
      confirmBeforeHook: () => {},
      confirmAfterHook: () => {},
      cancelBeforeHook: () => {},
      cancelAfterHook: () => {}
    }
  },
  methods: {
    confirm: function () {
      this.confirmBeforeHook(this.selectedSubCategory.idSubCategory)
      $('#bsPolygonAddModal').modal('hide')
      this.cancelAfterHook = () => {}
      console.log(this.selectedSubCategory.idSubCategory)
    },
    cancel: function () {
      this.cancelBeforeHook()
      $('#bsPolygonAddModal').modal('hide')
      this.confirmAfterHook = () => {}
    },
    resetProperties: function () {
      this.confirmBeforeHook = () => {}
      this.confirmAfterHook = () => {}
      this.cancelBeforeHook = () => {}
      this.cancelAfterHook = () => {}
    }
  }
}
</script>

<style lang="css">
</style>
