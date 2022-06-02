<template>
  <div class="content">
    <Sidebar :sidebar-items="sidebarItems" :sidebar-data="sidebarData" />
    <div class="user-navbar">
      <div class="user-navbar__item">
      </div>
      <div class="user-navbar__item">

      </div>
    </div>
    <Nuxt />
  </div>
</template>
<script>
import Sidebar from "@/components/Sidebar/index";
export default {
  middleware: 'authenticate',
  components: {
    Sidebar
  },
  data () {
    return {
      sidebarData: {
        header: ''
      },
      sidebarItems: [
        {
          icon: 'bx bxs-dashboard',
          title: 'Тесты',
          to: '/teacher',
          name: 'teacher'
        },
        {
          icon: 'bx bx-credit-card',
          title: 'Ученики',
          to: '/teacher/students',
          name: 'teacher-students'
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
  /*flex-direction: column;*/
}
.user-navbar__item {
  margin-left: 15px;
  font-size: 19px;
  display: flex;
  flex-direction: column;
}
.user-navbar__item .user-navbar__item-icons {
  display: flex;
  align-items: flex-end;
}
.user-navbar__item .user-navbar__item-icons i {
  margin-right: 5px;
}
.user-navbar__item .vs-avatar {
  color: #000000 !important;
}
</style>
