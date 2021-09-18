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
              prepend-inner-icon="mdi-key"
              label="Password"
              type="password"
              solo
              :rules="[
                (v) => !!v || 'New password is required',
                (v) =>
                  (v && v.length >= 6) ||
                  'Password should be at least 6 characters',
              ]"
              v-model="password"
            ></v-text-field>
            <v-text-field
              background-color="#fff2ff"
              prepend-inner-icon="mdi-restart"
              label="ConfirmPassword"
              type="password"
              solo
              :rules="[
                (v) => !!v || 'Confirm-Password is required',
                (v) => password === confirmPassword || 'password must match',
              ]"
              v-model="confirmPassword"
            ></v-text-field>
          </v-form>
          <v-btn
            @click="onSubmit"
            :loading="isLoading"
            :disabled="isLoading"
            large
            color="primary"
            style="width: 100%"
            ><h2>OK</h2></v-btn
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
  props: {
    userId: String,
    token: String,
  },
  data() {
    return {
      password: "",
      confirmPassword: "",
      error: "",
      success: "",
      isLoading: false,
    };
  },
  created() {
    console.log(this.userId, this.token);
  },
  methods: {
    async onSubmit() {
      if (this.$refs.form.validate()) {
        this.isLoading = true;
        try {
          const { data } = await axios.request(
            `http://localhost:3000/reset-password/enter-new-password/${this.userId}/${this.token}`,
            {
              method: "POST",
              data: { password: this.password },
            }
          );
          this.isLoading = false;
          this.success = data.message;
          setTimeout(() => {
            this.$router.push({ name: "Login" });
          }, 3000);
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
</style>
