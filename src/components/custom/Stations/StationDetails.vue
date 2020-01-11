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

                <v-toolbar-title>{{ data ? data.name : 'Nalagam postajo ...' }}</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn v-if="data" icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </v-app-bar>
        </template>

        <template v-slot:content>
            <v-layout column fill-height>
                <v-flex v-if="state === 'loading'" pa-3>
                    <v-layout fill-height justify-center align-center>
                        <v-progress-circular
                                :size="64"
                                color="primary"
                                indeterminate
                        />
                    </v-layout>
                </v-flex>

                <v-flex v-else-if="state === 'error'" pa-3>
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
                        <v-flex shrink style="height: 200px;" relative>
                            <v-layout class="image-container" column fill-height py-4 px-1>
                                <v-flex grow></v-flex>

                                <v-flex shrink class="white--text px-3">
                                    <h1 class="text-uppercase font-weight-regular">{{ data.name }}</h1>
                                    <h3 class="font-weight-regular">{{ data.referenceId }}</h3>
                                    <h3 v-if="data.referenceId % 2 === 0" class="mt-1 text-left font-weight-regular">Iz centra</h3>
                                    <h3 v-else class="mt-1 text-left font-weight-regular">V center</h3>
                                </v-flex>
                            </v-layout>
                        </v-flex>

                        <v-flex px-3>
                            <v-layout column>
                                <v-flex mt-4 mb-2 shrink>
                                    <h3 class="font-weight-regular text-uppercase">Relacije:</h3>
                                </v-flex>

                                <v-flex shrink>
                                    <v-layout style="overflow-x: auto; margin: 0 -12px;" px-3 pb-2>
                                        <v-chip v-for="bus in data.routes" :key="bus.busNumber" color="primary"
                                                class="mr-2 flex-shrink-0">
                                            <h2 class="font-weight-regular">{{ bus.busNumber }}</h2>
                                        </v-chip>
                                    </v-layout>
                                </v-flex>

                                <v-flex mb-3 shrink>
                                    <v-layout align-center>
                                        <v-flex>
                                            <h3 class="font-weight-regular text-uppercase">Prihodi:</h3>
                                        </v-flex>

                                        <v-flex shrink>
                                            <v-btn
                                                    class="ma-0"
                                                    icon
                                                    @click="fetchArrivals"
                                                    color="black"
                                            >
                                                <v-icon>mdi-refresh</v-icon>
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>

                                <v-flex v-if="liveArrivals.state === 'loading'" shrink mt-3>
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
                </v-flex>
            </v-layout>
        </template>
    </main-container>
</template>

<script>
	import ArrivalListItem from "../Arrivals/ArivalsListItem";
	import MainContainer from "../../generic/MainContainer";

	export default {
		name: "StationDetails",
		components: { MainContainer, ArrivalListItem },
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

				vm.$requestsHandler.stationsService.get(`/${vm.$route.params.stationId}`)
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

				vm.liveArrivals.state = 'loading';

				vm.$requestsHandler.arrivalsService.get(`/${vm.$route.params.stationId}/live`)
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
    .image-container {
        background-color: #484848;
        background-image: url("../../../assets/images/LPP.png");
        background-position: center;
        background-size: cover;
    }
</style>