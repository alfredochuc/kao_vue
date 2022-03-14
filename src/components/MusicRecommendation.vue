<template>

  <div class="cp-music-recommendation">
    <h1>{{ msg }}</h1>
    <div class="recommendation-form">
     
      <form @submit.prevent="searchRecommendation" class="inline-form">
        <div class="form-input">
          <select v-model="gender">
           <option v-for="option in optionsGenders" :key="option.index" v-bind:value="option">
            {{ option }}
          </option>
          </select>
          
        </div>
        <div class="form-input">
          <input type="number" v-model="trackBPM" placeholder="Pulsaciones por minuto">
        </div>
        <div class="form-input">
          <input type="number" v-model="trackDuration" placeholder="Tiempo aproximado Minutos">
        </div>
        <div class="form-input">
          <button type="submit" class="btn-ingresar">Buscar</button>
        </div>
    </form>
    </div>
    <div v-if="listRecommendations.length" class="recommendation-result">
      <div class="msg-result">Se han encontrado los siguientes resultados : {{ gender }} - {{ trackBPM }} - {{ trackDuration }}</div>
         
      <div class="item-track" v-for="track in listRecommendations" :key="track.index">
        <div class="item-track-img">
          <img :src="track.album.images[1].url" alt="">
        </div>
        <div class="item-track-info">
          <h2>{{track.name}}</h2>
          <div class="item-track-artists">
            <span v-for="artist in track.artists" :key="artist.index" class="artists">{{artist.name}}</span>
          </div>
          <div class="item-track-album"><b>Album: </b> {{track.album.name}}</div>
          <div class="item-track-duration"> <b>Duración: </b> {{track.duration_ms | convertMinute}}</div>
          <audio class="player-audio" v-if="track.preview_url" controls="controls">
            <source :src="track.preview_url" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
    
    
  </div>
</template>

<script>

import {getRecommendations, getGendersApi, getToken } from "../functions/spotifyAPI";

export default {
  name: 'MusicRecommendation',
  props: {
    msg: String
  },
   data() {
    return {
      optionsGenders: [],
      listRecommendations: [],
      gender: '',
      trackBPM: 120,
      trackDuration: 5,
      categories:[],
      token: '',
      isLogin: null,
      color: "#38B6DF",
      size: "90px"
    }
  },
  async created() {
    if(localStorage.getItem('isLogin') == null){
      this.$router.push('/login')
    }
    this.getLocalToken();
    this.getGenders();
  },
   mounted() {
    if (localStorage.isLogin) {
      this.isLogin = localStorage.isLogin;
    }
  },
  methods: {
    async getLocalToken(){
        const clientId = process.env.VUE_APP_SPOTIFY_CLIENT_ID;
        const clientSecret = process.env.VUE_APP_SPOTIFY_CLIENT_SECRET;

        const token = await getToken(clientId, clientSecret);

        this.token = token
    },
    async getGenders(){
        const clientId = process.env.VUE_APP_SPOTIFY_CLIENT_ID;
        const clientSecret = process.env.VUE_APP_SPOTIFY_CLIENT_SECRET;

        console.log(clientId);
        console.log(clientSecret);

        const token = await getToken(clientId, clientSecret);
        const genderList = await getGendersApi(token);
        this.optionsGenders = genderList
        
    },
    async searchRecommendation(){

      if( !this.gender || !this.trackBPM || !this.trackDuration){
        alert("El campo de Genero, Pulsaciones y la duracion con requerido");
        return false;
      }
      // intervalao para min y max en segundos
      const intervalRange = 15;
      const min_duration_ms = (this.trackDuration * 60000) - (intervalRange * 1000);
      const max_duration_ms = (this.trackDuration * 60000) + (intervalRange * 1000);

      const clientId = process.env.VUE_APP_SPOTIFY_CLIENT_ID;
      const clientSecret = process.env.VUE_APP_SPOTIFY_CLIENT_SECRET;

      const token = await getToken(clientId, clientSecret);
      const recommendation = await getRecommendations(token,this.gender, this.trackBPM, min_duration_ms, max_duration_ms );
      this.listRecommendations = recommendation;

    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    convertMinute: function(value){
      if (!value) return ''
        const minutes = Math.floor(value / 60000);
        const seconds = ((value % 60000) / 1000).toFixed(0);

      return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/scss/main.scss";
.inline-form{
  padding: 30px 10px;
  display: flex;
 @include responsive($tablet){
  flex-direction: column;
  padding: 10px;
  }
}
.recommendation-result{
  margin-top:10px
}
.msg-result{
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
}
.item-track{
  border: 1px solid #e3e3e3;
  display: flex;
  @include responsive($tablet){
    flex-direction: column;
    // padding: 10px;
  }
  .item-track-img{
    width: 25%;
    @include responsive($tablet){
      width: 100%;
    }
    img{
      width: 100%;
    }
  }
  .item-track-info{
    width: 70%;
    padding: 15px;
    @include responsive($tablet){
      width: 100%;
    }
    h2{
      margin:0;
      margin-bottom: 10px;
    }
  }
}
.player-audio{
  @include responsive($tablet){
      width: 80%;
    }
}
.item-track-artists{
  margin-bottom: 5px;
}
.artists{
  padding: 5px 10px;
  margin-right: 10px;
  color: #fff;
  background: rgba($color: #000000, $alpha: .5);
  display: inline-block;
}

</style>
