<template>
    <v-container>
      <div class="d-flex justify-space-between mt-5 mb-2">
        <h3 class="font-weight-medium">My Quizzes</h3>

        <QuestionForm type='create' class="mr-1"/>
      </div>
      <v-data-table :headers="headers" :items="myQuizzes" :items-per-page="5" item-key="name" class="elevation-1"
        :footer-props="{
          showFirstLastPage: true,
          firstIcon: 'mdi-arrow-collapse-left',
          lastIcon: 'mdi-arrow-collapse-right',
          prevIcon: 'mdi-minus',
          nextIcon: 'mdi-plus'
        }">
        <template v-slot:[`item.actions`]="data">
          <slot name="data" :data="{ data }">
            <v-btn icon>
              <QuestionForm type='edit' :data='data.item'/>
            </v-btn>
            <v-btn icon @click="deleteQuiz(data.item.id)" >
              <v-icon color="error">mdi-delete</v-icon>
            </v-btn>
          </slot>
        </template>
      <template v-slot:[`item.profile`]="data">
          <slot name="data" :data="{data}">
            <v-btn icon>
              <v-avatar @click="getQuizId(data.item.id)">
                <img
                  class="pa-1"
                  :src="'http://localhost:3000/uploads/'+data.item.profile"
                >
              </v-avatar>
            </v-btn>
          </slot>
        </template>
      </v-data-table>
      <div class="d-flex justify-space-between mt-9 mb-2">
        <h3 class="font-weight-medium">All Quizzes</h3>
      </div>
      <v-data-table :headers="headers" :items="allQuiz" :items-per-page="5" item-key="name" class="elevation-1"
        :footer-props="{
          showFirstLastPage: true,
          firstIcon: 'mdi-arrow-collapse-left',
          lastIcon: 'mdi-arrow-collapse-right',
          prevIcon: 'mdi-minus',
          nextIcon: 'mdi-plus'
        }">
        <template v-slot:[`item.actions`]="data">
          <slot name="data" :data="{ data }">
            <v-btn class="blue white--text" @click="playQuiz(data.item.id)">
              Play
            </v-btn>
          </slot>
        </template>
      <template v-slot:[`item.profile`]="data">
          <slot name="data" :data="{data}">
            <v-avatar>
              <img
                class="pa-1"
                :src="'http://localhost:3000/uploads/'+data.item.profile"
              >
            </v-avatar>
          </slot>
        </template>
      </v-data-table>
    </v-container>
</template>
<script>
import QuestionForm from './quiz-model.vue'
import { mapGetters, mapActions } from "vuex";
import router from '@/router';
export default {
data() {
  return {
    headers: [
      { text: 'Quiz Profile', value: 'profile' },
      { text: 'Title', value: 'title' },
      { text: 'Action', value: 'actions' },
    ],
    dailog: false
  }
},
methods: {
  ...mapActions(['fetchQuizzes', 'deleteQuiz', 'fetchMyQuizzes']),
  getQuizId(id) {
    sessionStorage.setItem('quizId', id)
    router.push('/question')
  },
  playQuiz(id) {
    sessionStorage.setItem('quizId', id)
    router.push(`/play/${id}`)
  },
},

computed: mapGetters(["allQuiz", 'myQuizzes']),

mounted() {
  this.fetchQuizzes()
  this.fetchMyQuizzes()
},

components: {
  QuestionForm,
}

}
</script>