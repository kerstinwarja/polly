<template>
  <body>
        <header>
            <br>
            Header
            <button v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
        </header>
        <div id="boxLeft">
            <div id="createPoll">
                <router-link v-bind:to="'/create/'+lang">{{uiLabels.createPoll}}</router-link>
            </div>
        </div>
        <div id="boxMid">
            <div id="titleBox">
                <h6> QUIZCUZ</h6>
            </div>
        </div>
        <div id="boxRight">
            <div id="partPoll">
                <label>
                  Write poll id: 
                  <input type="text" v-model="id">
                </label>
                <router-link v-bind:to="'/poll/'+id" tag="button"><br>{{uiLabels.participatePoll}}</router-link>
                </div>
        </div>
        <footer>
            Footers
        </footer>
         
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
span{
}
body{
   width: 95%;
   height: 100%;
   padding-left: 5%;
   background-image: url(https://ae01.alicdn.com/kf/H4f714299b1b8412f8e1548736541f7afd/7x5FT-Retro-Vintage-Carnival-Circus-Spotlight-Circo-Stage-Custom-Photo-Studio-Backdrop-Background-Vinyl-220cm-X.jpg);
   background-repeat: no-repeat;
   background-size: cover;
   overflow: hidden;
}
header{
   width: 100%;
   height: 10%;
   
}
#boxLeft{
   width: 25%;
   height: 80%;
   float: left;
   margin-top: 30%;
}
#boxMid{
   width: 45%;
   height: 80%;
   float: left;
}
#boxRight{
   width: 25%;
   height: 80%;
   float: left;
   margin-top: 30%;
}
footer{
   bottom: 10%;
   height: 10%;
   width: 100%;
   clear: left;
}
#titleBox{
   color: hotpink;
   text-align: center;
}
h6{
   font-size: 70px;
   
   text-shadow: -8px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
#partPoll{
   border: 1px solid rgb(0, 0, 0);
   width: 50%;
   height: 20%;
   background-color: wheat;
   float: right;
}
   #createPoll{
      border: 1px solid rgb(0, 0, 0);
      width: 50%;
      height: 20%;
      background-color: wheat;
   }
      </style>