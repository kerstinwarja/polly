<template>
  <div>
    {{question}}: här är quesnr
    {{questionNumber}}
  </div>
  <Bars v-bind:data="data"/>
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
      data: {
      }
    }
  },
  created: function () {
    this.isHost = this.$route.params.isHost==="true"?true:false;
    this.myName = this.$route.params.myName;
    this.pollId = this.$route.params.id;
    this.questionNumber = this.$route.params.questionNumber
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
        this.$router.push({ name: 'Poll', params: { id: this.pollId, lang: this.lang, isHost: this.isHost,questionNumber: this.questionNumber}})
    )
    socket.on("sendToStart",() =>
        this.$router.push({ name: 'Start', params: { id: this.pollId}})
    )
  },

  methods: {
    runQuestion: function () {
      this.questionNumber++;
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
      socket.emit('goBackToQues', {pollId: this.pollId, isHost: this.isHost, questionNumber: this.questionNumber})
      console.log('continue to next question woho!');
      this.isHost= true;
      this.$router.push({ name: 'Poll', params: { id: this.pollId, lang: this.lang, isHost: this.isHost, questionNumber: this.questionNumber}})
    },
    endQuiz: function () {
      this.questionNumber=0;
      socket.emit('goToStart', {pollId: this.pollId, isHost: this.isHost})
      this.$router.push({ name: 'Start', params: { id: this.pollId}})
    }
  }
}
</script>
