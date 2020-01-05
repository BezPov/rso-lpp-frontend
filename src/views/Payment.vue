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

			<v-dialog
					v-model="dialog"
					max-width="290"
			>
				<v-card>
					<v-card-title class="headline">Pošljite nam povratne informacije</v-card-title>

					<v-card-text>
						Koliko je znašala zamuda avtobusa?

						<v-slider
								v-model="busDelay"
								:tick-labels="ticksLabels"
								:max="3"
								step="1"
								ticks="always"
								tick-size="4"
								color="#33C88F"
						></v-slider>

						Koliko gneče je na avtobusu?

						<v-slider
								v-model="croudAmount"
								:tick-labels="ticksLabels"
								:max="3"
								step="1"
								ticks="always"
								tick-size="4"
								color="#33C88F"
						></v-slider>
					</v-card-text>

					<v-card-actions>
						<v-spacer></v-spacer>

						<v-btn
								color="red"
								text
								@click="dialog = false"
						>
							Ne pošlji
						</v-btn>

						<v-btn
								color="#33C88F"
								text
								@click="sendFeedback"
						>
							Pošlji
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
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
				value: 0,
				dialog: false,
				busDelay: 0,
				croudAmount: 0,
				ticksLabels: [
					'Nič',
					'Malo',
					'Srednje',
					'Veliko',
				]
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
					vm.$requestsHandler.post('/api/payment/transaction/create', {
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
									vm.dialog = true;
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
			},
			sendFeedback() {
				let vm = this;

				let feedbackData = {
					userId: vm.$store.state.user._id,
					arrivalDelay: vm.busDelay,
					croudAmount: vm.croudAmount,
					busNumber: 7,
					stationId: 6007
				};

				vm.$requestsHandler.post('/api/feedback/feedback/create', feedbackData)
				.then(function (response) {
					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
				});

				vm.dialog = false;
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