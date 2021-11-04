import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/theme/default-dark.css'
import VueRouter from 'vue-router'
import ListeDesRestaurants from './components/ListeDesRestaurants'
import Restaurant from './components/Restaurant'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
Vue.use(VueMaterial)
Vue.use(VueRouter)
Vue.config.productionTip = false

//définition des routes
const router = new VueRouter({
  routes: [{
      path: '/',
      component: ListeDesRestaurants
    },
    {path: '/restaurant/:id',
      component: Restaurant
    }
  
  
],
mode: 'history'
});
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')