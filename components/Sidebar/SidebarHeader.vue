<template>
  <span v-html="role">
<!--     {{ header }}-->
<!--    Если <b>ОСАГО</b>, то только у нас!-->
  </span>
</template>
<script>
export default {
  props: ['header'],
  computed: {
    role() {
      const user = this.$store.getters['loggedInUser']
      if (user.role === 'student') {
        return `<b>Класс:</b> ${user.classNumber || 1}<br><b>Ученик:</b> ${user.full_name}`
      } else if (user.role === 'teacher') {
        return `<b>Учитель:</b> ${user.full_name}`
      }
    }
  }
}
</script>
