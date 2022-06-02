<template>
  <div>
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
          title: 'Главная',
          to: '/',
          name: 'index'
        },
        {
          icon: 'bx bxs-calendar',
          title: 'Календарь',
          to: '/calendar',
          name: 'calendar'
        },
        {
          icon: 'bx bx-credit-card',
          title: 'Оплата',
          to: '/user/pay',
          name: 'user-pay'
        },
        {
          icon: 'bx bx-user',
          title: 'Партнерам',
          to: '/partner',
          name: 'partner'
        },
        {
          icon: 'bx bx-support',
          title: 'Тех. поддержка',
          to: '/support',
          name: 'support'
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
