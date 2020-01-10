<template>
	<v-card class="mb-3 py-2" @click="openBusDetails">
		<v-layout column pa-3 mx-2>
			<h2 class="text-left font-weight-regular text-uppercase font-weight-bold grey--text text--darken-2">{{ bus.busNumber }} {{ bus.name }}</h2>
		</v-layout>
	</v-card>
</template>

<script>
    export default {
        name: "BusListItem",
        props: {
			bus: Object
        },
        methods: {
            openBusDetails() {
                const vm = this;

                vm.$router.push({name: 'busDetails', params: {busId: vm.bus.busId}})
            }
        }
    }
</script>

<style scoped>

</style>