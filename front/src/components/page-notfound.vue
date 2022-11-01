<template>
    <v-row class="d-flex justify-center align-center mt-9">
        <v-col cols="6">
            <v-card class="d-flex flex-column align-center pb-5 rounded-lg elevation-5">
                <img width="100%" src="https://seranking.com/blog/wp-content/uploads/2021/01/404_01-min.jpg" alt="">
                <v-spacer vertical></v-spacer>
                <v-btn @click="back" color="primary" class="text-right mt-5">back home</v-btn>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
import router from '@/router';

    export default {
        methods: {
            back() {
                router.push('/quiz')
            }
        },
        created() {
            setTimeout(() => {
                this.back()
            }, 3000);
        }
    }
</script>