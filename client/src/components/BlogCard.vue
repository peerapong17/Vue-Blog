<template>
  <v-col md="4">
    <v-card class="mx-4">
      <v-card-title class="headline font-weight-medium">{{
        title.substring(0, 1).toUpperCase() + title.substring(1)
      }}</v-card-title>
      <v-img height="250" :src="image"></v-img>
      <v-card-text>{{ content.substring(0, 90) + "..." }}</v-card-text>
      <div class="d-flex justify-space-between mx-3 mb-2">
        <v-chip small dark color="green">
          {{ category }}
        </v-chip>
        <span>{{ created_at }}</span>
      </div>
      <v-divider class="mx-4"></v-divider>
      <v-card-actions>
        <v-btn @click.prevent="onDetail" outlined color="black"
          >See more...</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn text icon @click="onAddLike"
          ><v-icon color="blue lighten-2" :disabled="!isLikedListener"
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
import moment from 'moment'
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
    created_at: {
      type: String,
    },
  },
  data() {
    return {
      isLiked: false,
    };
  },
  mounted() {
    this.created_at = moment(this.created_at).fromNow()
    this.like.map((item) => {
      if (item === localStorage.getItem("id")) {
        this.isLiked = true;
      }
    });
  },
  methods: {
    ...mapActions(["addLike"]),
    onDetail() {
      this.$router.push(`/blog-detail/${this.id}`);
    },
    async onAddLike() {
      this.isLikedListener = !this.isLiked;
      await this.addLike(this.id);
    },
  },
  computed: {
    isLikedListener() {
      return this.isLiked;
    },
  },
};
</script>

<style></style>
