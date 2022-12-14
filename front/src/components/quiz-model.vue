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
          icon 
          class="white"
          v-if="type=='create'" 
          v-bind="attrs"
          v-on="on" 
          @click="showQuestionForm(true)"  
        >
          <v-icon class="blue--text">mdi-plus</v-icon>
        </v-btn>
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
            <v-img
              :src="'http://localhost:3000/uploads/'+profile" 
            ></v-img>
            <input
              type="file"
              label="Quiz title"
              placeholder="Quiz title"
              @change="onFileSelected"
              required
              class="mt-5"
              id="profile"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Quiz title"
              placeholder="Quiz title"
              :rules="rules.title"
              required
              v-model="title"
              class="text-capitalize"
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
import axios from 'axios'
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
      id: null,
      profile: null
    }),

    methods: {
      ...mapActions(['editQuiz', 'createQuiz', 'deleteQuiz']),
      clearForm() {
        this.title = null
        this.profile = null
        this.dialog = false
      },

      addQuiz() {
        if (this.$refs.form.validate()) {
          this.createQuiz({
            profile: this.profile,
            title: this.title,
            userId: sessionStorage.getItem('userId')
          })
          this.clearForm()
        }
      },

      upload(image) {
        const fd = new FormData()
        fd.append('profile', image)
        axios.post('http://localhost:3000/image', fd).then((res)=> {
          this.profile = res.data
          console.log(res.data);
        })
      },

      async onFileSelected(event){
        this.upload(event.target.files[0])
      },

      showDataInForm() {
        this.profile = this.data.profile
        this.id = this.data.id
        this.title = this.data.title
      },

      updateQuiz() {
        this.editQuiz(
          {
            profile: this.profile,
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