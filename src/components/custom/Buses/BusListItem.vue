<template>
    <v-card class="mb-3 py-2" @click="openBusDetails">
		<v-layout column px-3>
			<h2 class="text-left font-weight-regular">{{ bus.name }}</h2>

			<p class="mb-0 text-left">{{ bus.busNumber }}</p>
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