<script setup>
import projectService from "/src/services/project.js"
import {computed, onMounted, ref} from "vue";
import {useToast} from "vue-toastification";
const user = JSON.parse(sessionStorage.getItem("user"));
const required = [
  v => !!v || 'Это обязательное поле',
]
const loading = ref(false);
const project = ref({
  name: null,
  description: null,
  user_id: user.id
})
const statuses = ref([
  {
    title: "Отставание",
    value: "backlog"
  },{
    title: "НЗП",
    value: "wip"
  },{
    title: "Завершено",
    value: "done"
  },{
    title: "Отменено",
    value: "canceled"
  },
]);
const projects = ref([])
const tasks = ref([])
const filteredTasks = computed(()=>{
  tasks.value.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  return tasks.value.slice(0,3)
})
const loadProjects = ()=>{
  let toast = useToast()
  loading.value = true
  projectService.projects().then((r)=>{
    toast.success("Проекты успешно взяты")
    projects.value = r.data
    projects.value.forEach((item)=>{
      tasks.value.concat(item.tasks)
      item.task = {
        name: null,
        description: null,
        user_id: user.id,
        status: "backlog",
      }
    })
  }).catch(r=>{
    toast.error(r.response.data.message)
  }).finally(()=>{
    loading.value = false
  })
}
const loadProject = ()=>{
  projectService.create(project.value).then((r)=>{
  }).catch(r=>{
    toast.error(r.response.data.message)
  })
}
const createProject = ()=>{
  let toast = useToast()
  projectService.create(project.value).then((r)=>{
    toast.success("Проект успешно добавлен")
    loadProjects()
  }).catch(r=>{
    toast.error(r.response.data.message)
  })
}
const createTask = (project)=>{
  let toast = useToast()
  projectService.createTask(project.id, project.task).then((r)=>{
    toast.success("Задача успешно добавлена")
    loadProject(project.id)
  }).catch(r=>{
    toast.error(r.response.data.message)
  })
}
onMounted(()=>loadProjects())
</script>

<template>
  <div class="py-8">
    <VCard width="500">
        <VCardTitle>Создание проекта</VCardTitle>
      <VCardText>
        <v-form @submit.prevent="createProject">
          <v-text-field
              v-model="project.name"
              label="Название"
              :rules="required"
              required
          ></v-text-field>
          <v-textarea
              v-model="project.description"
              label="Описание"
              required
          ></v-textarea>

          <v-btn type="submit" color="primary" block>
            Создать
          </v-btn>
        </v-form>
      </VCardText>
    </VCard>
    <VDivider class="my-4"/>
    <h2 class="mb-2 text-xl">Проекты</h2>
    <VProgressCircular v-if="loading"/>
    <v-expansion-panels v-else-if="projects.length">
      <v-expansion-panel
          v-for="pr in projects"
          :key="pr.id"
      >
        <template #title>
          <div>
          <h4 class="project-title">{{pr.name}}</h4>
          <p class="text-gray-500 mt-2">{{pr.description}}</p>
          </div>
        </template>
        <template #text>
          <div>
          <VDivider/>
            <v-list lines="two" v-if="pr.tasks.length">
              <v-list-item
                  v-for="task in pr.tasks"
                  :key="task.id"
                  :title="task.name"
                  :subtitle="task.description"
              ></v-list-item>
            </v-list>
            <p v-else class="text-center text-gray-500 mb-4">Нет задач</p>
            <VDivider color="black"/>
            <h5 class="text-lg">Добавить задачу</h5>
            <v-form @submit="createTask(pr)">
              <v-text-field density="compact"
                  v-model="pr.task.name"
                  label="Название"
                  :rules="required"
                  required
              ></v-text-field>
              <v-textarea density="compact"
                  v-model="pr.task.description"
                  label="Описание"
                  required
              ></v-textarea>
              <v-select density="compact" :items="statuses" v-model="pr.task.status"/>
              <v-btn type="submit" color="primary" block>
                Добавить задачу
              </v-btn>
            </v-form>
          </div>
        </template>
      </v-expansion-panel>
    </v-expansion-panels>
    <p v-else class="text-center text-gray-500 text-xl">Нет проектов</p>
    <div v-if="filteredTasks.length">
      <h4 class="text-xl">Последние задачи</h4>
      <v-list lines="one" >
        <v-list-item
            v-for="task in filteredTasks"
            :key="task.id"
            :title="task.name"
        />
      </v-list>
    </div>
  </div>
</template>

<style scoped>
.project-title{
  font-size: 22px;
  font-weight: 600;
}
</style>