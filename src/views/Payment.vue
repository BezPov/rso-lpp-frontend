<template>
	<v-layout>
		<v-container v-if="loggedIn">
			Plačajte voznino tukaj
		</v-container>
		<v-container v-else>
			Za plačilo voznine morate biti prijavljeni v aplikaciji.
		</v-container>
	</v-layout>
</template>

<script>
	export default {
		name: "Payment",
		computed: {
			loggedIn() {
				return this.$store.state.user.loggedIn;
			}
		}
	}
</script>

<style scoped>

</style>