<template>
	<v-layout column fill-height>
		<v-flex grow relative>
			<div class="bottom-navigation-content">
				<router-view/>
			</div>
		</v-flex>

		<v-flex shrink>
			<v-bottom-navigation
					v-model="selectedItem"
					color="primary"
					grow
			>
				<v-btn
						v-for="navigationItem in navigationItems"
						:key="navigationItem.key"
						:value="navigationItem.key"
						:to="navigationItem.href"
				>
					<span>{{ navigationItem.label }}</span>
					<v-icon>{{ navigationItem.icon }}</v-icon>
				</v-btn>
			</v-bottom-navigation>
		</v-flex>
	</v-layout>
</template>

<script>
	export default {
		name: "BottomNavigationView",
		data () {
			return {
				selectedItem: ''
			}
		},
		computed: {
			navigationItems() {
				return [
					{
						key: 'stations',
						href: '/stations',
						icon: 'mdi-bus-stop',
						label: 'Postaje'
					},
					{
						key: 'buses',
						href: '/buses',
						icon: 'mdi-bus',
						label: 'Relacije'
					},
					{
						key: 'route',
						href: '/route',
						icon: 'mdi-map',
						label: 'Iskanje poti'
					},
					{
						key: 'payment',
						href: '/payment',
						icon: 'mdi-credit-card-outline',
						label: 'Plačevanje'
					},
					{
						key: 'profile',
						href: '/profile',
						icon: 'mdi-account',
						label: 'Uporabnik'
					}
				];
			}
		}
	}
</script>

<style scoped>
	.bottom-navigation-content {
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
	}
</style>