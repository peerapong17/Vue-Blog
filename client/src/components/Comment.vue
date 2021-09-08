<template>
  <v-card class="mb-6 px-2">
    <v-row justify="center" align="center" class="flex-nowrap px-4 py-2">
      <v-avatar color="accent" class="mr-3" size="48"></v-avatar>

      <span :style="{ margin: '0px 12px' }" v-if="!isEditting">{{ text }}</span>
      <v-text-field
        background-color="#fafafa"
        flat
        hide-details
        v-else
        solo
        v-model="text"
      ></v-text-field>
      <v-spacer></v-spacer>
      <div v-if="isMyComment">
        <v-btn
          @click="isEditting = !isEditting"
          v-if="!isEditting"
          small
          class="mr-2"
          color="primary"
          ><v-icon>mdi-pencil</v-icon></v-btn
        >
        <v-btn
          @click="onUpdateComment"
          v-else
          small
          class="mr-2"
          color="success"
          ><v-icon>mdi-check</v-icon></v-btn
        >

        <v-btn
          @click="$emit('deleteComment', comment.id)"
          v-if="!isEditting"
          small
          dark
          color="red"
          ><v-icon>mdi-delete</v-icon></v-btn
        >
        <v-btn v-else @click="onCancel" small dark color="red"
          ><v-icon>mdi-cancel</v-icon></v-btn
        >
      </div>
    </v-row>
    <v-row class="px-4 pb-2">
      <span class="ml-2" :style="{ color: '#6e6e6e' }">{{
        comment.userId
      }}</span>
      <v-spacer></v-spacer>
      <span :style="{ color: '#adadad' }">{{ createdAt }}</span>
    </v-row>
  </v-card>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  props: {
    comment: Object,
  },
  data() {
    return {
      text: "",
      createdAt: "",
      isMyComment: false,
      isEditting: false,
    };
  },
  created() {
    this.createdAt = moment(this.comment.updated_at).fromNow();
    if (this.comment.userId === localStorage.getItem("id")) {
      this.isMyComment = true;
    }
    this.text = this.comment.comment;
  },
  methods: {
    async onUpdateComment() {
      this.isEditting = !this.isEditting;
      await axios.request(
        `http://localhost:3000/comment/update/${this.comment.id}`,
        {
          method: "PUT",
          data: { comment: this.text },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    },
    async deleteComment() {
      await axios.request(
        `http://localhost:3000/comment/delete/${this.comment.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    },

    onCancel() {
      this.isEditting = !this.isEditting;
      this.text = this.comment.comment;
    },
  },
};
</script>

<style></style>
