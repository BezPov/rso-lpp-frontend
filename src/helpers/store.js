import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		user: {
			loggedIn: false
		}
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
		}
	},
	getters: {
		currentUser (state) {
			return state.user;
		}
	},
	actions: {

	},
	plugins: []
});

export default store;
