<template>
  <body>
    <div id="nav">
      <!-- <button v-on:click="switchLanguage"><img src="https://cdn.wallpapersafari.com/93/55/sWHPlh.jpg"> {{uiLabels.changeLanguage}}</button-->
      <button v-on:click="switchLanguage"> {{uiLabels.changeLanguage}}</button>
    </div>
    <div>
    <header>
      <h1>Quizcus</h1>
    </header>
    <p id="subTitle">Create a quiz or <br> participate in an existing quiz!</p>
    </div>
     <div class="wrapper">
        <!--Create Poll button-->
        <router-link v-bind:to="'/initialize/'+lang">
            <button>{{uiLabels.createPoll}}</button>
        </router-link>

        <!--Participate in Poll button-->
        <!--Skapa en ny vy för sidan vi hamnar på där man får skriva in pollid för att komma till "'/poll/'+id" -->
        <router-link v-bind:to="'/polllibrary/'+lang">
            <button>{{uiLabels.participatePoll}}</button>
        </router-link>

        <!-- ORGINALKOD TA INTE BORT FÖR SNÄLLA div
        <router-link v-bind:to="'/create/'+lang">
            <button>{{uiLabels.createPoll}}</button>
        </router-link>
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
    },
    create: function(){

    }
  }
}
</script>

<style>
template{
  margin: 0px;
}

body{
  background-image:url('https://png.pngtree.com/thumb_back/fw800/background/20200916/pngtree-circus-background-image_398762.jpg');
  background-repeat: no-repeat;
  background-size:cover;
  background-position: bottom;
  background-attachment: fixed;
  margin: 0px;
  padding: 0px;
}

button{
  border-radius: 0.2em;
}

.wrapper {

/*   width: 50%;
   height: 100%;
   display: grid;
   grid-gap: 40%;
   grid-template-columns: 50% 50%;
   align-items: center;

   margin: 2% 50% 10% 15%;*/


  width: 95%;
  height: 95%;
  display: grid;
  grid-gap: 3%;
  grid-template-columns: 50% 50%;
  align-items: center;
  padding-left: 1%;
}


.wrapper button{
  width: 100%;
  height: 3em;
  background-color: #fbf1e0;
  text-transform: uppercase;
  font-size: 2em;
  color: navy;
  border: 0.1em navy solid;
}

button:hover {
  cursor: pointer;
}

#nav button{

/*  width: 5%;
  height: 10%;*/

  width: 10em;
  height: 4em;

  top: 7%;
  left: 7%;
  background-color: #fbf1e0;
  position: absolute;
  font-size: 0.8em;
  color: navy;
  border: 0.2em navy solid;
  text-transform: uppercase;
  /* border: 2px white solid; */
/*  overflow: hidden;
  border-radius: 100%;
  background-image: url(https://cdn.wallpapersafari.com/93/55/sWHPlh.jpg);*/
}

#nav img {
  height: 100%;
  width: 100%;
  border-radius: 100%;

}

header {
  font-size: 4.5em;
  text-align: center;
  padding-top: 5%;
  padding-bottom: 0%;
  margin: 0;
  color: white;
  text-shadow: -0.03em 0 #990000, 0 0.07em #990000, 0.07em 0 #990000, 0 -0.01em #990000;
}

header h1 {
  margin: 0%;
  padding: 7% 0% 0% 0%;
}

#subTitle {
  font-size: 3em;
  text-align: center;
  margin-top: 0;
  color: white;
  text-shadow: -2px 0 #990000, 0 2px #990000, 2px 0 #990000, 0 -2px #990000;
}

</style>
