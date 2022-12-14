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
            <v-card-text>
                <p class="pa-1 error--text " v-if="allHistory[0].answers[i] == 'Null'"> <v-icon color="error">mdi-alert-outline</v-icon> You are not complete this question!</p>
                <div class="text-h5" :class="{'error--text': allHistory[0].answers[i] == 'Null'}">{{i+1}}. {{question.question}}</div>
                <v-spacer vertical></v-spacer>
            </v-card-text>
                <div class="text-center d-flex justify-center">
                    <v-img 
                        :src="'http://localhost:3000/uploads/'+question.image" 
                        max-width="300px"           
                        max-height="300px"         
                    ></v-img>
                </div>
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
            </v-card>
        </v-col>
        <v-col cols="6" class="text-center"><v-icon class="blue--text">mdi-copyright</v-icon> vibol khan <a href="quiz" class="blue--text"> back</a></v-col>
    </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as easings from 'vuetify/lib/services/goto/easing-patterns'
import Vuetify from 'vuetify'
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
            showResult: true,
            type: 'number',
            number: 9999,
            selector: '#scroll-with-options',
            selected: 'Button',
            elements: ['Button', 'Radio group'],
            duration: 300,
            offset: 0,
            easing: 'easeInOutCubic',
            easings: Object.keys(easings),
        }
    },

    props: {
        answered: Array
    },

    methods: {
        ...mapActions(["fetchQuestion", "fetchHistory"]),
    },

    computed: {
        ...mapGetters(["allQuestion", "allHistory"]),
        target () {
        const value = this[this.type]
        if (!isNaN(value)) return Number(value)
        else return value
      },
      options () {
        return {
          duration: this.duration,
          offset: this.offset,
          easing: this.easing,
        }
      },
      element () {
        if (this.selected === 'Button') return this.$refs.button
        else if (this.selected === 'Radio group') return this.$refs.radio
        else return null
      },
    },

    mounted() {
        this.fetchQuestion()
        this.fetchHistory()
        Vuetify.goTo(this.target, this.options)
    },
}
</script>