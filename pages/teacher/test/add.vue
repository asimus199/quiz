<template>
  <div class="add_account">
    <div class="add_account-block">
      <div class="container">
        <div class="back-button">
          <vs-button
              icon
              color="warn"
              flat
              @click="$router.back()"
          >
            <i class='bx bx-arrow-back' ></i>
          </vs-button>
        </div>
        <div class="con-form add_account__form">
          <h4 class="add_account__title">Добавление теста</h4>

          <span>Предмет:</span>
          <vs-select placeholder="Выберите предмет" v-model="course">
            <vs-option label="Русский язык" value="russian">
              Русский язык
            </vs-option>
            <vs-option label="Математика" value="math">
              Математика
            </vs-option>
            <vs-option label="Физика" value="fizika">
              Физика
            </vs-option>
            <vs-option label="История" value="history">
              История
            </vs-option>
          </vs-select>

          <span>Класс:</span>
          <vs-input autocomplete="new-password" placeholder="Класс" v-model="classNumber" type="number">
            <template #icon>
              <i class='bx bx-text'></i>
            </template>
          </vs-input>

          <span>Картинка:</span>
          <vs-input autocomplete="new-password" placeholder="Картинка" v-model="image">
            <template #icon>
              <i class='bx bx-text'></i>
            </template>
          </vs-input>

          <span>Название:</span>
          <vs-input autocomplete="new-password" placeholder="Название" v-model="title">
            <template #icon>
              <i class='bx bx-text'></i>
            </template>
          </vs-input>

          <span>Описание:</span>
          <vs-input class="calendar__description" :textarea="true" v-model="description"></vs-input>

          <vs-button :loading="is_loading" block @click="addCalendar">
            Добавить
          </vs-button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.add_account__title {
  margin: 0 0 20px 0;
  text-align: center;
}

.calendar__description textarea{
  height: 150px !important;
}
</style>
<script>
export default {
  components: {},
  data:() => ({
    is_loading: false,
    title: '',
    image: '',
    description: '',
    classNumber: '',
    course: ''
  }),
  methods: {
    async addCalendar() {
      try {
        this.is_loading = true
        const quiz = await this.$axios.$post('/quiz', {
          title: this.title,
          image: this.image,
          description: this.description,
          classNumber: +this.classNumber,
          course: this.course,
        });

        this.is_loading = false
        return this.$router.push(`/teacher/test-edit/${quiz.id}`)
      } catch (e) {
        this.is_loading = false
        this.$vs.notification({
          duration: 5000,
          border: 'danger',
          position: 'top-right',
          title: 'Ошибка создания календаря',
          text: e.response && e.response.data && e.response.data.error || 'Неизвестная ошибка. В случае повторения ошибки свяжитесь с техподдержкой'
        })
      }
    }
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
