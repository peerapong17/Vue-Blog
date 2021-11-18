<template>
  <v-container fluid class="px-10 d-flex flex-column">
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
        :created_at="blog.created_at"
      />
    </v-row>
  </v-container>
</template>

<script>
import BlogCard from "../../components/BlogCard.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: { BlogCard },
  props: {
    category: String,
  },
  data() {
    return {
      items: ["Date", "Category", "Writer", "View", "Like"],
    };
  },
  async created() {
    await this.fetchBlogByCategory(this.category);
  },
  methods: {
    ...mapActions(["fetchBlogByCategory"]),
    async onFilter() {
      // await this.fetchBlogByCategory('culture')
    },
  },
  computed: {
    ...mapState(["copiedBlogList"]),
  },
};
</script>

<style scope>
/* .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded) > .v-input__control > .v-input__slot{
    width: 200px;
  } */
</style>
