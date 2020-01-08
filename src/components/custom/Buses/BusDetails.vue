<template>
    <main-container>
        <template v-slot:appBar>
            <v-app-bar
                    color="primary"
                    dark
            >
                <v-btn
                        icon
                        @click="$router.back()"
                >
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>

                <v-toolbar-title v-if="data">{{ data.name }}</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn v-if="data" icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </v-app-bar>
        </template>

        <template v-slot:content>
            <v-layout column fill-height pa-3>
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
                            <p class="text-center grey--text">Pri pridobivanju podatkov o relaciji je prišlo do napake,
                                poskusite ponovno</p>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex v-else>
                    <v-layout fill-height column>
                        <v-flex mb-2 shrink>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </template>
    </main-container>
</template>

<script>
    import MainContainer from "../../generic/MainContainer";

    export default {
        name: "BusDetails",
        components: {MainContainer},
        data() {
            return {
                data: null,
                state: 'loading'
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

                vm.$requestsHandler.busService.get(`${vm.$route.params.busId}`)
                    .then((res) => {
                        if (res.data.success) {
                            vm.data = res.data.data;

                            vm.state = 'success';
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
        computed: {}
    }
</script>

<style scoped>

</style>