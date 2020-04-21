import Vue from 'vue'
import Router from 'vue-router'

import home from '@/views/home'
import pdf from '@/views/pdf'
import office from '@/views/office'

import mathml from '@/views/mathml'

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
    },
    {
      path: '/mathml',
      name: 'mathml',
      component: mathml
    }
  ]
})
