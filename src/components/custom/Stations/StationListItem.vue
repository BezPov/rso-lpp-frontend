<template>
    <v-card class="mb-3 py-2" @click="openStationDetails">
		<v-layout column px-3 py-1 mx-2>
			<h3 class="text-left font-weight-regular text-uppercase font-weight-bold grey--text text--darken-2">{{ station.name }}</h3>

			<p class="mb-0 text-left">{{ station.referenceId }}</p>

			<p v-if="station.referenceId % 2 === 0" class="mb-0 text-left">Iz centra</p>
			<p v-else class="mb-0 text-left">V center</p>
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

                vm.$router.push({name: 'stationDetails', params: {stationId: vm.station.stationId}})
            }
        }
    }
</script>

<style scoped>

</style>