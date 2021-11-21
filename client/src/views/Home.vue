<template>
  <v-container fluid class="px-10 d-flex flex-column">
    <v-row v-if="isLoading" justify="center" class="mt-12">
      <v-progress-circular
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-row>
    <template v-else>
      <v-select
        @change="onFilter"
        class="mt-2"
        :items="items"
        label="Date"
        solo
        :style="{ alignSelf: 'end' }"
      ></v-select>
      <v-row wrap>
        <BlogCard
          v-for="blog in copiedBlogList"
          :key="blog.id"
          :title="blog.title"
          :content="blog.content"
          :image="blog.imagePath"
          :id="blog.id"
          :like="blog.like"
          :category="blog.category"
          :createdAt="blog.created_at"
        />
      </v-row>
    </template>
  </v-container>
</template>

<script>
import BlogCard from "../components/BlogCard.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: { BlogCard },
  props: {
    category: String,
    token: String,
    userId: String,
  },
  data() {
    return {
      items: ["Date", "Category", "Writer", "View", "Like"],
    };
  },
  async created() {
    if (this.token && this.userId) {
      localStorage.setItem("token", this.token);
      localStorage.setItem("id", this.userId);
    }
    await this.fetchData();
  },
  methods: {
    ...mapActions(["fetchData"]),
    async onFilter() {
      // await this.fetchBlogByCategory('culture')
      // this.copiedBlogList.sort((a, b) => {
      //   console.log(a.created_at.split("T")[0])
      //   console.log(b.created_at.split("T")[0])
      // })
    },
  },
  computed: {
    ...mapState(["copiedBlogList", "isLoading"]),
  },
};
</script>

<style scope>
/* .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded) > .v-input__control > .v-input__slot{
    width: 200px;
  } */
</style>
