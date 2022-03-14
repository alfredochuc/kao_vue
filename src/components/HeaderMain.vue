<template>
  <div class="hello">
    <header v-if="isLogin" class="header-app">
        <div class="container header-main">
          <div class="title-app"><h2>App Music</h2></div>
          <div class="user-info">
            <font-awesome-icon icon="fa-solid fa-user" />
            <span class="user-info-user">{{username}}</span> 
          </div>
        </div>    
    </header>
   
  </div>
</template>

<script>
export default {
  name: 'HeaderMain',
  props: {
    msg: String
  },
   data() {
    return {
      isLogin: null,
      username: null,
    }
  },
  async created() {
    if(localStorage.getItem('isLogin') == null){
      this.$router.push('/login')
    }
  },
   mounted() {
    if (localStorage.isLogin) {
      this.isLogin = localStorage.isLogin;
    }
    if (localStorage.username) {
      this.username = localStorage.username;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
