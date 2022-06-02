<template>
  <div class="hidden">
    <div class="mobile-sidebar" v-if="activeSidebar"></div>
    <vs-navbar shadow square center-collapsed>
      <template #left>
        <vs-button @click="activeSidebar = !activeSidebar" icon>
          <i class='bx bx-menu'></i>
        </vs-button>
      </template>
      <template #right>
        <div class="user-navbar__item">

        </div>
      </template>
    </vs-navbar>
    <vs-sidebar
      fixed
      open
      v-model="active"
      class="sidebar-lg"
    >
      <template #logo>
       <SidebarLogo />
      </template>

      <template #header>
       <SidebarHeader :header="sidebarData.header" />
      </template>

      <vs-sidebar-item v-for="(item, i) in sidebarItems" :id="item.name" :key="i" :to="item.to">
        <template #icon>
          <i :class="item.icon"></i>
        </template>
        {{ item.title }}
      </vs-sidebar-item>
      <template #footer>
        <SidebarUser />
      </template>
    </vs-sidebar>
    <vs-sidebar
      fixed
      :open.sync="activeSidebar"
      v-model="active"
    >
      <template #logo>
        <SidebarLogo />
      </template>

      <template #header>
        <SidebarHeader />
      </template>

      <vs-sidebar-item v-for="(item, i) in sidebarItems" :id="item.name" :key="i" :to="item.to">
        <template #icon>
          <i :class="item.icon"></i>
        </template>
        {{ item.title }}
      </vs-sidebar-item>
      <template #footer>
        <SidebarUser />
      </template>
    </vs-sidebar>
  </div>
</template>
<script>
import SidebarUser from '@/components/Sidebar/SidebarUser';
import SidebarLogo from '@/components/Sidebar/SidebarLogo';
import SidebarHeader from '@/components/Sidebar/SidebarHeader';
export default {
  props: ['sidebarItems', 'sidebarData'],
  components: {
    SidebarUser,
    SidebarLogo,
    SidebarHeader
  },
  data:() => ({
    activeSidebar: false
  }),
  computed: {
    active: {
      get () {
        if (this.$nuxt.$route.name.includes('test'))
          return 'teacher'
        return this.$nuxt.$route.name
      },
      set (value) {}
    }
  },
  mounted () {
    console.log(this.$nuxt)
  }
}
</script>

