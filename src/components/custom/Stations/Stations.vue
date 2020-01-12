<template>
    <main-container>
        <template v-slot:appBar>
            <v-app-bar
                    app
                    primary
                    class="primary relative search-toolbar"
                    dark
            >
                <v-layout fill-height align-center>
                    <v-flex>
                        <search-field
                                placeholder="Išči po postajah ..."
                                @change="searchQuery = $event"
                                @refresh="fetchData"
                        />
                    </v-flex>
                </v-layout>
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
                            <p class="text-center grey--text">Pri pridobivanju postaj je prišlo do napake, poskusite
                                ponovno</p>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex v-else>
					<template v-if="searchQuery">
						<v-layout column v-if="data.length">
							<v-flex v-for="station in data" :key="station._id" shrink>
								<station-list-item
										:station="station"
								/>
							</v-flex>
						</v-layout>
						<v-layout v-else column fill-height justify-center align-center>
							<v-flex shrink mb-4>
								<v-icon color="grey" size="64">mdi-information-outline</v-icon>
							</v-flex>

							<v-flex shrink>
								<p class="text-center grey--text">Ni rezultatov</p>
							</v-flex>
						</v-layout>
					</template>
					<template v-else>
						<v-layout v-if="favouriteStations.length" column>
							<v-flex pb-2>
								<v-expansion-panels
										v-model="expansionPanels.favouriteStations"
										class="station-expansion-panel-container"
										multiple
								>
									<v-expansion-panel
											class="station-expansion-panel transparent"
									>
										<v-expansion-panel-header>Priljubljene postaje</v-expansion-panel-header>

										<v-expansion-panel-content>
											<v-layout v-if="favouriteStations.length" column pt-2>
												<v-flex v-for="station in favouriteStations" :key="station._id" shrink>
													<station-list-item
															:station="station"
													/>
												</v-flex>
											</v-layout>
										</v-expansion-panel-content>
									</v-expansion-panel>
								</v-expansion-panels>
							</v-flex>

							<v-flex shrink mb-3>
								<v-divider/>
							</v-flex>
						</v-layout>

						<v-layout column v-if="otherStations.length">
							<p>Ostale postaje</p>

							<v-flex v-for="station in otherStations" :key="station._id" shrink>
								<station-list-item
										:station="station"
								/>
							</v-flex>
						</v-layout>
					</template>
                </v-flex>
            </v-layout>
        </template>
    </main-container>
</template>

<script>
	import StationListItem from "./StationListItem";
	import SearchField from "../../generic/SearchField";
	import MainContainer from "../../generic/MainContainer";

	export default {
		name: "Stations",
		components: { MainContainer, SearchField, StationListItem },
		data() {
			return {
				data: [],
				state: 'idle',
				searchQuery: '',
				expansionPanels: {
					favouriteStations: [0]
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

				const params = {};

				if (vm.searchQuery) {
					params.q = vm.searchQuery;
				}

				vm.$requestsHandler.stationsService.get('/', { params })
					.then((res) => {
						if (res.data.success) {
							vm.data = res.data.data;

							vm.state = 'idle';
						} else {
							vm.state = 'error';
						}
					})
					.catch((ex) => {
						console.log(ex);

						vm.state = 'error';
					});
			}
		},
		computed: {
			favouriteStations() {
				return this.$store.getters.favouriteStations;
			},
			otherStations() {
				const vm = this;

				const favouriteStations = vm.favouriteStations;

				const allStations = vm.data;

				return allStations.filter((station) => {
					return !favouriteStations.find((favouriteStation) => favouriteStation._id === station._id);
				});
			}
		},
		watch: {
			searchQuery() {
				const vm = this;

				vm.fetchData();
			}
		}
	}
</script>

<style lang="scss">
	.station-expansion-panel-container {
		background: transparent;
		border-radius: 0 !important;

		.station-expansion-panel {
			.v-expansion-panel-header {
				min-height: 32px !important;
				padding: 0;
			}

			&::after, &::before {
				box-shadow: none !important;
			}
		}

		.v-expansion-panel-content__wrap {
			padding: 0;
		}
	}
</style>