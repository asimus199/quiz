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
        <div>
          <vs-button to="/teacher/test/add">
            Добавить тест
          </vs-button>
        </div>
      </div>
      <div class="accounts">
        <vs-card-group>
          <vs-card v-for="(quiz, i) of getCourseQuiz(course)" :key="quiz.id" @click="$router.push(`/teacher/test-edit/${quiz.id}`)">
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
                <vs-button  @click="$router.push(`/teacher/test-edit/${quiz.id}`)">
                  Редактировать
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
  middleware: 'teacher',
  components: {},
  data () {
    return {
      activeCourse: 'all',
      quizAll: [],
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
