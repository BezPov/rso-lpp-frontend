<template>
    <v-card class="mb-3 py-3">
        <v-layout align-center px-3 pb-2>
            <v-flex shrink mr-3>
                <v-chip color="primary">
                    <h2 class="font-weight-regular">{{ arrival.busNumber }}</h2>
                </v-chip>
            </v-flex>

            <h3 class="text-left font-weight-regular text-uppercase font-weight-bold grey--text text--darken-2">{{ arrival.busName }}</h3>
        </v-layout>

        <v-layout px-4>
            <v-flex v-for="({ minutes, time}, index) in arrival.arrivals.slice(0, 3)" :key="index" shrink mr-4>
                <h3 :class="{ 'grey--text font-weight-regular': (index !== 0), 'grey--text text--darken-2': (index === 0) }">{{ minutes }} min</h3>
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