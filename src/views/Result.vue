<template>
  <body>
    <div>
      <header v-if="this.questionNumber == this.allQuestions-1">{{uiLabels.winner}} {{this.posArray[0]}}</header>
      <header v-else>{{uiLabels.scoreBoard}}</header>
      <template v-if="!this.isHost"> <h2>{{uiLabels.position}} {{this.posArray.indexOf(this.myName)+1}}</h2> </template>
    </div>
    <div></div>
    <Bars v-bind:data="data"
          v-bind:arrdata="arrdata"/>
    <div v-show="isHost && this.questionNumber != this.allQuestions-1">
      <button v-on:click="runQuestion" class="continueButton">
        {{uiLabels.nextQues}}
      </button>
    </div>
    <div v-show="isHost">
      <button v-on:click="endQuiz" class="continueButton" id="exitQuizButton">
        {{uiLabels.endQuiz}}
      </button>
    </div>
  </body>
  <footer>
    <div>
      <h5> © Quizcus inc</h5>
    </div>
  </footer>
</template>

<script>
import Bars from '@/components/Bars.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Result',
  components: {
    Bars
  },
  data: function () {
    return {
      lang:"",
      question: "",
      questionNumber: 0,
      isHost: false,
      myName: "",
      myPoints: 0,
      pollId:"",
      uiLabels: {},
      allQuestions: 0,
      arrdata:[],
      posArray:[],
      data: {
      }
    }
  },
  created: function () {
    this.lang = this.$route.params.lang;
    this.isHost = this.$route.params.isHost==="true"?true:false;
    this.myName = this.$route.params.myName;
    this.myPoints = this.$route.params.myPoints;
    this.pollId = this.$route.params.id;
    this.allQuestions = this.$route.params.allQuestions;
    this.questionNumber = this.$route.params.questionNumber
    socket.emit('joinPoll', this.pollId)
    socket.on("dataUpdate", (update) => {
      this.data = update.a;
      this.question = update.q;
      this.sortera();
    });
    socket.on("newQuestion", update => {
      this.question = update.q;
      this.data = {};
    })
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("sendToQues",() =>
        this.$router.push({ name: 'Poll', params: { id: this.pollId, lang: this.lang, isHost: this.isHost, questionNumber: this.questionNumber,myName:this.myName,myPoints:this.myPoints}})
    )
    socket.on("sendToStart",() =>
        this.$router.push({ name: 'Start', params: { id: this.pollId, questionNumber: this.questionNumber}})
    )
  },
  methods: {
    runQuestion: function () {
      this.questionNumber++;
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
      socket.emit('goBackToQues', {pollId: this.pollId, isHost: this.isHost, questionNumber: this.questionNumber,  myName: this.myName})
      this.isHost= true;
      this.$router.push({ name: 'Poll', params: { id: this.pollId, lang: this.lang, isHost: this.isHost, questionNumber: this.questionNumber}})
    },
    endQuiz: function () {
      this.questionNumber=0;
      socket.emit('goToStart', {pollId: this.pollId, isHost: this.isHost, questionNumber: this.questionNumber})
      this.$router.push({ name: 'Start', params: { id: this.pollId, questionNumber: this.questionNumber}})
    },
    sortera(){
      this.arrdata = Object.entries(this.data).sort((a,b) => b[1]-a[1]);
      this.posArray = this.arrdata.flat();
      for (var i = 1; i <= this.posArray.length; i ++){
        this.posArray.splice(i, 1);
      }
    },
  }
}
</script>

<style scoped>
header {
  padding-top:0%;
  font-size: 4em;
  text-shadow: -0.03em 0 #990000, 0 0.03em #990000, 0.07em 0 #990000, 0 -0.03em #990000;
  margin:2%;
}
h2{
  padding-top:0%;
  font-size: 2em;
  color: white;
  text-shadow: -0.03em 0 #990000, 0 0.03em #990000, 0.09em 0 #990000, 0 -0.03em #990000;
  margin-bottom:2%;
}
.continueButton {
  float: right;
  margin: 2% 5% 2% 0%;
  background-color: rgb(100, 155, 36);
  color: white;
  font-size: 1em;
  text-transform: uppercase;
  height: 4em;
  width: 15%;
  min-width: 8em;
  border: 0.2em navy solid;
}
#exitQuizButton {
  float: left;
  background-color: #990000;
  margin: 2% 0% 2% 5%;
}
</style>
