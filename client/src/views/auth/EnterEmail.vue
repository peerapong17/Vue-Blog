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
            >Forget Password</span
          >
          <v-form ref="form" lazy-validation>
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
          </v-form>
          <router-link :to="{ name: 'Login' }" class="login"
            >Login?</router-link
          >
          <v-btn
            @click="onSubmit"
            :loading="isLoading"
            :disabled="isLoading"
            large
            color="primary"
            style="width: 100%"
            ><h2>Send</h2></v-btn
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
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      error: "",
      success: "",
      isLoading: false,
    };
  },
  methods: {
    async onSubmit() {
      if (this.$refs.form.validate()) {
        this.isLoading = true;
        try {
          const { data } = await axios.request(
            "http://localhost:3000/reset-password/enter-email",
            {
              method: "POST",
              data: { email: this.email },
            }
          );
          this.isLoading = false;
          this.success = data.message;
        } catch (error) {
          this.isLoading = false;
          this.error = error;
        }
      }
    },
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
