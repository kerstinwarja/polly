<template>
  <div>
    {{question}}: här är quesnr
    {{questionNumber}}
   <h2> Mitt NAmn är{{myName}}</h2>

  </div>
  <Bars v-bind:data="data"
        v-bind:nameArray="nameArray"/>
  This is the result of your poll
  <br>
  You have succeded
  {{data}}

  <div v-show="isHost">
    <button v-on:click="runQuestion" class="continueButton">
      Next question!
    </button>
  </div>
  <div v-show="isHost">
    <button v-on:click="endQuiz" class="continueButton">
      Press to end this quiz
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
      data: {
      }
    }
  },
  created: function () {
    this.isHost = this.$route.params.isHost==="true"?true:false;
    this.myName = this.$route.params.myName;
    this.myPoints = this.$route.params.myPoints;
    this.pollId = this.$route.params.id;
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
