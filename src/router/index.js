import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Goods from '@/components/goods'
import Rating from '@/components/rating'
import Seller from '@/components/seller'

Vue.use(Router)

export default new Router({
	linkActiveClass: "current",
	routes: [
		{
			path: '/',
			name: 'HelloWorld',
			component: HelloWorld,
			redirect:"/goods",
			children: [
				{
					path: '/goods',
					name: 'goods',
					component: Goods
				},
				{
					path: '/rating',
					name: 'rating',
					component: Rating
				},
				{
					path: '/seller',
					name: 'seller',
					component: Seller
				}

			]
		}

	]
})