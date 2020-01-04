<template>
	<v-row>
		<v-col cols="12">
			Ustvari nov profil
		</v-col>
		<v-col cols="12">
			<v-text-field
					v-model="name"
					label="Ime"
					single-line
					dense
					required
			></v-text-field>
		</v-col>
		<v-col cols="12">
			<v-text-field
					v-model="surname"
					label="Priimek"
					single-line
					dense
					required
			></v-text-field>
		</v-col>
		<v-col cols="12">
			<v-text-field
					v-model="phone"
					label="Telefon"
					single-line
					dense
					required
			></v-text-field>
		</v-col>
		<v-col cols="12">
			<v-text-field
					v-model="cardId"
					label="Številka kartice Urbana"
					single-line
					dense
					required
			></v-text-field>
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
			<v-text-field
					v-model="repeatPassword"
					label="Ponovno geslo"
					type="password"
					single-line
					dense
					required
			></v-text-field>
		</v-col>
		<v-col cols="12" class="button-wrapper">
			<v-btn large dark color="#33C88F" v-on:click="signUp()">USTVARI RAČUN</v-btn>
		</v-col>
	</v-row>
</template>

<script>
	export default {
		name: "SignUp",
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

				vm.axios.post('http://localhost:8080/user/create', {
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
	.button-wrapper {
		margin-bottom: 40px;
	}
</style>