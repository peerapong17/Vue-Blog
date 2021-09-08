<template>
  <v-container>
    <v-row justify="center">
      <v-col md="8" sm="8">
        <v-card elevation="2">
          <v-img class="mx-auto mt-4" :src="blog.imagePath" width="100%" />
          <v-card-title class="text-center headline font-weight-medium">{{
            blog.title
          }}</v-card-title>
          <v-card-text>{{ blog.content }}</v-card-text>
          <div class="d-flex justify-space-between mx-3 mb-2">
            <v-chip small dark color="green">
              {{ blog.category }}
            </v-chip>
            <span>{{ created_at }}</span>
          </div>
          <v-divider class="mx-4"></v-divider>
          <v-card-actions>
            <v-rating icon-label="custom icon label text {0} of {1}"></v-rating>
            <v-spacer></v-spacer>
            <v-btn @click="onAddLike" icon text
              ><v-icon color="blue lighten-2" :disabled="!isLiked"
                >mdi-thumb-up</v-icon
              ></v-btn
            >
            <v-btn icon text
              ><v-icon color="red lighten-2" :disabled="true"
                >mdi-thumb-down</v-icon
              ></v-btn
            >
          </v-card-actions>
        </v-card>

        <v-text-field
          v-model="comment"
          label="Comment"
          name="comment"
          class="mt-10"
          filled
        ></v-text-field>
        <v-row justify="end" class="px-3">
          <v-btn @click="onAddComment" class="mb-10" color="primary"
            >Add comment</v-btn
          >
        </v-row>
        <Comment
          v-for="(comment, index) in blog.comments"
          :key="index"
          :comment="comment"
          @deleteComment="onDeleteComment($event)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'
import Comment from "../components/Comment.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: { Comment },
  data() {
    return {
      comment: "",
      isLiked: false,
      comments: {},
      created_at: ""
    };
  },
  async created() {
    this.created_at = moment(this.blog.created_at).fromNow()
    console.log(this.blog.created_at)
    await this.fetchSpicificData(this.$route.params.blog_id);
    this.isLiked = this.blog.like.includes(localStorage.getItem("id"));
  },
  methods: {
    ...mapActions([
      "fetchSpicificData",
      "addLike",
      "addComment",
      "deleteComment",
    ]),
    async onAddLike() {
      await this.addLike(this.$route.params.blog_id);
      this.isLiked = this.blog.like.includes(localStorage.getItem("id"));
    },
    async onAddComment() {
      if (this.comment.trim() !== "") {
        const payload = {
          comment: this.comment,
          blogId: this.$route.params.blog_id,
        };
        await this.addComment(payload);
        this.comment = "";
      }
    },
    async onDeleteComment(id) {
      await this.deleteComment(id);
      const commentIndex = this.blog.comments
        .map((comment) => comment.id)
        .indexOf(id);
      this.blog.comments.splice(commentIndex, 1);
    },
  },
  computed: {
    ...mapState(["blog"]),
  },
};
</script>

<style></style>
