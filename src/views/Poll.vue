<template>
  <!--{{pollId}}-->

  <Question v-bind:question="question"
            v-on:answer="submitAnswer"/>
{{SONG}}hät
      <div id="audio">
     <audio controls autoplay loop v-if="SONG == 'Brass' "> <!--remember to add autoplay-->
        <source src="../music/circusBrass.mp3" type="audio/mpeg">
      </audio>
      <audio controls autoplay loop v-if="SONG == 'Trap'"> <!--remember to add autoplay-->
        <source src="../music/circusTrap.mp3" type="audio/mpeg">
      </audio>
      <audio controls autoplay loop v-if="SONG == 'Strings'"> <!--remember to add autoplay-->
        <source src="../music/circusStrings.mp3" type="audio/mpeg">
      </audio>
      <audio controls autoplay loop v-if="SONG == 'Techno'"> <!--remember to add autoplay-->
        <source src="../music/circusTechno.mp3" type="audio/mpeg">
      </audio>
      <audio controls autoplay loop v-if="SONG == 'Ragtime'">  <!--remember to add autoplay-->
        <source src="../music/circusRagtime.mp3" type="audio/mpeg">
      </audio>
    </div>

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
      SONG:"",
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
  },
  /*

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
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)

    socket.on("musicSelection", SONG =>
      this.SONG = SONG
    ),

    socket.on("newQuestion", q =>
      this.question = q,
      //socket.on("runQuestion", {pollId: this.pollId, questionNumber: this.question.questionNumber})
    ),

    this.timerCount = this.question.t
    this.questionImg = this.question.questionImg
    this.isCorrect = this.question.isCorrect
    this.questionNumber = this.question.questionNumber

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

<style>
#audio {
  /*display:none;*/
}

</style>
