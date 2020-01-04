<template>
	<v-container>
		<v-container v-if="loggedIn">
			<v-row>
				<v-col cols="12">
					<img src="../assets/images/user-profile.png" class="small-profile-avatar">
				</v-col>
				<v-col cols="12">
					<v-text-field
							v-model="currentUser.name"
							label="Ime"
							dense
							disabled
					></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-text-field
							v-model="currentUser.surname"
							label="Priimek"
							dense
							disabled
					></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-text-field
							v-model="currentUser.phone"
							label="Telefon"
							dense
							disabled
					></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-text-field
							v-model="currentUser.cardId"
							label="Številka kartice Urbana"
							dense
							disabled
					></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-btn large dark color="#33C88F" v-on:click="logout()">ODJAVA</v-btn>
				</v-col>
			</v-row>
		</v-container>
		<v-container v-else>
			<router-view></router-view>
		</v-container>
	</v-container>
</template>

<script>
	export default {
		name: "Profile",
		data() {
			return {
				email: '',
				password: ''
			};
		},
		methods: {
			logout() {
				let vm = this;

				vm.$store.commit('logout');
			}
		},
		computed: {
			loggedIn() {
				return this.$store.state.user.loggedIn;
			},
			currentUser() {
				return this.$store.state.user;
			}
		}
	}
</script>

<style scoped lang="scss">
	.small-profile-avatar {
		width: 80px;
		height: 80px;
		border-radius: 80px;
	}
</style>