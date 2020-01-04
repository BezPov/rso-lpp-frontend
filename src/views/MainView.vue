<template>
	<div class="overflow-hidden">
		<div class="text-center mb-2">
			<router-view/>
		</div>
		<v-bottom-navigation
				v-model="bottomNav"
				:active.sync="bottomNav"
				color="#33C88F"
				grow
				fixed
		>
			<v-btn value="schedules" to="/schedules">
				<v-icon>mdi-bus</v-icon>
			</v-btn>

			<v-btn value="map" to="/map">
				<v-icon>mdi-map</v-icon>
			</v-btn>

			<v-btn value="payment" to="/payment">
				<v-icon>mdi-credit-card-outline</v-icon>
			</v-btn>

			<v-btn value="profile" to="/profile">
				<v-icon>mdi-account</v-icon>
			</v-btn>
		</v-bottom-navigation>
		</div>
</template>

<script>
	export default {
		name: "MainView",
		data () {
			return {
				bottomNav: 'schedules',
			}
		}
	}
</script>

<style scoped>

</style>