<template>
  <div class="accounts">
    <div class="accounts-block">
      <div class="container">
        Hello Dashboard
      </div>
    </div>
  </div>
</template>
<style>

</style>
<script>
export default {
  components: {},
  mounted() {
    this.$router.push('/'+ this.$store.getters['loggedInUser'].role)
  }
}
</script>
<style>
.accounts {
  display: flex;
  justify-content: center;
}
.accounts-block {
  width: 100%;
}
</style>
