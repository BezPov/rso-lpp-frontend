import Vue from 'vue';
import Router from 'vue-router';
import MainView from '../components/custom/BottomNavigationView/BottomNavigationView';
import Payment from '../components/custom/Payment/Payment';
import Profile from '../components/custom/User/Profile';

import Stations from '../components/custom/Stations/Stations';
import StationDetails from '../components/custom/Stations/StationDetails';

import Buses from '@/components/custom/Buses/Buses';
import BusDetails from '@/components/custom/Buses/BusDetails';

import SignUp from '../components/custom/Login/SignUp';

import Login from '../components/custom/Login/Login';

import CardLogin from '../components/custom/Login/LoginWithCard';
import RouteFinder from "../components/custom/RouteFinder/RouteFinder";

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
			path: '/buses/:busId',
			name: 'busDetails',
			component: BusDetails
		},
		{
			path: '/profile/signup',
			name: 'signup',
			component: SignUp
		},
		{
			path: '/profile/cardLogin',
			name: 'cardLogin',
			component: CardLogin
		},
		{
			path: '/',
			redirect: { name: 'stations' },
			name: 'main',
			component: MainView,
			children: [
				{
					path: 'stations',
					name: 'stations',
					component: Stations
				},
				{
					path: 'buses',
					name: 'buses',
					component: Buses
				},
				{
					path: 'route',
					name: 'route',
					component: RouteFinder
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
						}
					]
				}
			]
		}
	]
});
