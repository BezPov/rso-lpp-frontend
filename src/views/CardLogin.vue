<template>
	<div class="text-center">
		<v-progress-circular
				:rotate="-90"
				:size="300"
				:width="15"
				:value="value"
				color="#33C88F"
				v-on:click="cardLogin()"
		>
			{{ label }}
		</v-progress-circular>
		<router-link to="/profile/">
			Prijavi se z geslom
		</router-link>
	</div>
</template>

<script>
	export default {
		name: "CardLogin",
		data() {
			return {
				status: 'idle',
				cardId: '1234', // CHANGE THIS VALUE FOR ANOTHER CARD
				label: 'Prislonite kartico Urbana k napravi',
				interval: {},
				value: 0
			}
		},
		beforeDestroy() {
			clearInterval(this.interval)
		},
		mounted() {

		},
		methods: {
			cardLogin() {
				let vm = this;

				vm.status = 'reading';
				vm.label = 'Prosimo počakajte...';

				vm.axios.post('http://35.225.182.234/api/account/user/cardLogin', {
					cardId: vm.cardId
				})
					.then(function (response) {
						console.log(response);
						vm.interval = setInterval(() => {
							if (vm.value === 100) {
								clearInterval(vm.interval);
								vm.status = 'idle';
								vm.label = 'Prijava uspešna';
								setTimeout(() => {
									if (response && response.status === 200) vm.$store.commit('login', response.data);
								}, 1000);
								return;
							}
							vm.value += 10
						}, 100)
					})
					.catch(function (error) {
						console.log(error);
					});
			}
		}
	}
</script>

<style scoped lang="scss">
	.v-progress-circular {
		margin: 1rem;
	}

	a {
		color: #5d5d5d !important;
		text-decoration: none;
	}
</style>