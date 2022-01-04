<template>
  <body>
    <div id="previewTitle">
      <h4 v-if="isHost">You are the host of</h4>
      <h4 v-else>It's time to play</h4>
      <header>{{pollId}}</header>
    </div>
    <div id="wrap">
      <div class="infoBoards" id="description">
        <span id="pdes" >{{pollDesc}}</span>
      </div>
      <div id="picture">
        <img v-bind:src="pollImg">
      </div>
      <div class="infoBoards">
        Participants:
        <span id="partText" v-for="name in this.nameArray" v-bind:key="name">
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
      <!--router-link v-bind:to="'/poll/'+ this.pollId"-->
        <button v-on:click="letsGo" id="startButton">START QUIZ</button>
      <!--/router-link-->
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
      //uiLabels: {},
      //pollDes: [],
      //question: "",
      //answers: ["", ""],
      //questionNumber: 0,
       question: {
        q: "",
        a: []
      },
    }
  },
  created: function () {
    this.pollId = this.$route.params.id;
    this.isHost = this.$route.params.isHost==="true"?true:false;
    this.myName = this.$route.params.myName;
    socket.on()
    //emittar join poll
    socket.emit('joinPoll',this.pollId)
    //lyssnar på frågor, kanske ta bort
    socket.on("newQuestion", q =>
      this.question = q
    )

    socket.on("sendToPoll",() =>
      this.$router.push({ name: 'Poll', params: { id: this.pollId, lang: this.lang, isHost: this.isHost}})
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
      socket.emit('startQuiz', {pollId: this.pollId, isHost: this.isHost})
        console.log('lets GO!');
      this.isHost= true;
      socket.emit();
      this.$router.push({ name: 'Poll', params: { id: this.pollId, lang: this.lang, isHost: this.isHost}})
    }
  }
}
</script>

<style scoped>

header{
  padding-top:0%;
  text-shadow: -0.01em 0 navy, 0 0.05em navy, 0.05em 0 navy, 0 -0.01em navy;
}

#impPic{
  height: 30%;
  width: 35%;
}

h4{
  margin: 3% 0% 3% 0%;
  text-shadow: -0.02em 0 #990000, 0 0.1em #990000, 0.1em 0 #990000, 0 -0.02em #990000;
}

#previewTitle{
  font-size: 2em;
  text-shadow: -0.1em 0 navy, 0 0.15em navy, 0.15em 0 navy, 0 -0.1em navy;
  color: white;
  height: 15%;
  line-break: auto;
  max-height: 15%;
}

.infoBoards{
  color: navy;
  font-family: "Times New Roman";
  line-break: auto;
  height: 100%;
  width: 90%;
  background-color: wheat;
  border-radius: 2%;
  border: navy 0.1em solid;
  font-size: 1.5em;
  padding-bottom: 1%;
}

#partText{
  text-align:left;
  font-weight: bold;
}

li{
  margin-left:33%
}

span {
  position: relative;
  top: 10%;
}

#wrap img{
  max-height: 15em;
  max-width:100%;
  height:auto;
  width: auto;
}

#startButton {
  height: 5em;
  width: 15%;
  background-color: rgb(100, 155, 36);
  margin-bottom:5%;
}

#wrap {
  margin: 0px;
  padding: 3% 0% 3% 0%;
  /*grid-gap: 1%;*/
  width: 100%;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  align-items: center;
}

#audio {
  display:none;
}

#description {
  margin: 10%;
}

</style>
