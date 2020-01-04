<template>
	<v-layout>
		<v-container v-if="loggedIn">
			<div class="text-center">
				<v-progress-circular
						:rotate="-90"
						:size="300"
						:width="15"
						:value="value"
						color="#33C88F"
						v-on:click="makeTransaction()"
				>
					{{ label }}
				</v-progress-circular>
			</div>
			<p>Stanje na računu: <span>{{creditAccount}}</span></p>
		</v-container>
		<v-container v-else>
			Za plačilo voznine morate biti prijavljeni v aplikaciji.
		</v-container>
	</v-layout>
</template>

<script>
	export default {
		name: "Payment",
		data() {
			return {
				ticketPrice: 130, // CHANGE IF DIFFERENT
				label: 'PRISLONI',
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
			makeTransaction() {
				let vm = this;

				vm.status = 'reading';
				vm.label = 'Prosimo počakajte...';

				const creditAccount = vm.$store.state.user.creditAccount;

				if (creditAccount.value >= vm.ticketPrice) {
					vm.axios.post('http://35.225.182.234/api/payment/transaction/create', {
						creditAccount: creditAccount._id,
						price: vm.ticketPrice,
						type: 'pull'
					})
						.then(function (response) {
							console.log(response);
							vm.interval = setInterval(() => {
								if (vm.value === 100) {
									clearInterval(vm.interval);
									vm.label = 'SREČNO POT';
									vm.$store.commit('appendCreditAccount', response.data);
									return;
								}
								vm.value += 10
							}, 100)
						})
						.catch(function (error) {
							console.log(error);
						});
				} else {
					console.log("NO MONEY");
				}
			}
		},
		computed: {
			loggedIn() {
				return this.$store.state.user.loggedIn;
			},
			creditAccount() {
				let amount =  this.$store.state.user.creditAccount;

				console.log("AMOUNT: ", amount);

				return `${amount.value / 100} EUR`;
			}
		}
	}
</script>

<style scoped>

</style>