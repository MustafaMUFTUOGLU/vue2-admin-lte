import io from 'socket.io-client'
import store from '../vuex/store.js'

var socket = io('localhost:4001/Beacons', {autoConnect: false})

socket.on('connect', function () {
  console.log('socket connect')
})

socket.on('event', function (data) {
  console.log('event', data)
})

socket.on('beacons', function (data) {
  // console.log('beacons', data)
  // console.log('aa:', store)
  store.dispatch('triggerChangeBeaconsList', data)
})

socket.on('disconnect', function () {
  console.log('disconnect')
})

function start () {
  socket.connect()
}

function stop () {
  console.log('sotp socket')
  socket.disconnect()
  socket = {}
}

export default {
  start,
  stop
}
