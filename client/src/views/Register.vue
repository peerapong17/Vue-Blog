<template>
  <v-container fluid style="height: 100%">
    <v-row
      justify="center"
      style="height: 100% ; position: relative"
      align-content="center"
    >
      <v-col md="4" sm="8" class="d-flex justify-center">
        <v-card elevation="3" class="pa-6 rounded-lg" width="100%">
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
              :rules="[(v) => !!v || 'confirmPassword is required']"
              v-model="confirmPassword"
              required
            ></v-text-field>
          </v-form>
          <router-link :to="{ name: 'Login' }" class="text-end d-block mb-4"
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
          :value="error !== ''"
          type="error"
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
          this.$router.push("/login");
        }
      }
    },
  },
  computed: {
    ...mapState(["isLoading", "error"]),
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
