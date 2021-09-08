<template>
  <v-container fluid class="px-10">
    <v-row wrap class="mt-3">
      <UserBlogCard
        v-for="blog in blogList"
        :key="blog.id"
        :title="blog.title"
        :content="blog.content"
        :image="blog.imagePath"
        :id="blog.id"
        :like="blog.like"
      />
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import UserBlogCard from "../components/UserBlogCard.vue";
export default {
  components: { UserBlogCard },
  data() {
    return {
      blogList: [],
    };
  },
  async created() {
    const { data } = await axios.request(
      "http://localhost:3000/blog/user-blogs",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    this.blogList = data.blog;
  },
};
</script>

<style></style>
