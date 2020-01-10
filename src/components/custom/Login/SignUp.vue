<template>
	<main-container>
		<template v-slot:appBar>
			<v-app-bar
					color="primary"
					dark
			>
				<v-btn
						icon
						@click="$router.back()"
				>
					<v-icon>mdi-arrow-left</v-icon>
				</v-btn>

				<v-toolbar-title>Registracija</v-toolbar-title>
			</v-app-bar>
		</template>

		<template v-slot:content>
			<v-layout column fill-height px-4>
				<v-flex shrink my-3>
					<v-text-field
							v-model="name"
							label="Ime"
							single-line
							outlined
							required
							hide-details
					></v-text-field>
				</v-flex>

				<v-flex shrink mb-3>
					<v-text-field
							v-model="surname"
							label="Priimek"
							single-line
							outlined
							hide-details
							required
					></v-text-field>
				</v-flex>

				<v-flex shrink mb-3>
					<v-text-field
							v-model="phone"
							label="Telefon"
							single-line
							outlined
							hide-details
							required
					></v-text-field>
				</v-flex>

				<v-flex shrink mb-3>
					<v-text-field
							v-model="cardId"
							label="Številka kartice Urbana"
							single-line
							hide-details
							outlined
							required
					></v-text-field>
				</v-flex>

				<v-flex shrink mb-3>
					<v-text-field
							v-model="email"
							label="E-pošta"
							single-line
							hide-details
							outlined
							required
					></v-text-field>
				</v-flex>

				<v-flex shrink mb-3>
					<v-text-field
							v-model="password"
							label="Geslo"
							type="password"
							single-line
							outlined
							hide-details
							required
					></v-text-field>
				</v-flex>

				<v-flex shrink mb-3>
					<v-text-field
							v-model="repeatPassword"
							label="Ponovite geslo"
							type="password"
							single-line
							outlined
							required
							hide-details
					></v-text-field>
				</v-flex>

				<v-flex shrink>
					<v-layout justify-center>
						<v-btn large rounded dark color="primary" v-on:click="signUp()">USTVARI RAČUN</v-btn>
					</v-layout>
				</v-flex>
			</v-layout>
		</template>
	</main-container>
</template>

<script>
	import MainContainer from "../../generic/MainContainer";
	export default {
		name: "SignUp",
		components: { MainContainer },
		data() {
			return {
				name: '',
				surname: '',
				phone: '',
				cardId: '',
				email: '',
				password: '',
				repeatPassword: ''
			};
		},
		methods: {
			signUp() {
				let vm = this;

				vm.$requestsHandler.post('/api/account/user/create', {
					name: vm.name,
					surname: vm.surname,
					phone: vm.phone,
					cardId: vm.cardId,
					email: vm.email,
					password: vm.password
				})
					.then(function (response) {
						console.log(response);
						if (response && response.status === 200) vm.$store.commit('login', response.data);
					})
					.catch(function (error) {
						console.log(error);
					});
			}
		}
	}
</script>

<style scoped lang="scss">
</style>