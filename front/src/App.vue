<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app color="primary" v-if="$route.meta.hideNavbar != true"> 
      <v-img src="./assets/logo.png" class="my-5" contain height="50" />
      <v-divider></v-divider>

      <v-list dense nav >
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to" color="white">
          <v-list-item-icon>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app v-if="$route.meta.hideNavbar != true">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer vertical></v-spacer>
      <v-toolbar-title class="d-flex">
        <v-icon color="black" class="mr-3">mdi-bell-outline</v-icon>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
            <v-avatar size="40px">
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" lt="John">
            </v-avatar>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item-group
              v-model="selectedItem"
              color="primary"
            >
              <v-list-item
                v-for="(item, i) in subMenu"
                :key="i"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-toolbar-title>
    </v-app-bar>
    <v-main style="background-color: #eee; padding-bottom: 11px;">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import router from './router';

export default {
  data: () => ({
    drawer: null,
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/' },
      { title: 'Quizzes', icon: 'mdi-image', to: '/quiz' },
    ],
    subMenu: [
      {title: 'Logout', icon: 'mdi-logout-variant'}
    ],
    right: null,
    show: false,
    selectedItem: null
  }),
  watch: {
    selectedItem(value) {
      if (value == 0) {
        router.push('/logout')
      }
    }
  }
}
</script>