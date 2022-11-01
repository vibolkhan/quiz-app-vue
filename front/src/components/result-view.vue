<template>
    <v-row class="d-flex flex-column justify-center align-center">
        <v-col cols=6>
            <v-card class="p-5 mt-9">
                <v-img src="https://www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.jpg"></v-img>
            </v-card>
            <v-card class="p-5 mt-3">
                <v-card-text>
                    <div class="text-h5">Your score is: {{allHistory[0].score}}/{{allHistory[0].answers.length}}</div>
                    <v-divider class="mt-3 mb-5"></v-divider>
                    <div>Your response has been recorded. See you next time.</div>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="6" class="py-0  mb-0">
            <p text class="text-right text-decoration-underline mb-0" @click="showResult = !showResult"><a class="blue--text">See result</a></p>
        </v-col>
        <v-col cols="6" v-if="showResult">
            <v-card
                v-for="(question, i) in allQuestion"
                :key="i"
                class="mx-auto mt-3 elevation-5"
                
            >    
                <v-alert   
                    dense
                    text
                    :type="allHistory[0].answers[i] == 'Null' ? 'error' : ''"
                    :icon="allHistory[0].answers[i] == 'Null' ? 'mdi-alert-circle-outline' : ''"
                >
                    <p class="pa-1" v-if="allHistory[0].answers[i] == 'Null'">You are not complete this question!</p>
                    <v-card-text 
                        class="text--primary d-flex"
                    >
                        <div class="text-h5">{{i+1}}. {{question.question}}</div>
                        <v-spacer vertical></v-spacer>
                    </v-card-text>
                    <v-divider class="mb-3"></v-divider>
                    <v-card-body>
                        <v-list-item
                            v-for="(item, index) in question.answer"
                            :key="index"
                            :value="index"
                        >
                            <v-alert text class="black--text" :class="{ 'red--text': allHistory[0].answers && allHistory[0].answers[i] == index, 'green--text': item.isCorrect}" width="100%">{{item.answerContent}}</v-alert>
                        </v-list-item>
                    </v-card-body>
                </v-alert>
            </v-card>
        </v-col>
        <v-col cols="6" class="text-center"><v-icon class="blue--text">mdi-copyright</v-icon> vibol khan <a href="question" class="blue--text"> back</a></v-col>
    </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    name: 'result-page',
    data() {
        return {
            headers: [
                { text: 'Title', value: 'question' },
                { text: 'Answers', value: 'answer' },
                { text: 'Action', value: 'actions' },
            ],
            index: 0,
            selectedAnswer: null,
            score: 0,
            showResult: false
        }
    },

    props: {
        answered: Array
    },

    methods: {
        ...mapActions(["fetchQuestion", "fetchHistory"]),
    },

    computed: mapGetters(["allQuestion", "allHistory"]),

    mounted() {
        this.fetchQuestion()
        this.fetchHistory()
        this.countScore()
    },
}
</script>