import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import goods from '@/components/goods/goods'
import ratings from '@/components/ratings/ratings'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  linkActiveClass:'active',
  routes: [
    { 
    	path: '/goods', 
    	component: goods 
	},
    { 
    	path: '/ratings', 
    	component: ratings 
    }
  ]
})
