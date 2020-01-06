<template>
	<v-layout column v-if="isLoaded">

	</v-layout>
	<v-layout v-else>
		Loading
	</v-layout>
</template>

<script>
	import axios from 'axios';

	export default {
		name: "BusDetails",
		data() {
			return {
				data: {},
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

				//vm.$requestsHandler.get(`/api/parser/buses/${vm.$route.params.busId}`)
				axios.get(`http://localhost:8082/buses/${vm.$route.params.busId}`)
						.then((res) => {
							if (res.data.success) {
								vm.data = res.data.data;
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