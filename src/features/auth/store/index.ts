import { defineStore } from "pinia";

const useAuthStore = () => defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    inputTodo: "",
    todos: [],
  }),
  actions: {
    addTodo() {},
    deleteTodo() {},
    refactorTodo() {},
  },
  getters: {},

});

export { useAuthStore };
