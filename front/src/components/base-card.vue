<template>
  <v-container>
    <div class="d-flex justify-space-between mt-5 mb-2">
      <h3 class="font-weight-medium"><v-icon class="mr-3">mdi-cog</v-icon><span class="blue--text">Paramètres comptables</span> / Ajouter une condition de règlement </h3>
      <v-icon>mdi-information-outline</v-icon>
    </div>
    <v-divider></v-divider>
    <v-card class="mt-5">
      <v-card-title>
        Ajouter une condition de règlement
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field v-model="firstname" :rules="nameRules" :counter="10" label="First name" required>
                </v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="lastname" :rules="nameRules" :counter="10" label="Last name" required>
                </v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-checkbox label="Utilisable pour les devis" color="success" v-model="isCheck"></v-checkbox>
        </v-form>
      </v-card-text>
    </v-card>
    <v-spacer></v-spacer>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    firstname: '',
    lastname: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 10 || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    isCheck: false,
  }),
}
</script>