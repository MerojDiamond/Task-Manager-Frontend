<script>
import { login, register } from '/src/services/auth.js';
import {useToast} from "vue-toastification";
export default {
  emits:["redirect"],
  data() {
    return {
      page: "auth",
      tab: "login",
      login: {
        email: null,
        password: null,
      },
      register: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
      },
      error: '',
      nameRules: [
        v => !!v || 'Имя обязательное поле',
      ],
      emailRules: [
        v => !!v || 'Email обязательное поле',
        v => /.+@.+/.test(v) || 'Email должен быть валидным',
      ],
      passwordRules: [
        v => !!v || 'Пароль обязательное поле',
        v => v.length >= 8 || 'Минимум 8 символов',
      ],
      passwordConfirmRules: [
        v => !!v || 'Пароль обязательное поле',
        v => v.length >= 8 || 'Минимум 8 символов',
        v => v === this.register.password || 'Пароли не идентичны',
      ],
    };
  },
  methods: {
    async submitLogin(){
      let toast = useToast()
      login(this.login).then((r)=>{
        let data = r.data
        if (data.status == "invalid data") {
          toast.error("Неправильные данные для входы")
        } else {
          toast.success("Успешный вход")
          sessionStorage.setItem("token", data.access_token)
          sessionStorage.setItem("user", JSON.stringify(data.user))
          this.$emit("redirect")
        }
      }).catch(r=>{
        toast.error(r.response.data.message)
      })
    },
    async submitRegister(){
      let toast = useToast()
      register(this.register).then((r)=>{
        let data = r.data
        if (data.status == "invalid data") {
          toast.error("Неправильные данные для входы")
        } else {
          toast.success("Успешная регистраци")
          sessionStorage.setItem("token", data.access_token)
          sessionStorage.setItem("user", JSON.stringify(data.user))
          this.$emit("redirect")
        }
      }).catch(r=>{
        toast.error(r.response.data.message)
      })
    },
  },
};
</script>

<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card>
        <v-card-text>
          <v-tabs
              v-model="tab"
              background-color="deep-purple accent-4"
              dark
              slider-color="primary"
              align-tabs="center"
          >
            <v-tab value="login">Вход</v-tab>
            <v-tab value="register">Регистрация</v-tab>
          </v-tabs>
          <v-tabs-window v-model="tab">
            <v-tabs-window-item
                value="login"
            >
              <v-card-title>
                <span class="headline">Вход</span>
              </v-card-title>

              <v-card-subtitle>
                <v-form @submit.prevent="submitLogin">
                  <v-text-field
                      v-model="login.email"
                      label="Email"
                      type="email"
                      :rules="emailRules"
                      required
                  ></v-text-field>
                  <v-text-field
                      v-model="login.password"
                      label="Пароль"
                      type="password"
                      :rules="passwordRules"
                      required
                  ></v-text-field>

                  <v-btn type="submit" color="primary" block>
                    Войти
                  </v-btn>
                </v-form>
              </v-card-subtitle>

            </v-tabs-window-item>
            <v-tabs-window-item
                value="register"
            >
              <v-card-title>
                <span class="headline">Регистрация</span>
              </v-card-title>

              <v-card-subtitle>
                <v-form @submit.prevent="submitRegister">
                  <v-text-field
                      v-model="register.name"
                      label="Имя"
                      :rules="nameRules"
                      required
                  ></v-text-field>
                  <v-text-field
                      v-model="register.email"
                      label="Email"
                      type="email"
                      :rules="emailRules"
                      required
                  ></v-text-field>
                  <v-text-field
                      v-model="register.password"
                      label="Пароль"
                      type="password"
                      :rules="passwordRules"
                      required
                  ></v-text-field>
                  <v-text-field
                      v-model="register.password_confirmation"
                      label="Подтверждение пароля"
                      type="password"
                      :rules="passwordConfirmRules"
                      required
                  ></v-text-field>

                  <v-btn type="submit" color="primary" block>
                    Register
                  </v-btn>
                </v-form>
              </v-card-subtitle>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>