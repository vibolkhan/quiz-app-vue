<template>
    <v-row align="end" justify="center" >
        <v-col cols="6">
            <div
                v-for="(question, i) in allQuestion"
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
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue"
                            text
                            @click="clickNext"
                            :disabled="allQuestion.length == index || selectedAnswer == null"
                        >
                            Next
                            <v-icon>mdi-arrow-right-circle</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </v-col>
        <v-row justify="center" v-if="dialog">
            <v-dialog
                v-model="dialog"
                persistent
                max-width="500"
            >
                <v-card>
                    <v-card-title class="text-h5">
                        You did it!
                    </v-card-title>
                    <v-card-text>Do you want to see your result?</v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue"
                        text
                        @click="seeResult"
                    >
                        View Result
                    </v-btn>
                    <v-btn
                        color="error"
                        text
                        @click="back"
                    >
                        Cancle
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </v-row>
</template>

<script>
import router from "@/router";
import { mapGetters, mapActions } from "vuex";
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
        ...mapActions(['fetchQuestion', 'createHistory']),
        clickNext() {
            if (this.selectedAnswer && this.correctAnswer == this.selectedAnswer) {
                this.score ++
                console.log(this.score);
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
            if (sessionStorage.getItem('quiz_id')) {
                this.createHistory({quiz_id: sessionStorage.getItem('quiz_id'), answers: this.answered, score: this.score})
                router.push("/result");
            }
        },
        back() {
            router.push('/question')
        },
        setCorrectAnswer(value) {
            this.correctAnswer = value
        }
    },

    computed: mapGetters(["allQuestion"]),

    watch: {
        index: {
            handler(value) {
                if (value == this.allQuestion.length) {
                    this.dialog = true
                }
            },
        },
    },
    mounted() {
        this.fetchQuestion()
        this.countDownTimer()
        if (!sessionStorage.getItem('quiz_id')) {
            router.push('/quiz')
        }
    },
}
</script>