<template>
  <div>
    <div class="courses-item" style="text-align: center">
      <h4>Тесты</h4>
    </div>
    <div class="courses">
      <div class="courses-item" style="margin-right: 10px">
        <b>Показать:</b>
      </div>
      <div class="courses-item">
        <vs-button :flat="activeCourse !== 'all'" @click="activeCourse = 'all'">
          Все
        </vs-button>
      </div>
      <div class="courses-item" v-for="(courseName, course) in courses">
        <vs-button :flat="activeCourse !== course" @click="activeCourse = course">
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
          <vs-card v-for="(quiz, i) of getCourseQuiz(course)" :key="quiz.id">
            <template #title>
              <h3>{{ quiz.title }}</h3>
            </template>
            <template #img>
              <img :src="quiz.image" alt="">
            </template>
            <template #text>
              <p>
                {{ quiz.description }}
              </p>
              <div style="display: flex; justify-content: center">
                <vs-button  @click="startTest(quiz)">
                  Начать тестирование
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
    getCourseQuiz(course) {
      return this.quizAll.filter(i => i.course === course)
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
    this.quizAll = await this.$axios.$get('quiz');
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
