<template>
  <button v-show="this.SONG!='' || this.showPlayButton" id="musicControl" type="submit" v-on:click="pauseplay()">
    <img v-if="paused" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Speaker_Icon.svg/1024px-Speaker_Icon.svg.png" style="height:1.5em">
    <img v-if="!paused" src="https://cdn4.iconfinder.com/data/icons/play/100/Volume_mute-512.png" style="height:1.5em">
  </button>
  <Question v-bind:question="question"
            v-bind:timesUp="timesUp"
            v-on:timesUp="setTimeUp"
            v-bind:isHost="isHost"
            v-on:answer="submitAnswer"/>
  <button v-if="timesUp && isHost" v-on:click="continueToResult" id="showRes">
    {{uiLabels.showResult}}
  </button>
  <div id="audio">
    <audio controls autoplay loop v-if="SONG == 'Brass' ">
      <source src="../music/circusBrass.mp3" type="audio/mpeg">
    </audio>
    <audio controls autoplay loop v-if="SONG == 'Trap'">
      <source src="../music/circusTrap.mp3" type="audio/mpeg">
    </audio>
    <audio controls autoplay loop v-if="SONG == 'Strings'">
      <source src="../music/circusStrings.mp3" type="audio/mpeg">
    </audio>
    <audio controls autoplay loop v-if="SONG == 'Techno'">
      <source src="../music/circusTechno.mp3" type="audio/mpeg">
    </audio>
    <audio controls autoplay loop v-if="SONG == 'Ragtime'">
      <source src="../music/circusRagtime.mp3" type="audio/mpeg">
    </audio>
  </div>

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
      uiLabels: {},
      lang:"",
      SONG:"",
      paused:false,
      showPlayButton:false,
      songBackup:"",
      isHost: false,
      timesUp: false,
      sendPoints: 0,
      myPoints: 10,
      myName : "",
      nameArray:[],
      clicked: false,
      question: {
        q: "",
        a: [],
        t:"",
        isCorrect:[],
        questionNumber: 0,
        questionImg: "",
        allQuestions: 0
      },
      pollId: "inactive poll",
    }
  },
  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      console.log(labels)
      this.uiLabels = labels
    })
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
      this.allQuestions = q.allQuestions
      }
    ),
    /*socket.on("sendToResult",() =>
       this.$router.push({ name: 'Result', params: { id: this.pollId, lang: this.lang, isHost: this.isHost, allQuestions: this.allQuestions}})
    )*/

    socket.on("sendToResult",() => {
      this.updateScoreboard(this.myPoints),
      this.$router.push({ name: 'Result', params: { id: this.pollId, lang: this.lang, isHost: this.isHost, questionNumber: this.questionNumber, nameArray: this.nameArray,myPoints: this.myPoints, myName:this.myName, allQuestions: this.allQuestions}})
    })

    socket.on("showCorrect",() =>
      this.timesUp=true,
      //this.$router.push({ name: 'Poll', params: { id: this.pollId, lang: this.lang, isHost: this.isHost, time: this.timesUp}}),
    )
  },
  methods: {
    submitAnswer: function (answer) {
      this.clicked = true,
      this.myPoints = this.answerPoints(answer);
      socket.emit("submitAnswer", {pollId: this.pollId, myPoints: this.myPoints, myName: this.myName})
    },
    updateScoreboard (myPoints) {
      if(!this.isHost || !this.clicked) {
        socket.emit("submitAnswer", {pollId: this.pollId, myPoints: myPoints, myName: this.myName})
      }
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
      socket.emit('goToResult', {pollId: this.pollId, isHost: this.isHost, questionNumber: this.questionNumber, nameArray: this.nameArray, allQuestions: this.allQuestions})
      console.log('continue woho!');
      this.isHost= true;
      this.$router.push({ name: 'Result', params: { id: this.pollId, lang: this.lang, isHost: this.isHost, questionNumber: this.questionNumber, nameArray: this.nameArray, allQuestions: this.allQuestions}})
    },
    pauseplay: function(){ //Denna använder tillåten kod men startar om musiken
      this.showPlayButton=true
      if(!this.paused){
        this.songBackup = this.SONG
        this.SONG = ""
        this.paused = true
      }
      else{
        this.SONG = this.songBackup
        this.paused = false
      }
    }
  }
}
</script>
<style scoped>
#musicControl{
  position:absolute;
  left:1%;
  top:1%;
  background-color: wheat;
}
#audio{
  display:none;
}
#showRes {
  background-color: rgb(100, 155, 36);
  color: white;
  font-size: 1em;
  text-transform: uppercase;
  height: 4em;
  width: 15%;
  min-width:8em;
  border: 0.2em navy solid;
  margin-bottom:2%;
}
</style>
