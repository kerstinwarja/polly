<template>
  <body>
    <img src=https://ae01.alicdn.com/kf/H4f714299b1b8412f8e1548736541f7afd/7x5FT-Retro-Vintage-Carnival-Circus-Spotlight-Circo-Stage-Custom-Photo-Studio-Backdrop-Background-Vinyl-220cm-X.jpg alt="id">
    <div id="nav">
      <button v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
    </div>
     
    <div class="wrapper">
    <button> kanop 1</button>
     <button> kanop 2</button>
     </div>
      <div id="createPoll">
          <router-link v-bind:to="'/create/'+lang">{{uiLabels.createPoll}}</router-link>
      </div>
      <h6 id="titleText"> QUIZCUZ</h6>
      <div id="partPoll">
      <label>
        Write poll id: 
        <input type="text" v-model="id">
      </label>
      <router-link v-bind:to="'/poll/'+id" tag="button"><br>{{uiLabels.participatePoll}}</router-link>
      </div>
    
  </body>
</template>


<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Start',
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: "en"
    }
  },
  created: function () {
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  },
  methods: {
    switchLanguage: function() {
      if (this.lang === "en")
        this.lang = "sv"
      else
        this.lang = "en"
      socket.emit("switchLanguage", this.lang)
    }
  }
}
</script>
<style>
body{
  margin: 0px;
}
.wrapper {
  margin: 0px;
  top: 50px;
  position: absolute;
  width: 100%;
  height: 100%;
  padding-left: 5%;
    display: grid;
    grid-gap: 29%;
    grid-template-columns: 33% 33%;
  }
  .wrapper button{
    height: 5%;
    width: 80%;
  }

body > img {
  width: 100%;
  height:auto ;
  position: relative;
}
#createPoll{
   border: 1px solid rgb(0, 0, 0);
   width: 18%;
   height: 10%;
   /*position: absolute;/*/
   top: 55%;
   left: 15%;
   background-color: wheat;
}
#nav button{
  width: 150px;
  height: 50px;
  top: 7%;
  left: 7%;
  background-color: wheat;
  position: absolute;
}
  
/*#createPoll:hover{
   box-shadow: 14px 14px 9px black;
   transform : scale(1.06, 1.06);
   transition: all 0.2s ease-in-out;
}*/
h6{
  font-size: 70px;
}
#titleText{
  position: absolute;
  top: 600px;
  text-align: center;
}
#partPoll{
   border: 1px solid rgb(0, 0, 0);
   width: 18%;
   height: 10%;
   position: absolute;
   top: 55%;
   left: 67%;
   background-color: wheat;
   text-align: center;
}

</style>