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

				<v-toolbar-title>Prijava z Urbano</v-toolbar-title>
			</v-app-bar>
		</template>

		<template v-slot:content>
			<v-layout column fill-height>
				<v-flex mt-4>
					<v-layout column align-center>
						<v-flex mb-4>
							<v-progress-circular
									:rotate="-90"
									:size="300"
									:width="15"
									:value="value"
									color="primary"
									v-on:click="cardLogin()"
							>
								{{ label }}
							</v-progress-circular>
						</v-flex>

						<v-flex mt-4>
							<router-link to="/profile/">
								Prijavi se z geslom
							</router-link>
						</v-flex>
					</v-layout>
				</v-flex>
			</v-layout>
		</template>
	</main-container>
</template>

<script>
    import MainContainer from "../../generic/MainContainer";
	export default {
        name: "CardLogin",
		components: { MainContainer },
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

                vm.$requestsHandler.post('/api/account/user/cardLogin', {
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
</style>