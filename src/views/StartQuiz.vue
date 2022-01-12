<template>
  <body>
    <button v-show="this.SONG!='' || this.showPlayButton" id="musicControl" type="submit" v-on:click="pauseplay()">
      <img v-if="paused" src="https://cdn4.iconfinder.com/data/icons/play/100/Volume_mute-512.png" style="height:1.5em">
      <img v-if="!paused" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Speaker_Icon.svg/1024px-Speaker_Icon.svg.png" style="height:1.5em">
    </button>
    <h4 v-if="isHost">{{uiLabels.hostIf}}</h4>
    <h4 v-else>{{uiLabels.ifParticipant}}</h4>
    <header>
      <h1>{{pollId}}</h1>
    </header>
    <div id="wrap">
      <div class="infoBoards"  id="pollDesc">
        <p>{{uiLabels.desc}}</p>
        <p> {{uiLabels.welcome}} </p>
        <p>{{pollDesc}}</p>
      </div>
      <div id="picture">
        <img v-bind:src="pollImg">
      </div>
      <div class="infoBoards" id="pollParts">
        <p>{{uiLabels.parts}}</p>
        <span v-for="name in this.nameArray" v-bind:key="name">
            <li>{{name}}</li>
          </span>
      </div>
    </div>
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
    <div v-show="isHost">
      <button v-on:click="letsGo" id="startButton">{{uiLabels.start}}</button>
    </div>
  </body>
  <footer>
    <div>
      <h5> © Quizcus inc</h5>
    </div>
  </footer>
</template>

<script>
import io from 'socket.io-client';
const socket = io();
export default {
  name: 'StartQuiz',
  data: function () {
    return {
      lang: "",
      pollId: "",
      pollDesc:"",
      pollImg:"",
      isHost: false,
      SONG:"",
      myName: "",
      myPoints:10,
      nameArray:[],
      uiLabels: {},
      questionNumber: 0,
      paused:false,
      showPlayButton:false,
      songBackup:"",
      question: {
        q: "",
        a: []
      },
    }
  },
  created: function () {
    this.lang = this.$route.params.lang;
    this.pollId = this.$route.params.id;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })

    this.isHost = this.$route.params.isHost==="true"?true:false;
    this.myName = this.$route.params.myName;


    socket.emit('joinPoll',this.pollId)

    socket.on("newQuestion", q =>
        this.question = q
    )

    socket.on("sendToPoll",() =>
        this.$router.push({ name: 'Poll', params: { id: this.pollId, lang: this.lang, isHost: this.isHost, questionNumber: this.questionNumber,myPoints:this.myPoints, myName: this.myName/*nameArray: this.nameArray*/}})
    )

    socket.on("description", desc =>
        this.pollDesc = desc
    )
    socket.emit('getNickname',{pollId:this.pollId});

    socket.on("getName",participants => {
          this.nameArray = participants
        }
    )

    socket.on("imageAddress", imag =>
        this.pollImg = imag
    )
    socket.on("musicSelection", SONG =>
        this.SONG = SONG
    )
    socket.on("createPoll", (data) =>
        this.data = data
    )
  },
  methods:{
    letsGo: function() {
      this.questionNumber=0;
      socket.emit('startQuiz', {pollId: this.pollId, isHost: this.isHost, questionNumber: this.questionNumber /*nameArray: this.nameArray*/});
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber});
      console.log('lets GO!');
      this.isHost= true;
      this.$router.push({ name: 'Poll', params: { id: this.pollId, lang: this.lang, isHost: this.isHost, questionNumber: this.questionNumber/*nameArray: this.nameArray*/}});
      socket.emit('clearNickname',{pollId:this.pollId} )
      socket.emit('clearAnswer',{pollId:this.pollId} )
    },
    pauseplay: function(){
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
    },
  }
}
</script>

<style scoped>

header {
  font-size: 3em;
  text-shadow: -0.05em 0 #2d4463, 0 0.05em #2d4463, 0.10em 0 #2d4463, 0 -0.05em #2d4463;
  padding:0%;
}

h4{
  line-break: auto;
  color: white;
  font-size: 2em;
  margin: 3% 0% 3% 0%;
  text-shadow: -0.04em 0 #990000, 0 0.04em #990000, 0.09em 0 #990000, 0 -0.04em #990000;
}
p{
  margin: 3% 0% 3% 0%;
}

li{
  text-align:left;
  margin-left:30%;
}
#musicControl{
  position:absolute;
  left:2%;
  top:2%;
  background-color: wheat;
}
#wrap {
  padding: 3% 0% 3% 0%;
  width: 100%;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  /*align-items: center;*/
}
#wrap img{
  max-height: 15em;
  max-width:100%;
  height:auto;
  width: auto;
}
#impPic{
  height: 30%;
  width: 35%;
}

.infoBoards{
  color: #2d4463;
  line-break: auto;
  height: 10em;
  width: 90%;
  background-color: wheat;
  border-radius: 2%;
  border: #2d4463 0.1em solid;
  font-size: 1.5em;
  padding:0% 0% 1% 2%;
  margin: 0% 5% 0% 5%;
  overflow:auto;
  font-weight: bold;
}

#startButton {
  background-color: rgb(100, 155, 36);
  color: white;
  font-size: 1em;
  text-transform: uppercase;
  height: 4em;
  width: 15%;
  border: 0.2em #2d4463 solid;
  margin-bottom:2%;
}

#audio {
  display:none;
}

@media only screen and (max-width: 980px) {
  /* For mobile phones: */
#wrap{
    grid-template-columns: 100%;
    grid-template-areas:
      'pic'
      'des'
      'par';
    align-items:center;
  }
#pollDesc{
  grid-area: des;
}
#pollParts{
  grid-area:par;
}
#picture{
  grid-area:pic;
}
.infoBoards{
  width: 60%;
  margin:5% 20% 0% 20%;
  text-align: left;
  padding-left:2%;
}
li{
  margin:0%;
}

}
@media only screen and (max-width: 500px) {
  .infoBoards{
    width: 90%;
  margin:3% 5% 0% 5%;
    min-height:5em;
  }
  #startButton {
    width: 30%;
  }
}
</style>
