<template>
  <div id="app">
    <h5>app</h5>
    <router-link to="/home" @touchstart="handleClick" @touchend="touch">home</router-link>

    <router-link to="/about">about</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  mounted() {
    // console.log(this.$router);
    // console.log(this.$route);
  },
  methods: {
    handleClick(e) {
      console.log(111);
      console.log(e);
    },
    touch(e) {
      console.log(e);
    }
  },
  components: {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
