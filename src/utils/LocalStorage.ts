import { createApp } from "vue";
export default createApp({
  methods: {
    getItem(name: string) {
      return localStorage.getItem(name);
    },
    setItem(name: string, value: any) {
      return localStorage.setItem(name, value);
    },
    removeItem(name: string) {
      return localStorage.removeItem(name);
    },
  },
});
