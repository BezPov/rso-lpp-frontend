<template>
	<v-app>
		<v-app-bar
				app
				color="#33C88F"
				dark
		>
		</v-app-bar>

		<v-content>
			<router-view/>
		</v-content>
	</v-app>
</template>

<script>
	export default {
		name: 'App',

		components: {

		},

		data: () => ({
			//
		}),
	};
</script>
