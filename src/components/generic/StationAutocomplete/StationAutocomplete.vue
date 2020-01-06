<template>
    <v-autocomplete
            v-model="selectedItem"
            :items="items"
            :loading="isLoading"
            :search-input.sync="searchQuery"
            clearable
            hide-details
            item-text="name"
            item-value="symbol"
            label="Iščite po postajah ..."
            solo
            return-object
            @input="$emit('select', $event)"
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
                    color="primary"
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
</template>

<script>
    export default {
        name: 'StationAutocomplete',
        data() {
            return {
                searchQuery: '',
                isLoading: false,
                items: [],
                selectedItem: null
            };
        },
        methods: {
            fetchData() {
                const vm = this;

                vm.isLoading = true;

                const params = {};

                if (vm.searchQuery) {
                    params.q = vm.searchQuery;
                }

                vm.$requestsHandler.get('/api/parser/stations', { params })
                    .then((res) => {
                        if (res.data.success) {
                            vm.items = res.data.data;
                        }
                    })
                    .catch((ex) => {
                        console.log(ex);
                    })
                    .finally(() => {
                        vm.isLoading = false;
                    });
            }
        },
        watch: {
            searchQuery() {
                const vm = this;

                vm.fetchData();
            }
        }
    }
</script>