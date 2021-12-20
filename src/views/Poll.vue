<template>
  <!--{{pollId}}-->

  <Question v-bind:question="question"
            v-on:answer="submitAnswer"/>

   <!--{{timerCount}}
   {{this.question.t}} -->

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
        t:"",
        isCorrect:[],
        questionNumber: 0,
        questionImg: ""
      },
      //timerCount : 45,
      //timerEnabled: true,
      pollId: "inactive poll",
     // nextactivated : true,

    }
  },/*

var a = new Date()


intervalId = setInterval(()=>{
    console.log(Math.round((new Date() - a)/1000))
}, 1000)


clearInterval(intervalId)


  GAMMAL TIMER UNDER, NY HET TIMER ÖVER
  watch: {

            timerCount: {
                handler(time) {
                  console.log(this.question.t)
                     if (time > 0 && this.timerEnabled) {
                        setTimeout(() => {
                            this.timerCount--;
                        }, 1000);
                    }
                    else{
                      this.timerCount = "SLUT";
                    }
                },
                immediate: true
            }

        },*/
  created: function () {
    //sockets, server, data, console.log osv
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    //console.log("steg2")
    socket.on("newQuestion", q =>
      this.question = q,
      // this.timerCount = this.question.t,
             //socket.on("runQuestion", {pollId: this.pollId, questionNumber: this.question.questionNumber})
    )
    console.log("heere BAJS")
    this.questionImg = this.question.questionImg

    console.log("this is q"+this.question)
  },
  methods: {
    submitAnswer: function (answer) {
      socket.emit("submitAnswer", {pollId: this.pollId, answer: answer})
    },
    nextQue() {
      console.log("next pressed")
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber+1})
      this.questionNumber++
      //this.timerCount = this.question.t
      //this.nextactivated = true
    },
  }
}
</script>
