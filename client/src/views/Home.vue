<template>
  <v-container fluid class="px-10">
    <v-row wrap class="mt-3">
      <BlogCard
        v-for="blog in blogList"
        :key="blog.id"
        :title="blog.title"
        :content="blog.content"
        :image="blog.imagePath"
        :id="blog.id"
        :like="blog.like"
        :category="blog.category"
        :created_at="blog.created_at"
      />
    </v-row>
  </v-container>
</template>

<script>
import BlogCard from "../components/BlogCard.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: { BlogCard },
  async created() {
    await this.fetchData();
  },
  methods: {
    ...mapActions(["fetchData"]),
  },
  computed: {
    ...mapState(["blogList"]),
  },
};
</script>

<style></style>
