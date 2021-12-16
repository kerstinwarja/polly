<template>
  <!--{{pollId}}-->
  <Question v-bind:question="question"
            v-on:answer="submitAnswer"/>
   {{timerCount}}
  <!-- {{this.question.t}}-->

  <!-- <button v-on:click="nextQue()">
          NExt
        </button>-->
</template>

<script>
// @ is an alias to /src
import Question from '@/components/Question.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Poll',
  components: {
    Question
  },
  data: function () {
    return {
      question: {
        q: "",
        a: [],
        t:""
      },
      timerCount : 45,
      timerEnabled: true,
      pollId: "inactive poll",
      questionNumber: 0,
      nextactivated : true,
      
    }
  },/*
  watch: {

            timerCount: {
                handler(time) {
                  console.log(this.question.t)
                      if(this.nextactivated){
                         this.timerCount = this.question.t
                         this.nextactivated = false
                          this.timerCount--
                      }
                      
                    else if (time > 0 && this.timerEnabled) {
                        setTimeout(() => {
                            this.timerCount--;
                        }, 1000);
                    }
                    else if(time < 1 && time>-1 && this.timerEnabled){
                        this.timerEnabled = true;
                       // this.timerCount = "Slut"
                    }
                    else{
                      this.timerCount = this.question.t;
                    }
                },
                immediate: true
            }

        },*/
  created: function () {
    //sockets, server, data, console.log osv
    this.pollId = this.$route.params.id
    //console.log("steg1")
    socket.emit('joinPoll', this.pollId)
    //console.log("steg2")
    socket.on("newQuestion", q =>
      this.question = q
    )
    console.log("heere BAJS")
    this.timerCount = this.question.t
    console.log("steg3")
  },
  methods: {
    submitAnswer: function (answer) {
      socket.emit("submitAnswer", {pollId: this.pollId, answer: answer})
    },
    nextQue() {
      console.log("next pressed")
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber+1})
      this.questionNumber++
      this.timerCount = this.question.t
      this.nextactivated = true
    },
  }
}
</script>
