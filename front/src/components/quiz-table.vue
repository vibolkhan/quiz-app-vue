<template>
    <v-container>
      <div class="d-flex justify-space-between mt-5 mb-2">
        <h3 class="font-weight-medium">Configurer une année fiscale</h3>
        <v-icon>mdi-information-outline</v-icon>
      </div>
      <QuestionForm type='create'/>
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
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                >
              </v-avatar>
            </v-btn>
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
  ...mapActions(["fetchQuizzes", 'deleteQuiz']),
  getQuizId(id) {
    sessionStorage.setItem('quiz_id', id)
    router.push('/question')
  }
},

computed: mapGetters(["allQuiz"]),

mounted() {
  this.fetchQuizzes()
},

components: {
  QuestionForm,
}

}
</script>