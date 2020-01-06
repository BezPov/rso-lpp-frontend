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

                <v-toolbar-title v-if="data">{{ data.name }}</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn v-if="data" icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </v-app-bar>
        </template>

        <template v-slot:content>
            <v-layout column fill-height pa-3>
                <v-flex v-if="state === 'loading'">
                    <v-layout fill-height justify-center align-center>
                        <v-progress-circular
                                :size="64"
                                color="primary"
                                indeterminate
                        />
                    </v-layout>
                </v-flex>

                <v-flex v-else-if="state === 'error'">
                    <v-layout column fill-height justify-center align-center>
                        <v-flex shrink mb-4>
                            <v-icon color="grey" size="64">mdi-alert</v-icon>
                        </v-flex>

                        <v-flex shrink>
                            <p class="text-center grey--text">Pri pridobivanju podatkov o postaji je prišlo do napake,
                                poskusite ponovno</p>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex v-else>
                    <v-layout fill-height column>
                        <v-flex shrink>
                            <v-layout wrap>
                                <v-chip v-for="bus in data.routes" :key="bus.busNumber" class="mr-2 mb-3">
                                    {{ bus.busNumber }}
                                </v-chip>
                            </v-layout>
                        </v-flex>

                        <v-flex mb-2 shrink>
                            <h3 class="font-weight-regular">Prihodi:</h3>
                        </v-flex>

                        <v-flex v-if="liveArrivals.state === 'loading'" shrink>
                            <v-layout justify-center align-center>
                                <v-progress-circular
                                        :size="32"
                                        color="primary"
                                        indeterminate
                                />
                            </v-layout>
                        </v-flex>

                        <v-flex v-else-if="liveArrivals.state === 'error'" shrink>
                            <v-layout column justify-center align-center>
                                <v-flex shrink>
                                    <p class="text-center grey--text">Pri pridobivanju prihodov je prišlo do
                                        napake, poskusite ponovno</p>
                                </v-flex>
                            </v-layout>
                        </v-flex>

                        <v-flex v-else>
                            <v-layout v-if="liveArrivals.data.length" column>
                                <v-flex v-for="(arrival, index) in liveArrivals.data" :key="index">
                                    <arrival-list-item
                                            :arrival="arrival"
                                    />
                                </v-flex>
                            </v-layout>
                            <v-layout v-else column justify-center align-center>
                                <v-flex shrink>
                                    <p class="text-center grey--text">Prihodi za to postajo niso na voljo</p>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </template>
    </main-container>
</template>

<script>
    import ArrivalListItem from "../Arrivals/ArivalsListItem";
    import MainContainer from "../../generic/MainContainer";

	import axios from 'axios';

    export default {
        name: "StationDetails",
        components: {MainContainer, ArrivalListItem},
        data() {
            return {
                data: null,
                state: 'loading',
                liveArrivals: {
                    state: 'loading',
                    data: []
                }
            };
        },
        mounted() {
            const vm = this;

            vm.fetchData();
        },
        destroyed() {

        },
        methods: {
            fetchData() {
                const vm = this;

                vm.state = 'loading';
                vm.liveArrivals.state = 'loading';

                vm.$requestsHandler.get(`/api/parser/stations/${vm.$route.params.stationId}`)
                    .then((res) => {
                        if (res.data.success) {
                            vm.data = res.data.data;

                            vm.state = 'success';

                            vm.fetchArrivals();
                        }
                    })
                    .catch((ex) => {
                        console.log(ex);

                        vm.state = 'error';
                    });
            },
            async fetchArrivals() {
                const vm = this;

				axios.get(`http://localhost:8082/arrivals/${vm.$route.params.stationId}/live`)
                //vm.$requestsHandler.get(`/api/parser/arrivals/${vm.$route.params.stationId}/live`)
                    .then((res) => {
                        if (res.data.success) {
                            vm.liveArrivals.data = res.data.data;

                            vm.liveArrivals.state = 'success';
                        } else {
                            vm.liveArrivals.state = 'error';
                        }
                    })
                    .catch((ex) => {
                        console.log(ex);

                        vm.liveArrivals.state = 'error';
                    });
            }
        },
        computed: {}
    }
</script>

<style scoped>

</style>