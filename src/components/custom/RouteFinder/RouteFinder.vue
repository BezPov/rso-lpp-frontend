<template>
    <main-container>
        <template v-slot:appBar>
            <v-app-bar
                    app
                    primary
                    class="primary relative"
                    dark
            >
                <v-toolbar-title>Iskanje poti</v-toolbar-title>
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
                        <v-flex shrink mb-3>
                            <p class="font-weight-regular mb-2">Začetna postaja</p>

                            <station-autocomplete
                                    @select="selectedStations.from = $event"
                            />
                        </v-flex>

                        <v-flex shrink mb-4>
                            <p class="font-weight-regular mb-2">Končna postaja</p>

                            <station-autocomplete
                                    @select="selectedStations.to = $event"
                            />
                        </v-flex>

                        <v-flex shrink mt-4>
                            <v-layout justify-center>
                                <v-btn
                                        class="primary"
                                        :disabled="!selectedStations.to || !selectedStations.from"
                                    >
                                    Najdi pot
                                </v-btn>
                            </v-layout>
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
    import StationAutocomplete from "../../generic/StationAutocomplete/StationAutocomplete";

    export default {
        name: "RouteFinder",
        components: {StationAutocomplete, MainContainer},
        data() {
            return {
                data: [],
                state: 'idle',
                searchQuery: '',
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

                vm.$requestsHandler.busService.get('/', { params })
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
            }
        }
    }
</script>

<style scoped>

</style>