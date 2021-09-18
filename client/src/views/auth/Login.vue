<template>
  <v-container fluid style="height: 100%">
    <v-row
      justify="center"
      style="height: 100%; position: relative"
      align-content="center"
    >
      <v-col md="4" sm="8" class="d-flex justify-center">
        <v-card elevation="3" class="card pa-6 rounded-lg" width="100%">
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
          <div class="createAccountOrForgetPasswordBox">
            <router-link :to="{ name: 'Register' }" class="createAccount"
              >Don't have an account?</router-link
            >
            <router-link :to="{ name: 'EnterEmail' }" class="forgetPassword"
              >Forget Password?</router-link
            >
          </div>

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
            @click="googleSignin"
            ><img src="@/assets/google.jpg" width="25" class="mr-2" />
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
    googleSignin() {
      window.open("http://localhost:3000/auth/google", "_self");
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

<style scope>
.card {
  max-width: 400px;
}
.createAccountOrForgetPasswordBox {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.forgetPassword,
.createAccount {
  text-decoration: none;
}

.forgetPassword:hover,
.createAccount:hover {
  text-decoration: underline;
}
</style>
