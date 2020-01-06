<template>
    <main-container>
        <template v-slot:appBar>
            <v-app-bar
                    app
                    primary
                    class="primary relative"
                    dark
            >
                <v-layout fill-height align-center>
                    <h3 class="font-weight-regular">Iskanje poti</h3>
                </v-layout>
            </v-app-bar>
        </template>

        <template v-slot:content>
            <v-layout fill-height column pa-3>
                <v-flex v-if="state === 'loading'">
                    <v-layout fill-height justify-center align-center>
                        <v-progress-circular
                                :size="64"
                                color="primary"
                                indeterminate
                        />
                    </v-layout>
                </v-flex>

                <v-flex v-else-if="state === 'error'">
                    <v-layout column fill-height justify-center align-center>
                        <v-flex shrink mb-4>
                            <v-icon color="grey" size="64">mdi-alert</v-icon>
                        </v-flex>

                        <v-flex shrink>
                            <p class="text-center grey--text">Pri pridobivanju poti je prišlo do napake, poskusite
                                ponovno</p>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex v-else>
                    <v-layout fill-height column>
                        <v-flex>
                            <v-autocomplete
                                    v-model="selectedStations.from"
                                    :items="stations"
                                    :loading="isLoadingStations"
                                    :search-input.sync="fromStationSearch"
                                    clearable
                                    hide-details
                                    item-text="name"
                                    item-value="symbol"
                                    label="Iščite po postajah ..."
                                    solo
                                    return-object
                            >
                                <template v-slot:no-data>
                                    <v-list-item>
                                        <v-list-item-title>
                                            Vpišite iskano postajo
                                        </v-list-item-title>
                                    </v-list-item>
                                </template>

                                <template v-slot:item="{ item }">
                                    <v-list-item-avatar
                                            color="indigo"
                                            class="headline font-weight-light white--text"
                                    >
                                        {{ item.name.charAt(0) }}
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.name"></v-list-item-title>
                                        <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>
                                    </v-list-item-content>
                                </template>
                            </v-autocomplete>

                            {{ selectedStations.from }}
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </template>
    </main-container>
</template>

<script>
    import axios from 'axios';
    import MainContainer from "../../generic/MainContainer";

    export default {
        name: "RouteFinder",
        components: {MainContainer},
        data() {
            return {
                data: [],
                state: 'idle',
                searchQuery: '',
                fromStationSearch: '',
                isLoadingStations: false,
                stations: [],
                selectedStations: {
                    from: null,
                    to: null
                }
            };
        },
        mounted() {
            const vm = this;

        },
        destroyed() {

        },
        methods: {
            fetchData() {
                const vm = this;

                vm.state = 'loading';

                const params = {};

                if (vm.searchQuery) {
                    params.q = vm.searchQuery;
                }

                //vm.$requestsHandler.get('/api/parser/buses', { params })
                axios.get('http://localhost:8082/buses', {params})
                    .then((res) => {
                        if (res.data.success) {
                            vm.data = res.data.data;

                            vm.state = 'idle';
                        } else {
                            vm.state = 'error';
                        }
                    })
                    .catch((ex) => {
                        console.log(ex);

                        vm.state = 'error';
                    });
            }
        },
        computed: {},
        watch: {
            searchQuery() {
                const vm = this;

                vm.fetchData();
            },
            fromStationSearch(searchQuery) {
                const vm = this;

                vm.isLoadingStations = true;

                const params = {};

                if (searchQuery) {
                    params.q = searchQuery;
                }

                vm.$requestsHandler.get('/api/parser/stations', { params })
                    .then((res) => {
                        if (res.data.success) {
                            vm.stations = res.data.data;
                        }
                    })
                    .catch((ex) => {
                        console.log(ex);
                    })
                    .finally(() => {
                        vm.isLoadingStations = false;
                    });
            }
        }
    }
</script>

<style scoped>

</style>