<template>
  <v-row :justify="type=='edit' ? 'center' : 'end'">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-if="type=='edit'" v-bind="attrs" v-on="on" @click="showDataInForm" color="accent">mdi-pencil</v-icon>
        <v-btn v-if="type=='create'" v-bind="attrs" v-on="on" @click="showQuestionForm(true)" color="primary" class="my-5 mx-3">Create a quiz</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5" v-if="type=='create'">Create a quiz</span>
          <span class="text-h5" v-if="type=='edit'">Edit a quiz</span>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
          >
            <v-col cols="12">
              <v-text-field
                label="Quiz title"
                placeholder="Quiz title"
                :rules="rules.title"
                required
                v-model="title"
              ></v-text-field>
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
            @click="addQuiz"
          >
            Save
          </v-btn>
          <v-btn
            v-else
            color="accent"
            text
            @click="updateQuiz"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
import { mapActions } from 'vuex';

  export default {
    props: {
      type: String,
      data: Object
    },

    data: () => ({
      dialog: false,
      rules: {
        title: [val => (val || '').length > 0 || 'Quiz title is required'],
      },
      title: '',
      id: null
    }),

    methods: {
      ...mapActions(['editQuiz', 'createQuiz', 'deleteQuiz']),
      clearForm() {
        this.title = null
        this.dialog = false
      },

      addQuiz() {
        if (this.$refs.form.validate()) {
          this.createQuiz({
            title: this.title
          })
          this.clearForm()
        }
      },

      showDataInForm() {
        this.id = this.data.id
        this.title = this.data.title
      },

      updateQuiz() {
        this.editQuiz(
          {
            id: this.id,
            title: this.title,
          }
        )
        this.clearForm()
      }
    },
    created() {
      if (this.dialog) {
        this.$refs.form.reset()
      }
    }
  }
</script>