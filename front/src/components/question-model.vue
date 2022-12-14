<template>
  <v-row :justify="type=='edit' ? 'center' : 'end'">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-if="type=='edit'" v-bind="attrs" v-on="on" @click="showDataInForm" color="accent">mdi-pencil</v-icon>
        <v-btn 
          v-if="type=='create'" 
          v-bind="attrs" v-on="on" 
          @click="showQuestionForm(true)" 
          icon 
          class="white"
        >
          <v-icon class="blue--text">mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5" v-if="type=='create'">Create a Question</span>
          <span class="text-h5" v-if="type=='edit'">Edit a Question</span>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-col cols="12">
              <v-text-field
                label="Question"
                placeholder="Question"
                :rules="rules.name"
                required
                v-model="question"
              ></v-text-field>
            </v-col>
            <v-col cols="6" >
              <v-img width="50%" :src="'http://localhost:3000/uploads/'+imagePath"></v-img>
            </v-col>
            <v-col cols="12">
              <input type="file" id="image" @change="onFileSelected"/> 
            </v-col>
            <v-col cols="12">
              <v-radio-group 
                v-model="radios"                         
                :rules="rules.radio"
              >
                <label for="">Answers</label>
                  <v-radio value="answer1">
                    <template v-slot:label>
                      <v-text-field
                        v-model="answer1"
                        :rules="rules.name"
                        label="Answer"
                        placeholder="Answer"
                        required
                      ></v-text-field>
                    </template>
                  </v-radio>
                  <v-radio value="answer2">
                    <template v-slot:label>
                      <v-text-field
                        v-model="answer2"
                        :rules="rules.name"
                        label="Answer"
                        placeholder="Answer"
                        required
                      ></v-text-field>
                    </template>
                  </v-radio>
                  <v-radio value="answer3">
                    <template v-slot:label>
                      <v-text-field
                        v-model="answer3"
                        :rules="rules.name"
                        label="Answer"
                        placeholder="Answer"
                        required
                      ></v-text-field>
                    </template>
                  </v-radio>
                  <v-radio value="answer4">
                    <template v-slot:label>
                      <v-text-field
                        v-model="answer4"
                        :rules="rules.name"
                        label="Answer"
                        placeholder="Answer"
                        required
                      ></v-text-field>
                    </template>
                  </v-radio>
              </v-radio-group>
            </v-col>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="clearForm"
          >
            Close
          </v-btn>
          <v-btn
            v-if="type == 'create'"
            color="accent"
            text
            @click="addQuestion"
          >
            Save
          </v-btn>
          <v-btn
            v-else
            color="accent"
            text
            @click="updateQuestion"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios'
  import { mapActions } from "vuex";
  export default {
    props: {
      type: String,
      data: Object
    },

    data: () => ({
      dialog: false,
      rules: {
        name: [val => (val || '').length > 0 || 'This field is required'],
        radio: [val => (val || '').length > 0 || ''],
      },
      radios: '',
      question: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      id: null,
      imagePath: null,
    }),

    methods: {
      ...mapActions(["createQuestion", 'editQuestion', 'fetchQuestions']),

      upload(image) {
        const fd = new FormData()
        fd.append('profile', image)
        axios.post('http://localhost:3000/image', fd).then((res)=> {
          this.imagePath = res.data
          console.log(res.data);
        })
      },

      async onFileSelected(event){
        this.upload(event.target.files[0])
      },

      addQuestion() {
        if (sessionStorage.getItem('quizId') && this.$refs.form.validate()) {
          this.createQuestion({
            quizId: sessionStorage.getItem('quizId'),
            question: this.question,
            answer: [
              {answerContent: this.answer1, isCorrect: this.radios=='answer1'},
              {answerContent: this.answer2, isCorrect: this.radios=='answer2'},
              {answerContent: this.answer3, isCorrect: this.radios=='answer3'},
              {answerContent: this.answer4, isCorrect: this.radios=='answer4'},
            ],
            image: this.imagePath
          })
          this.clearForm()
        }
      },

      updateQuestion() {
        if (this.$refs.form.validate()) {
          this.editQuestion({
            id: this.id,
            question: this.question,
            image: this.imagePath,
            answer: [
              {answerContent: this.answer1, isCorrect: this.radios=='answer1'},
              {answerContent: this.answer2, isCorrect: this.radios=='answer2'},
              {answerContent: this.answer3, isCorrect: this.radios=='answer3'},
              {answerContent: this.answer4, isCorrect: this.radios=='answer4'},
            ]
          })
          this.clearForm()
        }
      }, 

      showDataInForm() {
        this.id = this.data.id
        this.imagePath = this.data.image
        this.question= this.data.question
        const answers = this.data.answer
        this.answer1 = answers[0].answerContent
        this.answer2 = answers[1].answerContent
        this.answer3 = answers[2].answerContent
        this.answer4 = answers[3].answerContent
        for (const i in answers) {
          if (answers[i].isCorrect) {
            const index = parseInt(i)+1
            this.radios = 'answer'+index
          }
        }
        this.showQuestionForm()
      },
      
      clearForm() {
        this.question = ''
        this.answer1 = ''
        this.answer2 = ''
        this.answer3 = ''
        this.answer4 = ''
        this.radios = ''
        this.dialog = false
        this.imagePath = null
      }
    },
  }
</script>