<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header/myHeader.vue";
import Footer from "./components/Footer/myFooter.vue";

export default {
  name: "",
  components: { Header, Footer },
  mounted() {
    this.$store.dispatch("categoryList");
    this.$store.dispatch("bannerList");
    this.$store.dispatch("floorList");
  },
};
</script>

<style>
</style>
