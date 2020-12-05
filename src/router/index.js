import Vue from 'vue'
import Router from 'vue-router'

// import SvgPanel from 'components/SvgPanel.vue'
import Leaflet from 'components/Leaflet.vue'
import Hello from 'components/Hello.vue'
import PersonelSearch from 'components/PersonelSearch.vue'

// import DashboardV1 from 'examples/Dashboard.v1.vue'
// import DashboardV2 from 'examples/Dashboard.v2.vue'
// import InfoBoxExample from 'examples/InfoBoxExample'
// import ChartExample from 'examples/ChartExample'
// import AlertExample from 'examples/AlertExample'
// import ModalExample from 'examples/ModalExample'
// import WidgetsExample from 'examples/WidgetsExample'
// import APIExample from 'examples/APIExample'

// UI Element Groups
// import General from 'pages/ui-elements/General.vue'
// import Icons from 'pages/ui-elements/Icons.vue'
// import Buttons from 'pages/ui-elements/Buttons.vue'
// import Sliders from 'pages/ui-elements/Sliders.vue'
// import Timeline from 'pages/ui-elements/Timeline.vue'
// import Modals from 'pages/ui-elements/Modals.vue'

// forms
// import GeneralElements from 'pages/forms/GeneralElements.vue'
// import AdvancedElements from 'pages/forms/AdvancedElements.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    // {
    //   path: '/Harita/:id',
    //   component: SvgPanel
    // },
    // {
    //   path: '/Harita/:id/:bolge',
    //   component: SvgPanel
    // },
    {
      path: '/Map/:id',
      alias: '/Map/',
      component: Leaflet
    },
    {
      path: '/Map/:id/:bolge',
      component: Leaflet
    },
    {
      path: '/personelsearch',
      name: 'PersonelSearch',
      component: PersonelSearch
    } // ,
    // {
    //   path: '/examples/infobox',
    //   name: 'InfoBoxExample',
    //   component: InfoBoxExample
    // },
    // {
    //   path: '/examples/chart',
    //   name: 'ChartExample',
    //   component: ChartExample
    // },
    // {
    //   path: '/examples/alert',
    //   name: 'AlertExample',
    //   component: AlertExample
    // },
    // {
    //   path: '/examples/widgets',
    //   name: 'WidgetsExample',
    //   component: WidgetsExample
    // },
    // {
    //   path: '/examples/api-example',
    //   name: 'APIExample',
    //   component: APIExample
    // },
    // {
    //   path: '/ui-elements/general',
    //   name: 'General',
    //   component: General
    // },
    // {
    //   path: '/ui-elements/icons',
    //   name: 'Icons',
    //   component: Icons
    // },
    // {
    //   path: '/ui-elements/buttons',
    //   name: 'Buttons',
    //   component: Buttons
    // },
    // {
    //   path: '/ui-elements/sliders',
    //   name: 'Sliders',
    //   component: Sliders
    // },
    // {
    //   path: '/ui-elements/timeline',
    //   name: 'Timeline',
    //   component: Timeline
    // },
    // {
    //   path: '/ui-elements/modals',
    //   name: 'Modals',
    //   component: Modals
    // },
    // {
    //   path: '/forms/general-elements',
    //   name: 'GeneralElements',
    //   component: GeneralElements
    // },
    // {
    //   path: '/forms/advanced-elements',
    //   name: 'AdvancedElements',
    //   component: AdvancedElements
    // }
  ],
  linkActiveClass: 'active'
})
