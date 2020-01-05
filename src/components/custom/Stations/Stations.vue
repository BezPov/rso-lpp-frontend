<template>
    <v-layout column>
        <v-flex px-3 shrink>
			<v-text-field
					v-model="searchQuery"
			/>
		</v-flex>

		<v-flex px-3 style="margin-bottom: 48px">
			<v-layout fill-height column v-if="data.length">
				<v-flex v-for="station in data" :key="station._id" shrink>
					<station-list-item
						:station="station"
					/>
				</v-flex>
			</v-layout>
		</v-flex>
    </v-layout>
</template>

<script>
    import StationListItem from "./StationListItem";
	export default {
        name: "Stations",
		components: {StationListItem},
		data() {
            return {
                data: [],
                isLoaded: true,
				searchQuery: ''
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

                const params = {};

                if (vm.searchQuery) {
                	params.q = vm.searchQuery;
				}

                vm.$requestsHandler.get('/api/parser/stations', { params })
                    .then((res) => {
                    	if (res.data.success) {
							vm.data = res.data.data;
						}
                    })
                    .catch((ex) => {
                        console.log(ex);
                    })
                    .finally(() => {

                    });
            }
        },
        computed: {},
		watch: {
			searchQuery() {
				const vm = this;

				vm.fetchData();
			}
		}
    }
</script>

<style scoped>

</style>