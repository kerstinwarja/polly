<template>
   <body>
      <div id="previewTitle">
        <h4> It's time to play</h4>
        <header>{{pollId}}</header>
      </div>
      <div id="wrap">
        <div class="infoBoards" id="description">
            <span id="pdes" >{{pollDesc}}</span>
        </div>
        <div id="picture">
          <img v-bind:src="pollImg">
        </div>
        <div class="infoBoards" >
          <span id="partText">Här kommer alla participants vara</span>
        </div>
      </div>
        <div id="audio">
       <audio controls loop v-if="SONG == 'Brass'"> <!--remember to add autoplay-->
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

        <router-link v-bind:to="'/poll/'+ this.pollId">
          <button id="startButton">START QUIZ</button>
        </router-link>
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
      SONG:"",
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


    //emittar join poll
    socket.emit('joinPoll',this.pollId)
    //lyssnar på frågor, kanske ta bort
    socket.on("newQuestion", q =>
      this.question = q
    )
    //lyssnar på description i socket.js i join poll
    socket.on("description", desc =>
      this.pollDesc = desc
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

}
</script>
<style scoped>

header{
  padding-top:0%;
  text-shadow: -0.01em 0 navy, 0 0.05em navy, 0.05em 0 navy, 0 -0.01em navy;
}

h4{
  margin: 3% 0% 3% 0%;
  text-shadow: -0.01em 0 #990000, 0 0.05em #990000, 0.05em 0 #990000, 0 -0.01em #990000;
}
#previewTitle{
  font-size: 30px;
  text-shadow: 3px 3px navy;
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
  border: navy 2px solid;

  font-size: 1.5em;
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
