<template>
  <v-app>
    <v-navigation-drawer color="#1356ba" v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6 white--text">
            {{ username }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-h6 white--text">
            {{ id }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="{ name: item.link }"
        >
          <v-list-item-icon>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="#1356ba" app>
      <v-app-bar-nav-icon
        color="white"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="white--text">Blog</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
      class="shrink"
      hide-details
      single-line
      v-model="searchInput"
      solo
      placeholder="Search..."
      append-icon="mdi-magnify"
      @click:append="onSearch"
    ></v-text-field>
      <v-btn @click="dialog = true" color="red lighten-1" class="white--text ml-3"
        >Logout<v-icon right>mdi-logout</v-icon></v-btn
      >
    </v-app-bar>

    <v-main class="v-main">
      <router-view></router-view>
    </v-main>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="text-h5">
          Are you sure?
        </v-card-title>

        <v-card-text>
          You will be directed to the home page.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text color="primary" @click="dialog = false">
            cancel
          </v-btn>

          <v-btn color="red lighten-1" class="white--text" @click="onLogout">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "App",

  data: () => {
    return {
      id: "",
      username: "",
      dialog: false,
      drawer: false,
      searchInput: ""
    };
  },
  created() {
    this.username = localStorage.getItem("username");
    this.id = localStorage.getItem("id");
  },
  methods: {
    ...mapActions(["logout"]),
    ...mapMutations(["getBlogBySearchInput"]),
    onLogout() {
      this.logout().then(() => {
        this.dialog = false;
        localStorage.clear();
        this.$router.push({ name: "Login" });
      });
    },
    onSearch(){
      this.getBlogBySearchInput(this.searchInput)
    }
  },
  computed: {
    ...mapState(["items"]),
  },
};
</script>

<style scoped></style>
