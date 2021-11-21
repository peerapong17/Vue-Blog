<template>
  <v-row justify="center" class="mt-8 fill-height">
    <v-col cols="9" md="6" sm="6">
      <v-form ref="form">
        <img
          v-if="imageUrl"
          :src="imageUrl"
          alt="imageForBlog"
          width="100%"
          class="mb-4"
          height="480"
        />
        <input
          type="file"
          ref="file"
          style="display: none"
          @change="onFilePicked"
        />
        <v-btn
          large
          outlined
          class="mb-5"
          color="primary"
          @click="onPickFile"
          block
          ><v-icon>mdi-upload</v-icon></v-btn
        >
        <v-Text-field
          :rules="[
            (v) => !!v || 'Title is required',
            (v) =>
              /[a-zA-Z\s]{6,}/g.test(v) ||
              'Title should contain at least 6 letter',
          ]"
          v-model="title"
          filled
          label="Title"
          required
        />
        <v-textarea
          :rules="[
            (v) => !!v || 'Content is required',
            (v) =>
              (v && v.length >= 30) ||
              'Content should be at least 30 characters long',
          ]"
          v-model="content"
          filled
          label="Content"
          required
          counter="30"
        />
        <v-select
          :items="categories"
          filled
          label="Category"
          v-model="category"
          :rules="[(v) => !!v || 'Category is required']"
        ></v-select>
        <div class="btn-container">
          <v-btn @click="onCreateBlog" large color="success" class="mr-2"
            >Create</v-btn
          >
          <v-btn @click="onCancel" large dark color="red">Cancel</v-btn>
        </div>
      </v-form>
      <v-alert
        dismissible
        width="450"
        style="position: absolute; bottom: 0; right:0"
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
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      title: "",
      content: "",
      category: "",
      imageUrl: "",
      imageFile: "",
      categories: ["Travel", "Food", "Culture", "Tradition"],
    };
  },
  methods: {
    ...mapActions(["createBlog"]),
    async onCreateBlog() {
      if (this.$refs.form.validate()) {
        const payload = {
          title: this.title,
          content: this.content,
          category: this.category,
          imageFile: this.imageFile,
        };
        await this.createBlog(payload);
        if (this.error === "") {
          this.$router.push("/home");
        }
      }
    },
    onPickFile() {
      this.$refs.file.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });

      fileReader.readAsDataURL(files[0]);
      this.imageFile = files[0];
    },
    onCancel() {
      this.$router.push("/home");
    },
  },
  computed: {
    ...mapState(["error"]),
  },
};
</script>

<style>
.btn-container {
  display: flex;
  justify-content: flex-end;
}
</style>
