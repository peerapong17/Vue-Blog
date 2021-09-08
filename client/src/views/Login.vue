<template>
  <v-container fluid style="height: 100%">
    <v-row
      justify="center"
      style="height: 100%; position: relative"
      align-content="center"
    >
      <v-col md="4" sm="8" class="d-flex justify-center">
        <v-card elevation="3" class="pa-6 rounded-lg" width="100%">
          <v-form ref="form" lazy-validation>
            <span class="text-center d-block mb-6 display-1 font-weight-bold "
              >Login</span
            >
            <v-text-field
              background-color="#e6fffa"
              prepend-inner-icon="mdi-email"
              label="Email"
              solo
              v-model="username"
            ></v-text-field>
            <v-text-field
              background-color="#e6fffa"
              prepend-inner-icon="mdi-key"
              label="Password"
              solo
              v-model="password"
              type="password"
            ></v-text-field>
          </v-form>
          <router-link :to="{ name: 'Register' }" class="text-end d-block mb-4"
            >Don't have an account?</router-link
          >

          <v-btn
            :loading="isLoading"
            :disabled="isLoading"
            @click="onSubmit"
            large
            color="#f9ccff"
            style="width: 100%"
            ><h2>Register</h2></v-btn
          >
          <v-btn
            large
            color="white"
            elevation="1"
            class="mt-2"
            style="width: 100%"
            ><v-icon dense left class="mr-3">mdi-google</v-icon>
            <h3>Login with Google</h3></v-btn
          >
        </v-card>
        <v-alert
          dismissible
          width="450"
          style="position: absolute; bottom: 0;"
          transition="slide-y-reverse-transition"
          border="left"
          text
          absolute
          type="error"
          :value="error !== ''"
          >{{ error }}</v-alert
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["loginUser"]),
    ...mapMutations(["gotError"]),
    async onSubmit() {
      if (this.username.trim() !== "" && this.password.trim() !== null) {
        const user = {
          username: this.username,
          password: this.password,
        };
        await this.loginUser(user);
        if (this.error === "") {
          this.$router.push("/home");
        }
      }
    },
  },
  computed: {
    ...mapState(["error", "isLoading"]),
  },
  destroyed() {
    this.gotError("");
  },
};
</script>

<style>
.text-end {
  text-decoration: none;
}
.text-end:hover {
  text-decoration: underline;
}
</style>
