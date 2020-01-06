<template>
    <main-container>
		<template v-slot:appBar>
			<v-app-bar
					app
					primary
					class="primary relative"
					dark
			>
				<v-toolbar-title>Uporabnik</v-toolbar-title>
			</v-app-bar>
		</template>

		<template v-slot:content>
			<v-layout v-if="loggedIn" column pa-3>
				<v-flex mb-3>
					<v-layout justify-center>
						<img src="@/assets/images/user-profile.png" class="profile-avatar">
					</v-layout>
				</v-flex>

				<v-flex>
					<v-text-field
							v-model="currentUser.name"
							label="Ime"
							dense
							disabled
					></v-text-field>
				</v-flex>

				<v-flex>
					<v-text-field
							v-model="currentUser.surname"
							label="Priimek"
							dense
							disabled
					></v-text-field>
				</v-flex>

				<v-flex>
					<v-text-field
							v-model="currentUser.phone"
							label="Telefon"
							dense
							disabled
					></v-text-field>
				</v-flex>

				<v-flex>
					<v-text-field
							v-model="currentUser.cardId"
							label="Številka kartice Urbana"
							dense
							disabled
					></v-text-field>
				</v-flex>

				<v-flex>
					<v-layout justify-end>
						<v-btn large dark color="primary" v-on:click="logout()">ODJAVA</v-btn>
					</v-layout>
				</v-flex>
			</v-layout>
			<v-layout v-else pa-3>
				<router-view></router-view>
			</v-layout>
		</template>
	</main-container>
</template>

<script>
    import MainContainer from "../../generic/MainContainer";
	export default {
        name: "Profile",
		components: {MainContainer},
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