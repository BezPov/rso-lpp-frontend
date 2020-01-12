import Vue from 'vue';
import Vuex from 'vuex';

import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
	storage: window.localStorage,
	reducer: (state) => ({ favouriteStations: state.favouriteStations }),
	filter: (mutation) => mutation.type === 'addFavouriteStation' || mutation.type === 'removeFavouriteStation'
});

const store = new Vuex.Store({
	state: {
		user: {
			loggedIn: false
		},
		favouriteStations: []
	},
	mutations: {
		login (state, userData) {
			state.user = userData;
			state.user.loggedIn = true;
		},
		logout (state) {
			state.user = {
				loggedIn: false
			};
		},
		appendCreditAccount (state, data) {
			if (state.user) {
				state.user.creditAccount = data;
			}
		},
		addFavouriteStation(state, station) {
			state.favouriteStations.push(station);
		},
		removeFavouriteStation(state, station) {
			state.favouriteStations = state.favouriteStations.filter((favouriteStations) => favouriteStations._id !== station._id);
		}
	},
	getters: {
		currentUser (state) {
			return state.user;
		},
		creditAccount (state) {
			return state.user.creditAccount;
		},
		favouriteStations(state) {
			return state.favouriteStations;
		}
	},
	actions: {

	},
	plugins: [vuexLocal.plugin]
});

export default store;
