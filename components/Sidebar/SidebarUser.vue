<template>
  <vs-row justify="center">
    <vs-button
        color="#e9e9e9"
        @click="logout"
    >
      <i class="bx bx-log-out"></i> Выйти
    </vs-button>
  </vs-row>
</template>
<script>
export default {
  data () {
    return {
      isLoading: false,
    }
  },
  methods: {
    async logout () {
      this.isLoading = true;
      await this.$auth.logout();
      this.isLoading = false;
    },
  }
}
</script>
