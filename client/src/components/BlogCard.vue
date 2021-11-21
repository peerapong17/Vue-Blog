<template>
  <v-col md="4">
    <v-card>
      <v-card-title class="headline font-weight-medium">{{
        title.substring(0, 1).toUpperCase() + title.substring(1)
      }}</v-card-title>
      <v-img height="250" :src="image"></v-img>
      <v-card-text>{{ content.substring(0, 90) + "..." }}</v-card-text>
      <div class="d-flex justify-space-between mx-3 mb-2">
        <router-link
          :to="{ name: 'GetBlogByCategory', params: { category: category } }"
          class="category"
        >
          <v-chip small dark color="green">
            {{ category }}
          </v-chip></router-link
        >
        <span>{{ createdAtFromNow }}</span>
      </div>
      <v-divider class="mx-4"></v-divider>
      <v-card-actions>
        <v-btn @click.prevent="onDetail" outlined color="black"
          >See more...</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn text icon @click="onAddLike"
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
import moment from "moment";
export default {
  props: {
    title: String,
    content: String,
    image: String,
    id: String,
    like: Array,
    category: {
      type: String,
    },
    createdAt: {
      type: String,
    },
  },
  data() {
    return {
      likes: this.like,
    };
  },
  mounted() {
    console.log(this.createdAt);
  },
  methods: {
    ...mapActions(["addLike", "fetchBlogByCategory"]),
    onDetail() {
      this.$router.push(`/blog-detail/${this.id}`);
    },
    async onAddLike() {
      if (this.isLiked) {
        this.likes = this.likes.filter((item) => {
          return item != localStorage.getItem("id");
        });
      } else {
        this.likes.push(localStorage.getItem("id"));
      }
      await this.addLike(this.id);
    },
    onCategoryFilterd() {
      console.log(this.category);
    },
  },
  computed: {
    createdAtFromNow() {
      return moment(this.createdAt).fromNow();
    },
    isLiked() {
      if ([...this.likes].includes(localStorage.getItem("id"))) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
.category {
  text-decoration: none;
}
</style>
