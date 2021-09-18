<template>
  <v-container fluid style="height: 100%;" class="container">
    <v-row
      justify="center"
      style="height: 100% ; position: relative"
      align-content="center"
    >
      <v-col md="4" sm="8" class="d-flex justify-center">
        <v-card elevation="3" class="card pa-6 rounded-lg" width="100%">
          <span class="text-center d-block mb-6 display-1 font-weight-bold "
            >Register</span
          >
          <v-form ref="form" lazy-validation>
            <v-text-field
              background-color="#fff2ff"
              prepend-inner-icon="mdi-account"
              label="Username"
              solo
              :rules="[(v) => !!v || 'Username is required']"
              v-model="username"
            ></v-text-field>
            <v-text-field
              background-color="#fff2ff"
              prepend-inner-icon="mdi-email"
              label="Email"
              solo
              :rules="[
                (v) => !!v || 'Email is required',
                (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
              ]"
              v-model="email"
            ></v-text-field>
            <v-text-field
              type="password"
              background-color="#fff2ff"
              prepend-inner-icon="mdi-key"
              label="Password"
              :rules="[
                (v) => !!v || 'password is required',
                (v) =>
                  (v && v.length >= 6) || 'Name must be at least 6 characters',
              ]"
              solo
              v-model="password"
            ></v-text-field>
            <v-text-field
              type="password"
              background-color="#fff2ff"
              prepend-inner-icon="mdi-restart"
              label="Confirm-Password"
              solo
              :rules="[
                (v) => !!v || 'confirmPassword is required',
                (v) => password === confirmPassword || 'password must match',
              ]"
              v-model="confirmPassword"
              required
            ></v-text-field>
          </v-form>
          <router-link :to="{ name: 'Login' }" class="login"
            >Already have an account?</router-link
          >
          <v-btn
            @click="onSubmit"
            :loading="isLoading"
            :disabled="isLoading"
            large
            color="success lighten-2"
            style="width: 100%"
            ><h2>Register</h2></v-btn
          >
        </v-card>
        <v-alert
          border="left"
          style="position: absolute; bottom: 0;"
          transition="slide-y-reverse-transition"
          dismissible
          text
          width="450"
          :value="error || success !== ''"
          :type="error ? 'error' : 'success'"
          >{{ error ? error : success }}</v-alert
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
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    ...mapActions(["createUser"]),
    ...mapMutations(["gotError"]),
    async onSubmit() {
      if (this.$refs.form.validate()) {
        const user = {
          username: this.username,
          email: this.email,
          password: this.password,
        };
        await this.createUser(user);
        if (this.error === "") {
          setTimeout(() => {
            this.$router.push({ name: "Login" });
          }, 5000);
        }
      }
    },
  },
  computed: {
    ...mapState(["isLoading", "error", "success"]),
  },
  destroyed() {
    this.gotError("");
  },
};
</script>

<style scoped>
.card {
  max-width: 400px;
}

.login {
  text-decoration: none;
  margin-bottom: 10px;
  float: right;
}

.login:hover {
  text-decoration: underline;
}
</style>
