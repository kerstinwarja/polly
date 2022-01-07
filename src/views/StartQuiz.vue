<template>
  <body>
    <h4 v-if="isHost">{{uiLabels.hostIf}}</h4>
    <h4 v-else>{{uiLabels.play}}</h4>
    <header>
      <h1>{{pollId}}</h1>
    </header>
    <div id="wrap">
      <div class="infoBoards"  id="pollDesc">
        {{uiLabels.desc}}<br>
        <span class="infoBoardsInner"> {{uiLabels.welcome}} </span><br>
        <span class="infoBoardsInner">{{pollDesc}}</span>  
      </div>
      <div id="picture">
        <img v-bind:src="pollImg">
      </div>
      <div class="infoBoards" id="pollParts">
        {{uiLabels.parts}}
        <span class="infoBoardsInner" v-for="name in this.nameArray" v-bind:key="name">
            <li>{{name}}</li>
          </span>
      </div>
     
    </div>
    <div id="audio">
      <audio controls  loop v-if="SONG == 'Brass' "> <!--remember to add autoplay-->
        <source src="../music/circusBrass.mp3" type="audio/mpeg">
      </audio>
      <audio controls loop v-if="SONG == 'Trap'"> <!--remember to add autoplay-->
        <source src="../music/circusTrap.mp3" type="audio/mpeg">
      </audio>
      <audio controls loop v-if="SONG == 'Strings'"> <!--remember to add autoplay-->
        <source src="../music/circusStrings.mp3" type="audio/mpeg">
      </audio>
      <audio controls loop v-if="SONG == 'Techno'"> <!--remember to add autoplay-->
        <source src="../music/circusTechno.mp3" type="audio/mpeg">
      </audio>
      <audio controls loop v-if="SONG == 'Ragtime'">  <!--remember to add autoplay-->
        <source src="../music/circusRagtime.mp3" type="audio/mpeg">
      </audio>
    </div>
    <div v-show="isHost">
      <button v-on:click="letsGo" id="startButton">{{uiLabels.start}}</button>
    </div>
  </body>
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
      //pollName:""
      pollDesc:"",
      pollImg:"",
      isHost: false,
      SONG:"",
      myName: "undefined",
      nameArray:[],
      //data: {},
      uiLabels: {},
      //pollDes: [],
      //question: "",
      //answers: ["", ""],
      questionNumber: 0,
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
    //emittar join poll

    socket.emit('joinPoll',this.pollId)
    //lyssnar på frågor, kanske ta bort
    socket.on("newQuestion", q =>
        this.question = q
    )

    socket.on("sendToPoll",() =>
        this.$router.push({ name: 'Poll', params: { id: this.pollId, lang: this.lang, isHost: this.isHost, questionNumber: this.questionNumber, nameArray: this.nameArray}})
    )

    //lyssnar på description i socket.js i join poll
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
      socket.emit('startQuiz', {pollId: this.pollId, isHost: this.isHost, questionNumber: this.questionNumber, nameArray: this.nameArray});
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber});
      console.log('lets GO!');
      this.isHost= true;
      this.$router.push({ name: 'Poll', params: { id: this.pollId, lang: this.lang, isHost: this.isHost, questionNumber: this.questionNumber, nameArray: this.nameArray}});
    }
  }
}
</script>

<style scoped>

header {
  font-size: 3em;
  text-shadow: -0.05em 0 navy, 0 0.15em navy, 0.15em 0 navy, 0 -0.03em navy;
  padding:0%;
}

h4{
  line-break: auto;
  color: white;
  font-size: 2em;
  margin: 3% 0% 3% 0%;
  text-shadow: -0.02em 0 #990000, 0 0.1em #990000, 0.1em 0 #990000, 0 -0.02em #990000;
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
  color: navy;
  font-family: "Times New Roman";
  line-break: auto;
  height: 80%;
  width: 90%;
  background-color: wheat;
  border-radius: 2%;
  border: navy 0.1em solid;
  font-size: 1.5em;
  padding:0% 0% 1% 2%;
  margin: 0% 5% 0% 5%;
  overflow:auto;
  min-height: 10em;

}

.infoBoardsInner{
  text-align:left;
  font-weight: bold;
  position: relative;
  top: 10%;
}

/*li{
  margin-left:33%
}*/

#startButton {
  height: 5em;
  width: 15%;
  background-color: rgb(100, 155, 36);
  margin-bottom:5%;
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
  margin:5% 20% 5% 20%;
  text-align: left;
  padding-left:2%;
}

}
@media only screen and (max-width: 500px) {
  .infoBoards{
    width: 90%;
    margin:5%;
    min-height:5em;
  }
}
</style>
