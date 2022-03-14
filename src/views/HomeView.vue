<template>
  <div class="home">
    
    
    <div class="container page-app-music">
      <h1>Bienvenido a App Music</h1>
    
      <MusicRecommendation />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MusicRecommendation from '@/components/MusicRecommendation.vue'

export default {
  name: 'HomeView',
  components: {
    MusicRecommendation
  }
}
</script>

<style lang="scss">
  .page-app-music{
    margin-top:20px;
     padding: 20px;
     margin-bottom: 20px;
  }
</style>
