<template>
  <body>
    <div id="nav">
      <button v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
    </div>
    <header>
      <h4>{{uiLabels.welcomeTo}}</h4>
      <h1>Quizcus</h1>
    </header>
    <div class="wrapper">
      <div>
        <router-link v-bind:to="'/initialize/'+lang">
          <button>{{uiLabels.createPoll}}</button>
        </router-link>
        <h6>{{uiLabels.createExpli}}</h6>
      </div>
      <div>
        <router-link v-bind:to="'/polllibrary/'+lang">
          <button>{{uiLabels.participatePoll}}</button>
        </router-link>
        <h6>{{uiLabels.participateExpli}}</h6>
      </div>
    </div>
  </body>
  <footer>
    <div>
      <h5> © Quizcus inc</h5>
    </div>
  </footer>
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
      lang: "en",
      questionNumber: 0
    }
  },
  created: function () {
    this.questionNumber = this.$route.params.questionNumber
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
header {
  font-size: 4em;
  text-align: center;
  margin: 0%;
  color: white;
  text-shadow: -0.03em 0 #990000, 0 0.03em #990000, 0.07em 0 #990000, 0 -0.03em #990000;
}
h4 {
  text-align: center;
  color: white;
  text-shadow: -0.04em 0 #990000, 0 0.04em #990000, 0.09em 0 #990000, 0 -0.04em #990000;
  font-size: 0.5em;
}
h6{
  font-size: 1.5em;
  margin:2%;
  color:white;
  text-shadow: -0.05em 0 black, 0 0.05em black, 0.09em 0 black, 0 -0.05em black;
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
footer{
  margin-bottom:1%;
}
button{
  border-radius: 0.8em;
}
.wrapper {
  width: 95%;
  height: 95%;
  display: grid;
  grid-gap: 3%;
  grid-template-columns: 50% 50%;
  align-items: center;
  padding-left: 1%;
}
.wrapper button{
  width: 70%;
  height: 3em;
  background-color: #fbf1e0;
  text-transform: uppercase;
  font-size: 2em;
  color: #2d4463;
  border: 0.1em #2d4463 solid;
}
button:hover {
  cursor: pointer;
  box-shadow: 0px 5px 10px #646467;
  transform: translateY(-5px);
}
#nav{
  padding:0%;
}
#nav button{
  width: 10%;
  min-width: 4em;
  height: 3em;
  top: 7%;
  left: 7%;
  background-color: #fbf1e0;
  position: absolute;
  font-size: 0.8em;
  color: #2d4463;
  border: 0.2em #2d4463 solid;
  text-transform: uppercase;
}
footer{
   position: fixed;
   bottom: 0;
   height: 2%;
   width: 97%;
   text-align: left;
   padding-left: 2%;
}
footer h5{
  text-align: left;
  clear: left;
  margin: 0%;
}
@media only screen and (max-width: 980px) {
  header {
    font-size: 3em;
  }
  .wrapper{
    grid-template-columns: 100%;
  }
  #nav{
    font-size:0.5em;
  }
}

</style>
