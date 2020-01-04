<template>
	<v-layout>
		Map
		<div>
			<map-tile></map-tile>
		</div>
	</v-layout>
</template>

<script>
	import MapTile from '../components/generic/MapTile';

	export default {
		name: "Map",
		components: {
			MapTile
		}
	}
</script>

<style scoped>

</style>