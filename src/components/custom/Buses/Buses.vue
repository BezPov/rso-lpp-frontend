<template>
    <main-container>
        <template v-slot:appBar>
            <v-app-bar
                    app
                    primary
                    class="primary relative search-toolbar"
                    dark
            >
                <v-layout fill-height align-center>
                    <v-flex>
                        <search-field
                                placeholder="Išči po relacijah ..."
                                @change="searchQuery = $event"
                                @refresh="fetchData"
                        />
                    </v-flex>
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
                            <p class="text-center grey--text">Pri pridobivanju relacij je prišlo do napake, poskusite
                                ponovno</p>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex v-else>
                    <v-layout fill-height column v-if="data.length">
                        <v-flex v-for="bus in data" :key="bus._id" shrink>
                            <bus-list-item
                                    :bus="bus"
                            />
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </template>
    </main-container>
</template>

<script>
    import BusListItem from "./BusListItem";

    import SearchField from "../../generic/SearchField";
    import MainContainer from "../../generic/MainContainer";

    export default {
        name: "Buses",
        components: {MainContainer, SearchField, BusListItem},
        data() {
            return {
                data: [],
                state: 'idle',
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