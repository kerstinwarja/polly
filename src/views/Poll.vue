<template>
  <h1> Still my name : {{this.myName}}
    and my points {{this.myPoints}} </h1>
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
      sendPoints: 0,
      myPoints: 10,
      myName : "",
      nameArray:[],
      question: {
        q: "",
        a: [],
        t:"",
        isCorrect:[],
        questionNumber: 0,
        questionImg: "",
      },
      pollId: "inactive poll",
    }
  },
  created: function () {
    this.pollId = this.$route.params.id;
    this.myName = this.$route.params.myName;
    this.myPoints = this.$route.params.myPoints;
    this.isHost = this.$route.params.isHost==="true"?true:false;
    this.questionNumber = this.$route.params.questionNumber
    this.nameArray = this.$route.params.nameArray
    console.log("Ny start på quizzet nmr ",this.$route.params.questionNumber, this.questionNumber)
    socket.emit('joinPoll', this.pollId)
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
    socket.on("sendToResult",() =>
       this.$router.push({ name: 'Result', params: { id: this.pollId, lang: this.lang, isHost: this.isHost}})
    )

    //socket.on("runQuestion", {pollId: this.pollId, questionNumber: this.question.questionNumber})

    /*socket.on("showCorrect",() =>
      //this.$router.push({ name: 'Poll', params: { id: this.pollId, lang: this.lang, isHost: this.isHost}}),
      console.log('-----------socket.on(showCorrect)------------')
    ),*/

    socket.on("sendToResult",() =>
      this.$router.push({ name: 'Result', params: { id: this.pollId, lang: this.lang, isHost: this.isHost, questionNumber: this.questionNumber, nameArray: this.nameArray,myPoints: this.myPoints, myName:this.myName}})
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
      this.sendPoints = this.answerPoints(answer);
      socket.emit("submitAnswer", {pollId: this.pollId, myPoints: this.sendPoints, myName: this.myName})
    },
    answerPoints (answer){
     var  ansIndex = this.question.a.indexOf(answer);
     var corr = this.isCorrect[ansIndex];
     if (corr){
       this.myPoints = parseInt(this.myPoints)+ 20;
     }
     console.log(this.myPoints)
     return this.myPoints;
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
      socket.emit('goToResult', {pollId: this.pollId, isHost: this.isHost, questionNumber: this.questionNumber, nameArray: this.nameArray})
      console.log('continue woho!');
      this.isHost= true;
      this.$router.push({ name: 'Result', params: { id: this.pollId, lang: this.lang, isHost: this.isHost, questionNumber: this.questionNumber, nameArray: this.nameArray}})
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
