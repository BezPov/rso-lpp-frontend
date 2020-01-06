<template>
    <v-layout column fill-height>
        <v-flex shrink>
            <slot name="appBar"></slot>
        </v-flex>

        <v-flex grow relative>
            <div class="container-content-wrapper">
                <slot name="content"></slot>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: 'MainContainer'
    };
</script>

<style>
    .container-content-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow-y: auto;
    }
</style>