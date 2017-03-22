import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

const goods = { template: '<div>goods</div>' }
const ratings = { template: '<div>ratings</div>' }
const seller = { template: '<div>seller</div>' }

export default new Router({
  routes: [
    {
      path: '/',
      component: Hello
    },
    { 
    	path: '/goods', 
    	component: goods 
	},
    { 
    	path: '/ratings', 
    	component: ratings 
    },
    { 
    	path: '/seller', 
    	component: seller 
    }
  ]
})
