<template>
  <div id="app">
   <HeaderMain />
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/main.scss";
#app {
  font-family: 'Poppins', sans-serif;
  color: #2c3e50;
}
body{
  background: #1B1B1B;
  margin: 0;
}
h1,h2,h3{
  margin: 5px 0;
}
h1{
  @include responsive($tablet){
     font-size: 25px;
    }
}
.title-app{
  h2{
    font-size: 30px;
    font-weight:bold;
    @include responsive($tablet){
     font-size: 25px;
    }
  }
}
.container{
  width: 1200px;
  background: #fff;
  margin: 0 auto;
  border-radius: 5px;
  @include responsive($desktop){
    width: 90%;
  }
  @include responsive($tablet-landscape){
    width: 90%;
  }
  @include responsive($tablet){
    width: 80%;
  }
 
}
.header-app{
  padding: 10px 0px;
  margin-top:0;
  background: #fff;
}
.header-main{
  display: flex;
  align-content: center;
  align-content: center;
  justify-content: space-between;
}
.user-info{
  display: flex;
  justify-content: center;
  align-items: center;
  .user-info-user{
    padding-left: 10px;
  }
}
</style>
