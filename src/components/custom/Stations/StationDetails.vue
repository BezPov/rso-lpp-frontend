<template>
	<v-layout column v-if="isLoaded">
		<v-flex px-3>
			<h1>{{ data.name }}</h1>
		</v-flex>

		<v-flex px-3>
			<v-layout wrap>
				<v-chip v-for="bus in data.routes" :key="bus.busNumber" class="mr-2 mb-3">
					{{ bus.busNumber }}
				</v-chip>
			</v-layout>
		</v-flex>

		<v-flex px-3 mb-2>
			<h2>Prihodi:</h2>
		</v-flex>

		<v-flex v-for="(arrival, index) in additionalData.liveArrivals.data" :key="index" mx-3>
			<arrival-list-item
				:arrival="arrival"
			/>
		</v-flex>
	</v-layout>
	<v-layout v-else>
		Loading
	</v-layout>
</template>

<script>
	import ArrivalListItem from "../Arrivals/ArivalsListItem";
	export default {
		name: "StationDetails",
		components: {ArrivalListItem},
		data() {
			return {
				data: {},
				additionalData: {
					liveArrivals: {
						isLoaded: false,
						data: []
					}
				},
				isLoaded: false
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

				vm.isLoaded = false;

				vm.$requestsHandler.get(`/api/parser/stations/${vm.$route.params.stationId}`)
						.then((res) => {
							if (res.data.success) {
								vm.data = res.data.data;

								vm.$requestsHandler.get(`/api/parser/arrivals/${vm.$route.params.stationId}/live`)
										.then((res) => {
											if (res.data.success) {
												vm.additionalData.liveArrivals.data = res.data.data;
											}
										})
										.catch((ex) => {
											console.log(ex);
										})
										.finally(() => {
											vm.additionalData.liveArrivals.isLoaded = true;
										});
							}
						})
						.catch((ex) => {
							console.log(ex);
						})
						.finally(() => {
							vm.isLoaded = true;
						});
			}
		},
		computed: {}
	}
</script>

<style scoped>

</style>