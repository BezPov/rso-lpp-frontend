import Vue from 'vue';
import Router from 'vue-router';
import MainView from '../views/MainView';
import Map from '../views/Map';
import Payment from '../views/Payment';
import Profile from '../views/Profile';
import Schedules from '../views/Schedules';
import StationDetails from '../views/StationDetails';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'main',
			component: MainView,
			children: [
				{
					path: 'schedules',
					name: 'schedules',
					component: Schedules
				},
				{
					path: 'map',
					name: 'map',
					component: Map
				},
				{
					path: 'payment',
					name: 'payment',
					component: Payment
				},
				{
					path: 'profile',
					name: 'profile',
					component: Profile
				}
			]
		},
		{
			path: '/stationDetails/:stationId',
			name: 'stationDetails',
			component: StationDetails
		}
	]
});
