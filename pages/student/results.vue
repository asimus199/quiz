<template>
  <div>
    <div class="courses">
      <div class="courses-item" style="margin-right: 10px">
        <b>Показать:</b>
      </div>
      <div class="courses-item">
        <vs-button :warn="activeCourse !== 'all'" :flat="activeCourse !== 'all'" @click="activeCourse = 'all'">
          Все
        </vs-button>
      </div>
      <div class="courses-item" v-for="(courseName, course) in courses">
        <vs-button :warn="activeCourse !== course" :flat="activeCourse !== course" @click="activeCourse = course">
          {{ courseName }}
        </vs-button>
      </div>
    </div>
    <div class="course-item" v-for="(courseName, course) in courses" v-if="activeCourse === 'all' || activeCourse === course" :key="course">
      <div style="margin-left: 70px;" class="course-header">
        <div>
          <h2 >{{ courseName }}</h2>
        </div>
      </div>
      <div class="accounts">
        <vs-card-group>
          <vs-card v-for="({quiz, ...test}, i) of getCourseQuiz(course)" :key="test.id">
            <template #title>
              <h3>{{ quiz.title }}</h3>
            </template>
            <template #img>
              <img :src="`https://vuesax.com/foto${i+1}.png`" alt="">
            </template>
            <template #text>
              <p>
                {{ quiz.description }}
                <br>
                <br>
                <span><b>Время начала:</b></span> {{ test.createdAt }}<br><br>
                <span><b>Время окончания:</b></span> {{ test.finishedAt }}<br><br>
                <span><b>Предмет:</b></span> {{ courses[quiz.course] }}<br><br>
                <span><b>Класс:</b></span> {{ quiz.classNumber }}<br><br>
                <span><b>Ответы на вопросы:</b></span> {{ test.answers.length }} / {{quiz.questions.length}}<br><br>
                <span><b>Правильные ответы:</b></span> {{ correctAnswers(quiz.questions) ? ((testCorrectAnswers(test.answers) / correctAnswers(quiz.questions)) * 100).toFixed(2) : 0 }}%<br><br>
              </p>
              <div style="display: flex; justify-content: center">
                <vs-button :to="`/student/test/result/${test.id}`">
                  Подробнее
                </vs-button>
              </div>
            </template>
            <template #interactions>
              <vs-button class="btn-chat" shadow primary>
                Вопросов:
                <span class="span" style="margin-left: 5px">
                {{ quiz.questions.length }}
              </span>
              </vs-button>
              <vs-button class="btn-chat" shadow primary>
                Класс:
                <span class="span" style="margin-left: 5px">
                {{ quiz.classNumber }}
              </span>
              </vs-button>
            </template>
          </vs-card>
        </vs-card-group>
      </div>
    </div>
  </div>
</template>
<style>

</style>
<script>
export default {
  layout: 'student',
  components: {},
  data () {
    return {
      activeCourse: 'all',
      quizAll: [],
      title: '',
      activeQuestId: 0,
      description: '',
      classNumber: '',
      course: '',
      test: [],
      quiz: {},
      questions: [],
      answers: [],
      is_loading: false,
      courses: {
        russian: 'Русский язык',
        math: 'Математика',
        fizika: 'Физика',
        history: 'История',
      }
    }
  },
  methods: {

    correctAnswers (questions) {
      return questions.map(i => i.correct_answers.length).reduce(function(sum, elem) {
        return sum + elem;
      }, 0);
    },
    testCorrectAnswers (answers) {
      return answers.map(item => {
        // console.log(i, 'answer')
        return item.answer.filter(i => item.correct_answers.includes(i)).length
      }).reduce(function(sum, elem) {
        return sum + elem;
      }, 0);
    },
    getCourseQuiz(course) {
      return this.test.filter(i => i.quiz.course === course)
    },
    async startTest (quiz) {
      try {
        this.is_loading = true
        const data = await this.$axios.$post('/test', {
          quizId: quiz.id
        });

        this.is_loading = false
        return this.$router.push(`/student/test/start/${data.id}`)
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
    const test = await this.$axios.$get('test/results/');
    this.test = test;
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
