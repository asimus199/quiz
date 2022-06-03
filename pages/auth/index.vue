<template>
  <div class="middle">
    <div class="auth-logo">
        <span>
          Система тестирования
        </span>
    </div>
    <div style="font-size:19px; width: 625px">
      <p>Информационная система для автоматизации тестирования знаний школьников</p>
      <p>
        <b>Основные задачи web-приложения:<br></b>
        – выявить уровень знаний, умений, навыков обучающихся;<br><br>
        – облегчить пруд преподавателя при проведении тестирования и
        обработки его результатов;<br><br>
        – обеспечить доступ через сеть Интернет к информационной системе;<br><br>
        – сократить временные затраты преподавателя и обучающихся при
        проведении тестирования.
      </p>
    </div>
    <div class="auth-logo">
      <img
          src="https://petrsu.ru/files/news_notice_event/2022/5/7/thumbnails/970_1651919490_97016209852759701615810351unnamed.png"
          style="width: 625px;">
    </div>

    <div class="auth-logo">
        <h2>
          Авторизация
        </h2>
    </div>
    <div class="roles-select">
      <div class="auth-block">
        <div class="con-form role-avatar">
          <vs-avatar size="70" badge badge-color="success">
            <i class='bx bxs-user-account'></i>
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
            <i class='bx bxs-user-badge'></i>
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
  data: () => ({
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
    async login() {
    }
  },
  mounted() {
    console.log(this.$nuxt)
  }
}
</script>
<style>
</style>
