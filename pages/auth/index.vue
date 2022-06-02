<template>
  <div class="middle">
    <div class="auth-logo">
      <span>
        Система тестирования
      </span>
    </div>

    <div class="roles-select">
      <div class="auth-block">
        <div class="con-form role-avatar">
          <vs-avatar size="70" badge badge-color="success">
            <i class='bx bxs-cool'></i>
          </vs-avatar>
        </div>

        <div class="auth-block__footer">
          <div class="footer-dialog">
            <vs-button to="/auth/teacher/login" block :loading="isLoading">
              Учитель
            </vs-button>
          </div>
        </div>
      </div>
      <div class="auth-block">
        <div class="con-form role-avatar">
          <vs-avatar size="70" badge badge-color="success">
            <i class='bx bx-confused' ></i>
          </vs-avatar>
        </div>

        <div class="auth-block__footer">
          <div class="footer-dialog">
            <vs-button to="/auth/student/login" block :loading="isLoading">
              Ученик
            </vs-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'auth',
  middleware: 'guest',
  data:() => ({
    active: false,
    email: '',
    password: '',
    remember: false,
    isLoading: false,
    errors: {
      email: '',
      password: ''
    }
  }),
  computed: {
    validEmail() {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)
    }
  },
  methods: {
    async login () {
    }
  },
  mounted () {
    console.log(this.$nuxt)
  }
}
</script>
<style>
</style>
