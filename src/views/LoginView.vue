<template>
  <div class="login-page">
    <LoginForm title="Bienvenido " class="login-form" />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm.vue'

export default {
  name: 'LoginView',
  components: {
    LoginForm
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
.login-form{
  width: 30vw;
  margin-top:10%;
  @include responsive($desktop){
    width: 70vw;
  }
}

.login-page{
  color:#919496;
  display: flex;
  align-items: center;
  justify-content: center;
  

}
</style>
