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
          <h4 class="add_account__title">Добавление вопросов</h4>

          <span><b>Название:</b> {{ quiz.title }}</span><br><br>
          <span><b>Описание:</b> {{ quiz.description }}</span><br><br>
          <span><b>Предмет:</b> {{ getCourseName(quiz)}}</span><br><br>

          <span>Вопрос:</span>
          <vs-input autocomplete="new-password" placeholder="Вопрос" v-model="question">
            <template #icon>
              <i class='bx bx-text'></i>
            </template>
          </vs-input>

          <br>
          <span>Варианты ответов(выберите верные):</span>

          <div style="text-align: center; margin: 20px" v-if="!options.length">
            <i>Добавьте пожлауйста варианты ответов</i>
          </div>
          <div style="margin: 20px 0">
            <vs-checkbox :val="option" v-model="correct_answers" v-for="(option, i) of options" :key="option">
              {{ option }}
              <div style="margin-left: 5px ">
                <vs-button danger size="mini" @click="answerRemove(i)">
                  Удалить
                </vs-button>
              </div>
            </vs-checkbox>
          </div>

          <vs-input autocomplete="new-password" placeholder="Ответ" v-model="answer">
            <template #icon>
              <i class='bx bx-text'></i>
            </template>
          </vs-input>
          <vs-button :loading="is_loading" block @click="addAnswer">
            Добавить ответ
          </vs-button>
          <br>
          <vs-button :loading="is_loading" block @click="addQuestion">
            Добавить вопрос
          </vs-button>

          <h4 class="add_account__title" style="margin-top: 20px; border-top:1px solid #c3c3c3; padding-top: 15px">Вопросы</h4>
          <div style="margin-top: 20px" v-for="(question, i) of questions" :key="i">
            <span><b>{{ i+1 }}. {{ question.question }}</b></span>
            <vs-checkbox disabled :val="option" v-model="question.correct_answers" v-for="(option, i) of question.options" :key="option">
              {{ option }}
            </vs-checkbox>
          </div>
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
    question: '',
    description: '',
    classNumber: '',
    course: '',
    answer: '',
    questions: [],
    options: [],
    correct_answers: [],
    quiz: {}
  }),
  methods: {
    answerRemove (i) {
      this.options.splice(i, 1)
    },
    getCourseName (quiz) {
      const courses = {
        russian: 'Русский язык',
        math: 'Математика',
        fizika: 'Физика',
        history: 'История',
      }

      return courses[quiz.course]
    },
    addAnswer () {
      if (this.answer) {
        this.options.push(this.answer);
        this.answer = '';
      }
    },
    async addQuestion() {
      try {
        this.is_loading = true
        const data = await this.$axios.$post('/question', {
          question: this.question,
          correct_answers: this.correct_answers,
          options: this.options,
          quizId: +this.$route.params.id
        });

        this.questions.push(data)

        this.question = ''
        this.correct_answers = []
        this.options = []


        this.is_loading = false
        // return this.$router.push(`/calendar`)
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
  },
  async fetch() {
    this.quiz = await this.$axios.$get('quiz/'+ this.$route.params.id);
    this.questions = await this.$axios.$get('quiz/questions/'+ this.$route.params.id);
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
