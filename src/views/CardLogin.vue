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
				cardId: '1234',
				label: 'Prislonite kartico urbana k napravi',
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

				vm.axios.post('http://localhost:8080/user/cardLogin', {
					cardId: vm.cardId
				})
					.then(function (response) {
						console.log(response);
						vm.interval = setInterval(() => {
							if (vm.value === 100) {
								clearInterval(vm.interval);
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
</style>