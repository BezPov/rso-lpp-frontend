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
		},
		appendCreditAccount (state, data) {
			if (state.user) {
				state.user.creditAccount = data;
			}
		}
	},
	getters: {
		currentUser (state) {
			return state.user;
		},
		creditAccount (state) {
			return state.user.creditAccount;
		}
	},
	actions: {

	},
	plugins: []
});

export default store;
