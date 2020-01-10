<template>
    <v-container>
        <v-form>

            <v-row>
                <v-col cols="12">
                    <v-layout justify-center>
                        <img src="../../../assets/images/user-profile.png" class="profile-avatar">
                    </v-layout>
                </v-col>

                <v-col cols="12">
                    <v-text-field
                            v-model="email"
                            label="E-pošta"
                            single-line
                            outlined
                            hide-details
                            required
                    ></v-text-field>
                </v-col>

                <v-col cols="12">
                    <v-text-field
                            v-model="password"
                            label="Geslo"
                            type="password"
                            single-line
                            outlined
                            hide-details
                            required
                    ></v-text-field>
                </v-col>

                <v-col cols="12">
                    <v-layout justify-center>
                        <v-btn
                                large
                                rounded
                                class="primary"
                                @click="login()"
                                :loading="state === 'logging_in'"
                        >
                            PRIJAVA
                        </v-btn>
                    </v-layout>
                </v-col>

                <v-col cols="12">
                    <v-layout justify-center>
                        <router-link to="/profile/signup">
                            Ustvari račun
                        </router-link>
                    </v-layout>
                </v-col>

                <v-col cols="12">
                    <v-layout justify-center>
                        <router-link to="/profile/cardLogin">
                            Prijavi se z urbano
                        </router-link>
                    </v-layout>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                email: '',
                password: '',
                state: 'idle'
            }
        },
        methods: {
            login() {
                let vm = this;

                vm.state = 'logging_in';

                vm.$requestsHandler.post('/api/account/user/login', {
                    email: vm.email,
                    password: vm.password
                })
                    .then(function (response) {
                        console.log(response);

                        if (response && response.status === 200) vm.$store.commit('login', response.data);

                        // get user's credit account data
                        vm.$requestsHandler.get(`/api/payment/creditAccount/${response.data._id}`)
                            .then(function (creditResponse) {
                                if (creditResponse) vm.$store.commit('appendCreditAccount', creditResponse.data);
                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                    })
                    .catch(function (error) {
                        console.log(error);
                    }).finally(() => {
                    vm.state = 'idle';
                })
            }
        }
    }
</script>

<style lang="scss">
    .profile-avatar {
        width: 150px;
        height: 150px;
        border-radius: 150px;
    }
</style>