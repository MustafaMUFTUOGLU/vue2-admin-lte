module.exports = [
  {
    type: 'item',
    isHeader: true,
    name: 'MAIN NAVIGATION'
  },
  {
    type: 'tree',
    icon: 'fa fa-dashboard',
    name: 'Katlar',
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Kat1',
        router: {
          name: 'Hello'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Kat2',
        router: {
          name: 'Hello'
        }
      }
    ]
  }
]
