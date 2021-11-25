<template>
  <body>
    <!-- <img src=https://ae01.alicdn.com/kf/H4f714299b1b8412f8e1548736541f7afd/7x5FT-Retro-Vintage-Carnival-Circus-Spotlight-Circo-Stage-Custom-Photo-Studio-Backdrop-Background-Vinyl-220cm-X.jpg alt="id">
   -->
    <div id="nav">
      <button v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
    </div>
     
     <div class="wrapper"> 

      <div id="createPoll">
          <router-link v-bind:to="'/create/'+lang">{{uiLabels.createPoll}}</router-link>
      </div>
      <div id="titleBox">
      <h6> QUIZCUZ</h6>
      </div>
      <div id="partPoll">
      <label>
        Write poll id: 
        <input type="text" v-model="id">
      </label>
      <router-link v-bind:to="'/poll/'+id" tag="button"><br>{{uiLabels.participatePoll}}</router-link>
      </div>
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
template{
  margin: 0px;
}
body{
  background-image: url(https://ae01.alicdn.com/kf/H4f714299b1b8412f8e1548736541f7afd/7x5FT-Retro-Vintage-Carnival-Circus-Spotlight-Circo-Stage-Custom-Photo-Studio-Backdrop-Background-Vinyl-220cm-X.jpg);
  background-repeat: no-repeat;
  background-size:cover;
  background-position: center;
  background-attachment: fixed;
  margin: 0px;
  padding: 0px;
  border: 1px solid rgb(0, 0, 0);
  height: 1320px;
}
.wrapper {
   margin: 0px;
   width: 95%;
   height: 95%;
   padding-left: 5%;
   display: grid;
   grid-gap: 5px;
   grid-template-columns: 33% 33% 33%;
   align-items: center;
  }
  .wrapper button{
    height: 5%;
    width: 80%;
  }

#createPoll{
   border: 1px solid rgb(0, 0, 0);
   width: 50%;
   height: 20%;
   background-color: wheat;
   grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 3;
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
#titleBox{
  grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
}
#partPoll{
  grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 3;
   border: 1px solid rgb(0, 0, 0);
   width: 50%;
   height: 20%;
   /*position: absolute;/*/
   background-color: wheat;
   align-content: center;

}

</style>