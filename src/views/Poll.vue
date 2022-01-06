<template>
  <!--{{pollId}}-->
  <Question v-bind:question="question"
            v-bind:timesUp="timesUp"
            v-on:timesUp="setTimeUp"
            v-bind:isHost="isHost"
            v-on:answer="submitAnswer"/>

  <!--div> FORSTÄTTER NÄR RESULT FINNS
    <router-link v-bind:to="'/poll/'+ this.pollId">
      <button v-on:click="nextQues" id="forwardButton"> NEXT QUESTION</button>
    </router-link>
  </div-->
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

  <div v-show="isHost">
    <button v-if="timesUp" v-on:click="continueToResult" class="continueButton">
      Continue
    </button>
  </div>


  <!--{{timerCount}}
  {{this.question.t}} -->

  <!-- <button v-on:click="nextQue()">
    Next
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
      isHost: false,
      timesUp: false,
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
    this.isHost = this.$route.params.isHost==="true"?true:false;
    this.questionNumber = this.$route.params.questionNumber
    socket.emit('joinPoll', this.pollId)
    socket.on()
    socket.on("musicSelection", SONG =>
        this.SONG = SONG
    ),
    socket.on("newQuestion", q => {
      this.question = q
      this.timesUp=false
      this.timerCount = q.t
      this.questionImg = q.questionImg
      this.isCorrect = q.isCorrect
      this.questionNumber = q.questionNumber
      }
    ),

    //socket.on("runQuestion", {pollId: this.pollId, questionNumber: this.question.questionNumber})

    /*socket.on("showCorrect",() =>
      //this.$router.push({ name: 'Poll', params: { id: this.pollId, lang: this.lang, isHost: this.isHost}}),
      console.log('-----------socket.on(showCorrect)------------')
    ),*/

    socket.on("sendToResult",() =>
      this.$router.push({ name: 'Result', params: { id: this.pollId, lang: this.lang, isHost: this.isHost, questionNumber: this.questionNumber}})
    )

    socket.on("showCorrect",() =>
      this.timesUp=true,
      console.log(this.timesUp),
      //this.$router.push({ name: 'Poll', params: { id: this.pollId, lang: this.lang, isHost: this.isHost, time: this.timesUp}}),
      console.log('-----------socket.on(showCorrect)------------')
    )

  },
  methods: {
    submitAnswer: function (answer) {
      socket.emit("submitAnswer", {pollId: this.pollId, answer: answer})
    },
    nextQues() {
      console.log("next pressed")
      this.questionNumber++
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
      window.location.reload()
      //this.timerCount = this.question.t
      //this.nextactivated = true
    },
    setTimeUp: function () {
      this.timesUp=false
      socket.emit('showCorrectAnswer', {pollId: this.pollId})
    },
    continueToResult: function() {
      socket.emit('goToResult', {pollId: this.pollId, isHost: this.isHost, questionNumber: this.questionNumber})
      console.log('continue woho!');
      this.isHost= true;
      this.$router.push({ name: 'Result', params: { id: this.pollId, lang: this.lang, isHost: this.isHost, questionNumber: this.questionNumber}})
    }
  }
}
</script>

<style>
/*----------------------------Ta bort?--------------
#audio {
  display:none;
}
#startButton {
  height: 5em;
  width: 15%;
  background-color: rgb(100, 155, 36);
  margin-bottom:5%;
}
#forwardButton{
  height: 5%;
  width: 8%;
  margin-right: 4%;
  margin-top: 10%;
  float: right;
}
#backButton{
  height: 5%;
  width: 8%;
  margin-left: 4%;
  margin-top: 10%;
  float: left;
}*/

</style>
