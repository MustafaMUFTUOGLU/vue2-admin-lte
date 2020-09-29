export const unreadMessagesCount = state => state.messages.main.length
export const unreadNotificationsCount = state => state.notifications.main.length
export const remainTasksCount = state => state.tasks.main.length
export const currentUser = state => state.user.main
export const totalProduct = state => state.products.main
export const roomsList = state => state.rooms.main
export const beaconsList = state => state.beacons.main