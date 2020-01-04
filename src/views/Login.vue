<template>
	<v-row>
		<v-col cols="12">
			<img src="../assets/images/user-profile.png" class="profile-avatar">
		</v-col>
		<v-col cols="12">
			<v-text-field
					v-model="email"
					label="E-pošta"
					single-line
					dense
					required
			></v-text-field>
		</v-col>
		<v-col cols="12">
			<v-text-field
					v-model="password"
					label="Geslo"
					type="password"
					single-line
					dense
					required
			></v-text-field>
		</v-col>
		<v-col cols="12">
			<v-btn large dark color="#33C88F" v-on:click="login()">PRIJAVA</v-btn>
		</v-col>
		<v-col cols="12">
			<router-link to="/profile/signup">
				Ustvari račun
			</router-link>
		</v-col>
		<v-col cols="12">
			<router-link to="/profile/cardLogin">
				Prijavi se z urbano
			</router-link>
		</v-col>
	</v-row>
</template>

<script>
	export default {
		name: "Login",
		data() {
			return {
				email: '',
				password: ''
			}
		},
		methods: {
			login() {
				let vm = this;

				vm.axios.post('http://lpp-account-service:80/user/login', {
					email: vm.email,
					password: vm.password
				})
				.then(function (response) {
					console.log(response);
					if (response && response.status === 200) vm.$store.commit('login', response.data);

					// get user's credit account data
					vm.axios.get(`http://lpp-payment-service:85/creditAccount/${response.data._id}`)
					.then(function (creditResponse) {
						if (creditResponse) vm.$store.commit('appendCreditAccount', creditResponse.data);
					})
					.catch(function (error) {
						console.log(error);
					})
				})
				.catch(function (error) {
					console.log(error);
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.profile-avatar {
		width: 150px;
		height: 150px;
		border-radius: 150px;
	}
	a {
		color: #5d5d5d !important;
		text-decoration: none;
	}
</style>