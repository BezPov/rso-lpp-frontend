<template>
    <v-app>
        <v-content class="app-container">
			<v-layout column fill-height>
				<router-view/>
			</v-layout>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: 'App',

        components: {},

        data() {
            return {}
        },
        created() {
        }
    };
</script>

<style>
	.app-container {
		position: absolute;
		padding: 0 !important;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
</style>
