<template>
	<v-card class="mb-3 py-2" @click="openBusDetails">
		<v-layout column px-3 py-1 mx-2>
			<h3 class="text-left font-weight-regular text-uppercase font-weight-bold grey--text text--darken-2">{{ bus.busNumber }} {{ bus.name }}</h3>
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