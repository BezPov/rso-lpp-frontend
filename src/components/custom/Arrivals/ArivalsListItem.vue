<template>
    <v-card class="mb-3 pb-3">
        <v-card-title>{{ arrival.busNumber }}</v-card-title>

        <v-layout px-4>
            <v-flex v-for="({ minutes, time}, index) in arrival.arrivals.slice(0, 3)" :key="index" shrink mr-4>
                <h3 :class="{ 'grey--text font-weight-regular': (index !== 0) }">{{ minutes }} min</h3>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
    export default {
        name: "ArrivalListItem",
        props: {
            arrival: Object
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>