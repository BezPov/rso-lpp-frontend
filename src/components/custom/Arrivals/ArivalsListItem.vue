<template>
    <v-card class="mb-3 pb-3">
        <v-card-title>{{ arrival.busNumber }}</v-card-title>

        <v-layout column px-4>
            <v-flex>
                <h3>{{ arrival.estimatedTimeOfArrival }} min</h3>
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