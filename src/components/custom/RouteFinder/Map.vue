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

			</v-layout>
		</template>
	</main-container>
</template>

<script>
	import MapTile from '../../generic/MapTile';
	import MainContainer from "../../generic/MainContainer";

	export default {
		name: "Map",
		components: {
			MainContainer,
			MapTile
		}
	}
</script>

<style scoped>

</style>