<template>
  <v-row justify="center" class="mt-8 mb-4">
    <v-col cols="9" md="6" sm="6">
      <v-form ref="form">
        <img
          v-if="blog.imagePath"
          :src="blog.imagePath"
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
          :rules="[(v) => !!v || 'Title is required']"
          v-model="blog.title"
          filled
          label="Title"
          required
        />
        <v-textarea
          :rules="[(v) => !!v || 'Content is required']"
          v-model="blog.content"
          filled
          label="Content"
          required
        />
      </v-form>
      <v-row>
        <v-spacer></v-spacer>
        <v-btn @click="onUpdate" color="primary" class="mt-3">Update</v-btn>
        <v-btn
          @click="onDelete"
          color="red lighten-1"
          class="mt-3 ml-2 white--text"
          >Delete</v-btn
        >
        <v-btn @click="onCancel" outlined color="warning" class="mt-3 ml-2"
          >Cancel</v-btn
        >
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      imageFile: "",
    };
  },
  async created() {
    await this.fetchSpicificData(this.$route.params.blog_id);
  },
  methods: {
    ...mapActions(["fetchSpicificData", "updateBlog", "deleteBlog"]),
    onPickFile() {
      this.$refs.file.click();
    },
    onCancel() {
      this.$router.push("/user-blog");
    },
    onFilePicked(event) {
      const files = event.target.files;
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.blog.imagePath = fileReader.result;
      });

      fileReader.readAsDataURL(files[0]);
      this.imageFile = files[0];
    },
    async onUpdate() {
      const payload = {
        title: this.blog.title,
        content: this.blog.content,
        imageFile: this.imageFile,
        blogId: this.blog.id,
      };
      await this.updateBlog(payload);
      this.$router.push("/user-blog");
    },
    async onDelete() {
      await this.deleteBlog(this.blog.id);
      this.$router.push("/user-blog");
    },
  },
  computed: {
    ...mapState(["blog"]),
  },
};
</script>

<style></style>
