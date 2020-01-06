<template>
    <v-text-field
            solo
            :value="value"
            @input="onKeyDown"
            hide-details
            light
            :placeholder="placeholder"
            prepend-inner-icon="mdi-magnify"
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
            onKeyDown(value) {
                const vm = this;

                vm.$emit('change', value);
            }
        }
    }
</script>

<style lang="scss">

</style>