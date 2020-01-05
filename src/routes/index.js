import Vue from 'vue';
import Router from 'vue-router';
import MainView from '../views/MainView';
import Map from '../views/Map';
import Payment from '../views/Payment';
import Profile from '../views/Profile';
import Stations from '../components/custom/Stations/Stations';
import StationDetails from '../components/custom/Stations/StationDetails';
import SignUp from '../views/SignUp';
import Login from '../views/Login';
import CardLogin from '../views/CardLogin';

Vue.use(Router);

export default new Router({
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/stations/:stationId',
			name: 'stationDetails',
			component: StationDetails
		},
		{
			path: '/',
			name: 'main',
			component: MainView,
			children: [
				{
					path: 'stations',
					name: 'stations',
					component: Stations
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
					component: Profile,
					children: [
						{
							path: '/',
							name: 'login',
							component: Login
						},
						{
							path: 'signup',
							name: 'signup',
							component: SignUp
						},
						{
							path: 'cardLogin',
							name: 'cardLogin',
							component: CardLogin
						}
					]
				}
			]
		}
	]
});
