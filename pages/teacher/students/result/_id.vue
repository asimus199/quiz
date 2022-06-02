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
          <h4 class="add_account__title">Результат тестирования</h4>

          <span><b>ФИО:</b></span> {{ user.full_name }}<br><br>
          <span><b>Время начала:</b></span> {{ test.createdAt }}<br><br>
          <span><b>Время окончания:</b></span> {{ test.finishedAt }}<br><br>
          <span><b>Тест:</b></span> {{ quiz.title }}<br><br>
          <span><b>Предмет:</b></span> {{ courses[quiz.course] }}<br><br>
          <span><b>Класс:</b></span> {{ quiz.classNumber }}<br><br>
          <span><b>Ответы на вопросы:</b></span> {{ answers.length }} / {{questions.length}}<br><br>
          <span><b>Правильные ответы:</b></span> {{ ((testCorrectAnswers / correctAnswers) * 100).toFixed(2) }}%<br><br>

          <h4 class="add_account__title">Вопросы:</h4>
          <div style="margin-top: 20px" v-for="(question, i) of questions" :key="i">
            <span><b>{{ i+1 }}. {{ question.question }}</b></span>
<!--            <vs-radio v-model="question.one_answers" :val="option" v-for="(option, i) of question.options" :key="option" v-if="question.correct_answers.length < 2" >-->
<!--              {{ option }}-->
<!--            </vs-radio>-->
            <vs-checkbox disabled="" v-model="question.checked_answers" :val="option" v-for="(option, i) of question.options" :key="option"  :success="!isCorrectAnswer(question, option)" :danger="isCorrectAnswer(question, option)">
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
  layout: 'teacher',
  components: {},
  data:() => ({
    courses: {
      russian: 'Русский язык',
      math: 'Математика',
      fizika: 'Физика',
      history: 'История',
    },
    is_loading: false,
    title: '',
    activeQuestId: 0,
    description: '',
    classNumber: '',
    course: '',
    test: {},
    user: {},
    quiz: {},
    questions: [],
    answers: []
  }),
  computed: {

    correctAnswers () {
      return this.questions.map(i => i.correct_answers.length).reduce(function(sum, elem) {
        return sum + elem;
      }, 0);
    },
    testCorrectAnswers () {
      return this.answers.map(item => {
        // console.log(i, 'answer')
        return item.answer.filter(i => item.correct_answers.includes(i)).length
      }).reduce(function(sum, elem) {
        return sum + elem;
      }, 0);
    }
  },
  methods: {
    isCorrectAnswer (question, option) {
      let answers = question.answer && question.answer[0] && question.answer[0].answer;
      let checked_answers = question.checked_answers;
      let correct_answers = question.correct_answers;
      return checked_answers.includes(option) && !correct_answers.includes(option)
    },
    isCheckedOption (question, option) {
      return true
      return question.correct_answers.includes(option)
    },
    async finish() {
      try {
        // console.log(this.questions)
        this.is_loading = true
        const finish = await this.$axios.$post('/test/finish', {
          testId: this.test.id,
          questions: this.questions
        });

        this.is_loading = false
        // return this.$router.push(`/student/test/result/${this.test.id}`)
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
    const {
      quiz,
      user,
      answers,
      ...test
    } = await this.$axios.$get('test/result/'+ this.$route.params.id);

    this.test = test;
    this.user = user;
    this.quiz = quiz;
    this.answers = answers;
    this.questions = quiz.questions;
    console.log(this.questions )
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
