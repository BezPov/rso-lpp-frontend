<template>
    <main-container>
        <template v-slot:appBar>
            <v-app-bar
                    app
                    primary
                    class="primary relative"
                    dark
            >
                <v-toolbar-title>Plačevanje z Urbano</v-toolbar-title>
            </v-app-bar>
        </template>

        <template v-slot:content>
            <v-layout fill-height column pa-3>
                <v-flex v-if="loggedIn">
                    <payment-content/>
                </v-flex>

                <v-flex v-else>
                    <v-layout fill-height column justify-center align-center>
                        <p class="grey--text">Za plačevanje morate biti prijavljeni</p>

                        <v-flex mt-3 shrink>
                            <router-link to="/profile">
								Prijavi se
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
    import PaymentContent from "./PaymentContent";

    export default {
        name: "Payment",
        components: {PaymentContent, MainContainer},
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
                let amount = this.$store.state.user.creditAccount;

                console.log("AMOUNT: ", amount);

                return `${amount.value / 100} EUR`;
            }
        }
    }
</script>

<style scoped>

</style>