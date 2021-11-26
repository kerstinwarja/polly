<template>
  <body>
    <div id="nav">
      <button v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
    </div>
    <header>
      <h1>Quizcus</h1>
    </header>
     <div class="wrapper">
        <!--Create Poll button-->
        <router-link v-bind:to="'/create/'+lang">
            <button>{{uiLabels.createPoll}}</button>
        </router-link>

        <!--Participate in Poll button-->
        <!--Skapa en ny vy flr sidan vi hamnar på där man får skriva in pollid för att komma till "'/poll/'+id" -->
        <router-link v-bind:to="'/poll/'+id">
            <button>{{uiLabels.participatePoll}}</button>
        </router-link>

        <!-- ORGINALKOD TA INTE BORT FÖR FAN div
          <div id="partPoll">
            <label>
              Write poll id:
              <input type="text" v-model="id">
            </label>
            <router-link v-bind:to="'/poll/+id'" tag="button"><br>{{uiLabels.participatePoll}}</router-link>
            </div>
          </div-->

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
  background-image: url(https://png.pngtree.com/thumb_back/fw800/background/20200916/pngtree-circus-background-image_398762.jpg);
  background-repeat: no-repeat;
  background-size:cover;
  background-position: bottom;
  background-attachment: fixed;
  margin: 0px;
  padding: 0px;
}

button{
    border-radius: 8px;
}

.wrapper {
   margin: 0px;
   width: 95%;
   height: 95%;
   display: grid;
   grid-gap: 5px;
   grid-template-columns: 50% 50%;
   align-items: center;
  }

.wrapper button{
  width: 50%;
  height: 50px;
  background-color: wheat;
  text-transform: uppercase;
}

button:hover {
  cursor: pointer;
}


#nav button{
  width: 150px;
  height: 50px;
  top: 7%;
  left: 7%;
  background-color: wheat;
  position: absolute;
}

header {
  font-size: 50pt;
  text-align: center;
  padding-top: 50px;
  margin: 0;
  color: white;
  text-shadow: 3px 3px #990000;
}


</style>
