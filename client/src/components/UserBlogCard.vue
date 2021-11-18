<template>
  <v-col md="4">
    <v-card class="mx-4">
      <v-card-title class="headline font-weight-medium">{{
        title.substring(0, 1).toUpperCase() + title.substring(1)
      }}</v-card-title>
      <v-img height="250" :src="image"></v-img>
      <v-card-text>{{ content.substring(0, 90) + "..." }}</v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-actions>
        <v-btn @click.prevent="onDetail" outlined color="warning">Edit</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="onAddLike" text icon
          ><v-icon color="blue lighten-2" :disabled="!isLiked"
            >mdi-thumb-up</v-icon
          ></v-btn
        >
        <v-btn text icon
          ><v-icon color="red lighten-2" disabled>mdi-thumb-down</v-icon></v-btn
        >
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    title: String,
    content: String,
    image: String,
    id: String,
    likes: Array,
  },
  data() {
    return {
      copiedLikes: this.likes,
    };
  },
  methods: {
    ...mapActions(["addLike"]),
    onDetail() {
      this.$router.push(`/edit-blog/${this.id}`);
    },
    async onAddLike() {
      if (this.isLiked) {
        this.copiedLikes = this.copiedLikes.filter((item) => {
          return item != localStorage.getItem("id");
        });
      } else {
        this.copiedLikes.push(localStorage.getItem("id"));
      }
      await this.addLike(this.id);
    },
  },
  computed: {
    isLiked() {
      if (this.copiedLikes.includes(localStorage.getItem("id"))) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style></style>
