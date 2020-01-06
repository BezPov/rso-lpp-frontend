<template>
    <v-text-field
            solo
            :value="value"
            @input="onChange"
            hide-details
            light
            :placeholder="placeholder"
            prepend-inner-icon="mdi-magnify"
            clearable
            append-icon="mdi-refresh"
            @click:append="$emit('refresh')"
    />
</template>

<script>
    export default {
        name: 'SearchField',
        props: {
            value: String,
            placeholder: String
        },
        methods: {
            onChange(value) {
                const vm = this;

                vm.$emit('change', value);
            }
        }
    }
</script>

<style lang="scss">

</style>