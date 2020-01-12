<template>
    <v-card class="mb-3 py-2" @click="openStationDetails">
        <v-layout column pb-1 pl-3 mx-2>
            <v-flex>
                <v-layout align-center>
                    <v-flex xs8>
						<v-layout justify-center align-center>
							<v-flex v-if="station.referenceId % 2 !== 0" shrink mr-2>
								<v-layout justify-center align-center>
									<v-icon>mdi-record-circle-outline</v-icon>
								</v-layout>
							</v-flex>

							<v-flex>
								<h3 class="text-left font-weight-regular text-uppercase font-weight-bold grey--text text--darken-2">
									{{ station.name }}</h3>
							</v-flex>
						</v-layout>
                    </v-flex>

                    <v-flex xs4>
                        <v-layout justify-end align-center>
							<v-btn
									v-if="isFavourite"
									class="ma-0"
									icon
									color="primary"
									@click.stop="$store.commit('removeFavouriteStation', station)"
							>
								<v-icon>mdi-star</v-icon>
							</v-btn>

							<v-btn
									v-else
									class="ma-0"
									icon
									@click.stop="$store.commit('addFavouriteStation', station)"
							>
								<v-icon>mdi-star-outline</v-icon>
							</v-btn>
						</v-layout>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex>
				<p class="mb-0 text-left">{{ station.referenceId }}</p>

				<p v-if="station.referenceId % 2 === 0" class="mb-0 text-left">Iz centra</p>
				<p v-else class="mb-0 text-left">V center</p>
			</v-flex>
        </v-layout>
    </v-card>
</template>

<script>
	export default {
		name: "StationListItem",
		props: {
			station: Object
		},
		methods: {
			openStationDetails() {
				const vm = this;

				vm.$router.push({ name: 'stationDetails', params: { stationId: vm.station.stationId } })
			}
		},
		computed: {
			isFavourite() {
				return !!this.$store.getters.favouriteStations.find((favouriteStation) => favouriteStation._id === this.station._id);
			}
		}
	}
</script>

<style scoped>

</style>