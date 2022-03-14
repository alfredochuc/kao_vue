<template>
  <div class="cp-login-form">
    <h1>{{ title }}</h1>
    <form @submit.prevent="LoginApp">
      <div class="form-input">
        <input type="text" placeholder="Usuario" v-model="username" >
      </div>
      <div class="form-input">
        <input type="password" placeholder="Contraseña">
      </div>
      <div class="form-input">
        <button type="submit" class="btn-ingresar">Ingresar</button>
      </div>
    </form>
   
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  props: {
    title: String
  },
  data() {
    return {
      username:'',
      isLogin: false,
    }
  },
  mounted() {
    if (localStorage.username) {
      this.username = localStorage.username;
    }
    if (localStorage.isLogin) {
      this.isLogin = localStorage.isLogin;
    }
  },
  methods: {
    LoginApp () {
      console.log("Login");
      localStorage.username = this.username;
      localStorage.isLogin  = true ;
      this.$router.push('/')
      // this.$emit('exit', true)
      // this.$router.push(`/search/${this.sQuery}`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

.cp-login-form{
  background: #fff;
  padding: 20px;
  border-radius: 10px;
}
.form-input{
  margin-bottom: 10px;
  select,
  input{
    padding: 10px 5px;
    width: 90%;
    border:1px solid rgb(88, 82, 82);
  }
}

.btn-ingresar{
  padding: 10px 20px;
  background: #3DDF64;
  color: #000;
  border: none;
  border-radius: 10px;
  font-weight: bold;
}
.cp-login-form .btn-ingresar{
  float: right;
  margin-right: 12px;
}
</style>
