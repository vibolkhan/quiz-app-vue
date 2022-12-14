<template>
    <v-row justify="center">
        <v-col 
            cols="12"
            sm="8"
            md="5"
            lg="6"
            xl="4"
        >
            <v-card
                class="pa-9 mt-5"
            >
                <v-card-header>
                    <h1>Login Form</h1>
                </v-card-header>
                <v-divider class="mb-5 mt-3"></v-divider>
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                >
                    <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        hint="Enter you email"
                        required
                    ></v-text-field>
                
                    <v-text-field
                        v-model="password"
                        :append-icon="isShow ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="isShow ? 'text' : 'password'"
                        label="Password"
                        hint="Enter you password"
                        class="input-group--focused"
                        @click:append="isShow = !isShow"
                    ></v-text-field>
                    <small class="error--text" v-if="islogin">invalid email or password</small>
                    <v-btn
                        width="100%"
                        color="accent"
                        class="px-5 mt-5"
                        @click="clickLogin()"
                    >
                        Login
                    </v-btn>
                </v-form>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
import router from "@/router";
import { mapActions } from "vuex";
    export default {
        data: () => ({
            valid: true,
            password: '',
            isShow: false,
            email: '',
            islogin: false,
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 3 || 'Min 3 characters',
            emailMatch: () => (`The email and password you entered don't match`),
            },  
        }),

        methods: {
            ...mapActions(["login"]),
            clickLogin() {
                this.login({email: this.email, password: this.password})
                setTimeout(() => {
                    this.islogin = true
                }, 500);
            }
        },

        created() {
            if (sessionStorage.getItem('token')) {
                if (this.$route.meta.login) {
                    router.push('/quiz')
                } else {
                    router.push('/')
                    sessionStorage.removeItem('token')
                    sessionStorage.removeItem('quizId')
                    sessionStorage.removeItem('userId')
                }
            } else {
                router.push('/')
            }
        }
    }
</script>