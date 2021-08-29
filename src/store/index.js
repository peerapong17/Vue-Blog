import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { router } from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    blog: {},
    error: "",
    blogList: [],
    isLoading: false,
    items: [
      { title: "Home", icon: "mdi-home", link: "Home" },
      { title: "Create", icon: "mdi-pencil", link: "Create-Blog" },
      {
        title: "Your Post",
        icon: "mdi-folder-star-multiple",
        link: "User-Blog",
      },
    ],
  },
  mutations: {
    gotData(state, payload) {
      state.blogList = payload;
    },
    updateData(state, payload) {
      state.blog = payload;
    },
    gotError(state, payload) {
      state.error = payload;
    },
    isLoading(state) {
      state.isLoading = true;
    },
    isNotLoading(state) {
      state.isLoading = false;
    },
  },
  actions: {
    async fetchSpicificData(context, payload) {
      const { data } = await axios.request(
        `http://localhost:3000/blog/${payload}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      context.commit("updateData", data.blog);
    },
    async fetchData(context) {
      const { data } = await axios.request("http://localhost:3000/blog", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      context.commit("gotData", data.blog);
    },
    async createBlog(context, payload) {
      const formData = new FormData();
      formData.append("title", payload.title);
      formData.append("content", payload.content);
      formData.append("image", payload.imageFile);
      try {
        await axios.request("http://localhost:3000/blog/crate", {
          method: "POST",
          data: formData,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
      } catch (error) {
        context.commit("gotError", error.response.data.message);
      }
    },

    async updateBlog(context, payload) {
      const formData = new FormData();
      formData.append("title", payload.title);
      formData.append("content", payload.content);
      if (payload.imageFile !== "") {
        formData.append("image", payload.imageFile);
      }
      try {
        await axios.request(
          `http://localhost:3000/blog/update/${payload.blogId}`,
          {
            method: "PUT",
            data: formData,
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
      } catch (error) {
        context.commit("gotError", error.response.data.message);
      }
    },

    async deleteBlog(context, payload) {
      try {
        await axios.request(`http://localhost:3000/blog/delete/${payload}`, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
      } catch (error) {
        console.log(error.message);
      }
    },

    async addLike(context, payload) {
      const { data } = await axios.request(
        `http://localhost:3000/comment/like/${payload}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      context.commit("updateData", data.blog);
    },

    async addComment(context, payload) {
      const { data } = await axios.request(
        `http://localhost:3000/comment/${payload.blogId}`,
        {
          method: "POST",
          data: { comment: payload.comment },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      context.commit("updateData", data.blog);
    },

    async deleteComment(context, payload) {
      await axios.request(`http://localhost:3000/comment/delete/${payload}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
    },

    async loginUser(context, payload) {
      if (this.state.error != "") {
        context.commit("gotError", "");
      }
      context.commit("isLoading");
      try {
        const { data } = await axios.request(
          "http://localhost:3000/user/login",
          {
            method: "POST",
            data: payload,
            withCredential: true,
          }
        );
        context.commit("isNotLoading");
        if (data.authenticated === true) {
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("id", data.user.id);
          localStorage.setItem("username", data.user.username);
        }
      } catch (error) {
        context.commit("gotError", error.response.data.message);
        context.commit("isNotLoading");
      }
    },

    async createUser(context, payload) {
      if (this.state.error != "") {
        context.commit("gotError", "");
      }
      context.commit("isLoading");
      try {
        await axios.request("http://localhost:3000/user/create", {
          method: "POST",
          data: payload,
          withCredential: true,
        });
        context.commit("isNotLoading");
      } catch (error) {
        context.commit("gotError", error.response.data.message);
        context.commit("isNotLoading");
      }
    },

    async logout() {
      await axios.request("http://localhost:3000/user/logout", {
        method: "GET",
      });
      router.push("/login");
    },
  },
  modules: {},
});
