<template>
  <div>
    <header v-if="this.questionNumber == this.allQuestions-1">And the winner is: </header>
    <header v-else>Scoreboard</header>
  </div>
  <div>

  </div>
  <Bars v-bind:data="data"
        v-bind:nameArray="nameArray"/>
  <div v-show="isHost && this.questionNumber != this.allQuestions-1">
    <button v-on:click="runQuestion" class="continueButton">
      Next question!
    </button>
  </div>
  <div v-show="isHost">
    <button v-on:click="endQuiz" class="exitQuizButton">
      End quiz
    </button>
  </div>
</template>

<script>
// @ is an alias to /src
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
      question: "",
      questionNumber: 0,
      isHost: false,
      nameArray:[],
      myName: "",
      myPoints: 0,
      pollId:"",
      allQuestions: 0,
      data: {
      }
    }
  },
  created: function () {
    this.isHost = this.$route.params.isHost==="true"?true:false;
    this.myName = this.$route.params.myName;
    this.myPoints = this.$route.params.myPoints;
    this.pollId = this.$route.params.id;
    this.allQuestions = this.$route.params.allQuestions;
    this.questionNumber = this.$route.params.questionNumber
    this.nameArray = this.$route.params.nameArray;
    socket.emit('joinPoll', this.pollId)
    socket.on("dataUpdate", (update) => {
      this.data = update.a;
      this.question = update.q;
    });
    socket.on("newQuestion", update => {
      this.question = update.q;
      this.data = {};
    })
    socket.on("sendToQues",() =>
        this.$router.push({ name: 'Poll', params: { id: this.pollId, lang: this.lang, isHost: this.isHost, questionNumber: this.questionNumber,myName:this.myName,myPoints:this.myPoints, nameArray: this.nameArray}})
    )
    socket.on("sendToStart",() =>
        this.$router.push({ name: 'Start', params: { id: this.pollId, questionNumber: this.questionNumber}})
    )
  },

  methods: {
    runQuestion: function () {
      this.questionNumber++;
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
      socket.emit('goBackToQues', {pollId: this.pollId, isHost: this.isHost, questionNumber: this.questionNumber, nameArray: this.nameArray, myName: this.myName})
      console.log('continue to next question woho!');
      this.isHost= true;
      this.$router.push({ name: 'Poll', params: { id: this.pollId, lang: this.lang, isHost: this.isHost, questionNumber: this.questionNumber, nameArray: this.nameArray}})
    },
    endQuiz: function () {
      this.questionNumber=0;
      socket.emit('goToStart', {pollId: this.pollId, isHost: this.isHost, questionNumber: this.questionNumber})
      this.$router.push({ name: 'Start', params: { id: this.pollId, questionNumber: this.questionNumber}})
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 3em;
  text-shadow: -0.03em 0 #990000, 0 0.07em #990000, 0.07em 0 #990000, 0 -0.01em #990000;
  color: white;
  margin-top: 3%;
  margin-bottom: 0%;
}

header {
  font-size: 5em;
  text-shadow: -0.03em 0 #990000, 0 0.07em #990000, 0.07em 0 #990000, 0 -0.01em #990000;
  color: white;
  padding-top: 0%;
  margin-bottom: 3%;
}

.continueButton {
  float: right;
  background-color: rgb(100, 155, 36);
  color: white;
  font-size: 1em;
  margin-right: 5%;
  text-transform: uppercase;
  height: 3em;
  width: 15%;
  border: 0.2em navy solid;
}

.exitQuizButton {
  float: left;
  background-color: #990000;
  color: white;
  font-size: 1em;
  margin-left: 5%;
  text-transform: uppercase;
  height: 3em;
  width: 15%;
  border: 0.2em navy solid;
}
</style>
