// import io from 'socket.io-client'
// import store from '../vuex/store.js'

// var socket = io('localhost:4001/Beacons', {autoConnect: true})
// var socketTags = io('localhost:4004/Gateway', {autoConnect: true})

// socketTags.on('connect', function () {
//   console.log('socketTags connect')
// })
// socket.on('connect', function () {
//   console.log('socket connect')
// })

// socket.on('event', function (data) {
//   console.log('event', data)
// })

// socket.on('beacons', function (data) {
//   // console.log('beacons', data)
//   // console.log('aa:', store)
//   // store.dispatch('triggerChangeBeaconsList', data)
// })

// socketTags.on('tags', function (data) {
//   // console.log('beacons', data)
//   // console.log('aa:', store)
//   store.dispatch('triggerChangeBeaconsList', data)
// })

// socket.on('disconnect', function () {
//   console.log('disconnect')
// })

// socketTags.on('disconnect', function () {
//   console.log('socketTags disconnect')
// })

function start () {
  // socket.connect()
  // socketTags.connect()
}

function stop () {
  // console.log('sotp socket')
  // socket.disconnect()
  // socketTags.disconnect()
  // socket = {}
  // socketTags = {}
}

export default {
  start,
  stop
}
