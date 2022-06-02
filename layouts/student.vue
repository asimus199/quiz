<template>
  <div class="content">
    <Sidebar :sidebarItems="sidebarItems" :sidebar-data="sidebarData" />
    <Nuxt />
  </div>
</template>
<script>
import Sidebar from "@/components/Sidebar/index";
export default {
  middleware: 'student',
  components: {
    Sidebar
  },
  data () {
    return {
      sidebarData: {
        header: 'Кабинет партнера'
      },
      sidebarItems: [
        {
          icon: 'bx bx-list-ol',
          title: 'Тесты',
          to: '/student',
          name: 'student'
        },
        {
          icon: 'bx bx-line-chart',
          title: 'Результаты',
          to: '/student/results',
          name: 'student-results'
        }
      ]
    }
  }
}
</script>
<style>
.user-navbar {
  position: absolute;
  top: 25px;
  right: 25px;
  display: flex;

}
.user-navbar__item {
  margin-left: 15px;
}
.user-navbar__item .vs-avatar {
  color: #000000 !important;
}
</style>
