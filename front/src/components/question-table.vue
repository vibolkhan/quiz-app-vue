<template>
  <v-container>
    <div class="d-flex justify-space-between mt-5 mb-2 align-center">
      <h3 class="font-weight-medium"><v-btn icon class="white mr-3" @click="$router.push('/quiz')"><v-icon>mdi-arrow-left</v-icon></v-btn>My Questions</h3>
      <QuestionForm type='create' class="mr-1"/>
    </div>
    <v-data-table :headers="headers" :items="allQuestion" :items-per-page="5" item-key="name" class="elevation-1"
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
          <v-btn icon @click="deleteQuestion(data.item.id)" >
            <v-icon color="error">mdi-delete</v-icon>
          </v-btn>
        </slot>
      </template>
      <template v-slot:[`item.answer`]="data">
        <slot name="data" :data="{data}">
          <v-chip class="ml-2" :color="ans.isCorrect ? 'success' : '' " v-for="ans in data.item.answer" :key="ans">{{ans.answerContent}}</v-chip>
        </slot>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import QuestionForm from './question-model.vue'
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      headers: [
        { text: 'Title', value: 'question' },
        { text: 'Answers', value: 'answer' },
        { text: 'Action', value: 'actions' },
      ],
      dailog: false
    }
  },
  methods: {
    ...mapActions(["fetchQuestion", "deleteQuestion"]),
  },
computed: mapGetters(["allQuestion"]),
  mounted() {
    this.fetchQuestion()
  },
  components: {
    QuestionForm,
  }
}
</script>
