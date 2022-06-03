<template>
  <div class="middle">
    <div class="auth-logo">
      <span>
        Система тестирования
      </span>
    </div>
    <div class="auth-block">
      <div class="back-button">
        <vs-button
            icon
            flat
            to="/auth"
        >
          <i class='bx bx-arrow-back' ></i>
        </vs-button>
      </div>
      <div class="auth-block__header">
        <h4 class="not-margin">
          Ученик
        </h4>
      </div>
      <div class="con-form role-avatar">
        <vs-avatar size="70" badge badge-color="success">
          <i class='bx bx-confused'></i>
        </vs-avatar>
      </div>

      <div class="con-form" style="margin-top: 35px">
        <vs-input autocomplete="new-password" v-model="email" placeholder="Email">
          <template #icon>
            <i class='bx bxs-envelope' ></i>
          </template>
          <template v-if="!validEmail && email !== ''" #message-danger>
            Некорректный e-mail
          </template>
          <template v-else-if="errors.email" #message-danger>
            {{ errors.email }}
          </template>
        </vs-input>
        <vs-input autocomplete="new-password" v-model="full_name" placeholder="ФИО ученика">
          <template #icon>
            <i class='bx bxs-contact'></i>
          </template>
        </vs-input>
        <vs-input autocomplete="new-password" v-model="classNumber" placeholder="Класс" type="number">
          <template #icon>
            <i class='bx bxs-layer'></i>
          </template>
        </vs-input>
        <vs-input autocomplete="new-password" type="password" v-model="password" placeholder="Пароль">
          <template #icon>
            <i class='bx bxs-lock'></i>
          </template>
          <template v-if="errors.password" #message-danger>
            {{ errors.password }}
          </template>
        </vs-input>
      </div>

      <div class="auth-block__footer">
        <div class="footer-dialog">
          <vs-button @click="register" block :loading="isLoading">
            Создать аккаунт
          </vs-button>

          <div class="new">
            У Вас уже есть аккаунт? <nuxt-link to="/auth/student/login">Войти</nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>
<script>
export default {
  layout: 'auth',
  middleware: 'guest',
  data:() => ({
    active: false,
    email: '',
    full_name: '',
    classNumber: '',
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
    async register () {
      try {
        const ref_id = this.$nuxt.$route.query.ref_id || localStorage.getItem('ref_id') || null;
        if (!this.validEmail && this.email !== '') return;
        if (!this.email) {
          return this.errors.email = 'Введите Email'
        }
        if (!this.password) {
          return this.errors.password = 'Введите пароль'
        }

        this.isLoading = true;
        await this.$axios.$post('/auth/register', {
          email: this.email,
          password: this.password,
          role: 'student',
          classNumber: this.classNumber,
          full_name: this.full_name
        })
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        this.email = ''
        this.password = ''
        this.promocode = ''
      } catch (e) {
        this.$vs.notification({
          duration: 5000,
          border: 'danger',
          position: 'top-right',
          title: 'Ошибка регистрации',
          text: e.response && e.response.data && e.response.data.message || 'Неизвестная ошибка. В случае повторения ошибки свяжитесь с техподдержкой'
        });
        this.isLoading = false;
      }
    }
  },
  mounted () {
    console.log(this.$nuxt)
  }
}
</script>
<style>
</style>
