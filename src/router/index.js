import Vue from 'vue'
import Router from 'vue-router'

import home from '@/views/home'
import pdf from '@/views/pdf'
import office from '@/views/office'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/pdf',
      name: 'pdf',
      component: pdf
    },
    {
      path: '/office',
      name: 'office',
      component: office
    }
  ]
})
