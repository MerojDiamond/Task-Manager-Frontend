<template>
  <AuthComponent v-if="page === 'auth'" @redirect="page = 'dashboard'"/>
  <ProjectsListComponent v-else-if="page === 'dashboard'" @logout="page = 'auth'"/>
</template>

<script>

import ProjectsListComponent from "./components/ProjectsListComponent.vue";
import AuthComponent from "./components/AuthComponent.vue";

export default {
  components: {AuthComponent, ProjectsListComponent},
  data() {
    return {
      page: "auth",
    };
  },
  mounted(){
    let token = sessionStorage.getItem("token");
    if (token) {
      this.page = "dashboard"
      console.log(this.page)
    }
  }
};
</script>
