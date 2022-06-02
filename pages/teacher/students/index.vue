<template>
  <div>
    <div class="accounts" style="margin-top: 20px" v-for="user of users" :key="item">
      <div class="accounts-block">
        <div class="container">
          <div class="con-content">
            <div>
              <b style="margin-right: 5px">Ученик:</b> {{ user.full_name }}
            </div>
          </div>
          <div class="con-content events-list">
            <div class="events-info events-info__start">
              <div class="events-info__default">
                <div>
                 <b>email:</b> {{ user.email }}
                </div>
                <div>
                 <b>класс:</b> {{ user.classNumber }}
                </div>
              </div>
            </div>
            <div class="events-info">
              <div class="events-info__actions">
                <vs-button icon :to="`/teacher/students/user/${user.id}`">
                  Результаты тестирований
                </vs-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<style>

</style>
<script>
export default {
  components: {},
  data () {
    return {
      users: []
    }
  },

  async fetch() {
    const users = await this.$axios.$get('users/students/');

    this.users = users;
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
