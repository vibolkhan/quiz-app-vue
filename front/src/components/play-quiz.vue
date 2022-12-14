<template>
    <v-row align="end" justify="center" >
        <v-col cols="6" v-if="allQuestionToPlay.length > 0">
            <div
                v-for="(question, i) in allQuestionToPlay"
                :key="i"
            >
                <v-card
                    class="mx-auto mt-9 elevation-5"
                    v-if="index == i"
                >    
                    <v-card-text 
                        class="text--primary d-flex"
                    >
                        <div class="text-h5">{{i+1}}. {{question.question}}</div>
                        <v-spacer vertical></v-spacer>
                        <div class="timer blue rounded text-h6 px-3 white--text">{{timerCount}}</div>
                    </v-card-text>
                    <div class="text-center d-flex justify-center">
                        <v-img :src="'http://localhost:3000/uploads/'+question.image" max-width="500px"></v-img>
                    </div>
                    <v-divider></v-divider>
                    <v-card-body>
                        <v-list>
                            <v-list-item-group
                                v-model="selectedAnswer"
                            >
                                <template v-for="(item, i) in question.answer">
                                    <v-divider
                                        v-if="!item"
                                        :key="`divider-${i}`"
                                    ></v-divider>
                                    <v-list-item
                                        v-else
                                        :key="`item-${i}`"
                                        :value="i"
                                        class="px-5 py-0 my-0"
                                        color="blue"
                                        @click="setCorrectAnswer(question.answer[i].isCorrect ? i : null)"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title v-text="item.answerContent"></v-list-item-title>
                                        </v-list-item-content>                                    
                                    </v-list-item>
                                </template>
                            </v-list-item-group>
                        </v-list>
                    </v-card-body>
                    <v-divider></v-divider>
                    <v-card-actions>
                        {{index+1}}/{{allQuestionToPlay.length}}
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue"
                            text
                            @click="clickNext"
                            :disabled="allQuestionToPlay.length == index || selectedAnswer == null"
                        >
                            Next
                            <v-icon>mdi-arrow-right-circle</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </v-col>
        <v-col cols="6" v-else>
            <v-card class="mt-3">
                <v-card-text 
                    class="text--primary"
                >
                    <v-card-text 
                        class="text--error d-flex"
                    >
                        <h1 class="error--text">There is no question!</h1>
                    </v-card-text>
                    <v-divider class="mb-3"></v-divider>
                    <v-card-actions class="d-flex">
                        <v-spacer vertical></v-spacer>
                        <v-btn class="blue white--text" @click="$router.push('/quiz')">Back</v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import router from "@/router";
import { mapGetters, mapActions } from "vuex";
import bcrypt from 'bcryptjs';
export default {
    data() {
        return {
            headers: [
                { text: 'Title', value: 'question' },
                { text: 'Answers', value: 'answer' },
                { text: 'Action', value: 'actions' },
            ],
            dialog: false,
            index: 0,
            timerCount: 15,
            answered: [],
            selectedAnswer: null,
            correctAnswer: null,
            score: 0,
            model: false
        }
    },

    methods: {
        ...mapActions(['fetchQuestionToPlay', 'createHistory']),
        clickNext() {
            if (this.correctAnswer == this.selectedAnswer && this.selectedAnswer != null) {
                this.score ++
            } 
            if (this.selectedAnswer != null) {
                this.answered.push(this.selectedAnswer)
            } else {
                this.answered.push('Null')
            }
            this.index ++
            this.timerCount = 15
            this.selectedAnswer = null
        },
        nextQuestion() {
            this.clickNext()
            this.countDownTimer()
        },
        countDownTimer () {
            if (this.timerCount > 0) {
                setTimeout(() => {
                    this.timerCount -= 1
                    this.countDownTimer()
                }, 1000)
            } else {
                setTimeout(() => {
                    this.nextQuestion()
                }, 1000);
            }
        },
        seeResult() {
            if (sessionStorage.getItem('quizId')) {
                this.createHistory({quizId: sessionStorage.getItem('quizId'), answers: this.answered, score: this.score})
                router.push("/result");
            }
        },
        back() {
            router.push('/quiz')
        },
        setCorrectAnswer(value) {
            this.correctAnswer = value
        },
        encryptRoute(route) { 
            const salt = bcrypt.genSaltSync(10)
            return bcrypt.hashSync(route, salt)
        },
    },

    computed: mapGetters(["allQuestionToPlay"]),

    watch: {
        index: {
            handler(value) {
                if (value == this.allQuestionToPlay.length) {
                    this.seeResult()
                }
            },
        },
    },
    mounted() {
        this.fetchQuestionToPlay()
        this.countDownTimer()
        if (! sessionStorage.getItem('quizId')) {
            router.push('/quiz')
        }
    },
}
</script>