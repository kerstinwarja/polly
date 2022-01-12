<template>
  <body>
    <header>
      <h1>{{uiLabels.initializeHead}}</h1>
    </header>
    <div class="mainWrap">
      <div id="preview">
        <h4> {{uiLabels.play}}</h4>
        <div id="previewTitle">
          <p> {{pollId}} </p>
        </div>
        <div class="prevWrap">
          <div class="infoBoards" id="previewDesc">
            <p>{{uiLabels.desc}}</p>
            <p>{{uiLabels.welcome}}</p>
            <p>{{pollDesc}}</p>
          </div>
          <div id="previewPic">
            <img v-if="pollImg" v-bind:src="pollImg">
          </div>
          <div class="infoBoards" id="previewPart">
            <p>{{uiLabels.parts}}</p>
            <p>{{uiLabels.participants}}</p>
          </div>
        </div>
        <div>
          <audio controls v-if="music == 'Brass'">
            <source src="../music/circusBrass.mp3" type="audio/mpeg">
          </audio>
          <audio controls v-if="music == 'Trap'">
            <source src="../music/circusTrap.mp3" type="audio/mpeg">
          </audio>
          <audio controls v-if="music == 'Strings'">
            <source src="../music/circusStrings.mp3" type="audio/mpeg">
          </audio>
          <audio controls v-if="music == 'Techno'">
            <source src="../music/circusTechno.mp3" type="audio/mpeg">
          </audio>
          <audio controls v-if="music == 'Ragtime'">
            <source src="../music/circusRagtime.mp3" type="audio/mpeg">
          </audio>
        </div>
      </div>
      <div class="createWrap">
        <h3>{{uiLabels.quizName}}</h3>
        <textarea type="text" v-model="pollId" v-bind:placeholder="uiLabels.namePick"></textarea>
        <h3>{{uiLabels.quizDesc}}</h3>
        <textarea id="desIptBox" type="text" v-model="pollDesc" v-bind:placeholder="uiLabels.descPick"></textarea>
          <h3>{{uiLabels.quizPic}}</h3>
          <button class="importItems" type="submit" v-on:click="PicChoose()">
            <img src="https://static.thenounproject.com/png/17840-200.png" style = "height:1.5em;">
            <span>{{uiLabels.impPic}}</span>
          </button>
          <h3>{{uiLabels.quizMusic}}</h3>
          <select class="importItems" v-model="music">
                   <option>Brass</option>
                   <option>Ragtime</option>
                   <option>Strings</option>
                   <option>Techno</option>
                   <option>Trap</option>
          </select>
      </div>
    </div>
    <div id="navButtons">
    <router-link v-bind:to="'/'">
      <button style ="background-color: #4f5559">{{uiLabels.goBack}}</button>
    </router-link>
      <button style="float:right; background-color: #236627" v-on:click="createPoll">
        {{uiLabels.add}}{{uiLabels.questions}}
      </button>
    </div>
  </body>
</template>

<script>
import io from 'socket.io-client';
const socket = io();
export default {
  name: 'Initialize',
  data: function () {
    return {
      lang: "",
      pollId: "",
      pollDesc:"",
      pollImg:"",
      data: {},
      uiLabels: {},
      SONG:"",
      music:"",
      question: "",
      answers: ["", ""],
      questionNumber: 0,
      polls:[]
    }
  },
  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.emit("getPolls");
    socket.on("polls", (polls) => {
      this.polls=polls;
    });
    socket.on("dataUpdate", (data) =>
        this.data = data
    )
    socket.on("pollCreated", (data) =>
        this.data = data)
  },
  methods: {
    createPoll: function () {
      if(this.pollId!=""){
        this.timerCount = this.time;
        this.SONG = this.music;
        if(this.polls.indexOf(this.pollId)==-1){
          socket.emit("createPoll", {pollId: this.pollId, lang: this.lang, pollDesc: this.pollDesc, pollImg: this.pollImg, SONG: this.SONG })
          this.$router.push({ name: 'Create', params: { id: this.pollId, lang: this.lang} })
        }
        else alert(this.uiLabels.alertPickNewQuizName) 
      }
      else alert(this.uiLabels.alertQuizName)
    },
    PicChoose(){
      let pict = prompt(this.uiLabels.enterPic, "https://m.media-amazon.com/images/I/714csIk-dRL._AC_SL1500_.jpg");
      this.pollImg = pict;
      console.log(this.pollImg)
    },
  }
}
</script>

<style scoped>
header {
  padding-top:0%;
  font-size: 1.7em;
  text-shadow: -0.05em 0 #990000, 0 0.15em #990000, 0.15em 0 #990000, 0 -0.03em #990000;
}
h3{
  margin:0px;
  padding: 2% 10% 1%;
  text-align: left;
  color: Navy;
}
h4 {
  margin: 3% 0% 3% 0%;
  text-align: center;
  color: white;
  text-shadow: -0.05em 0 #990000, 0 0.1em #990000, 0.1em 0 #990000, 0 -0.03em #990000;
  font-size: 1em;
}
p{
  margin:3%;
  font-weight: bold;
}

.mainWrap {
  margin: 0px;
  padding: 0% 4% 0% 4%;
  width: 92%;
  height: 100%;
  display: grid;
  grid-gap: 5%;
  grid-template-columns: 61% 31%;
  align-items: top;
}

.importItems{
  background-color: #fbf1e0;
  text-transform: uppercase;
  padding-bottom: 1%;
  font-size:80%;
  width: 80%;
  border: 0.2em black solid;
}

.prevWrap{
  margin: 0px;
  padding: 3% 0% 3% 0%;
  grid-gap: 1%;
  width: 100%;
  height: 40%;
  display: grid;
  grid-template-columns: 32% 33% 32%;
  align-items: center;
}

#previewPic img{
  max-height: 9em;
  max-width:100%;
  height:auto;
  width: auto;
}

#preview{
  background-image: url(https://png.pngtree.com/thumb_back/fw800/background/20200916/pngtree-circus-background-image_398762.jpg);
  background-size: cover;
  max-height: 100%;
  background-position: bottom;
  height: 25em;
  border: 0.2em #0b074d solid;
}
#previewTitle{
  font-size: 2em;
  text-shadow: -0.03em 0 navy, 0 0.07em navy, 0.07em 0 navy, 0 -0.03em navy;
  color: white;
  margin: 5%;
  line-break: auto;
  max-height: 15%;
}
.infoBoards{
  color: navy;
  line-break: auto;
  height: 100%;
  width: 90%;
  background-color: wheat;
  border-radius: 2%;
  border: navy 0.1em solid;
  font-size: 1em;
  overflow:auto;
  margin:0% 5% 0% 5%;
}
/*.infoBoards span{
  font-weight: bold;
  position: relative;
  top: 10%;
}*/

.createWrap{
  background-color: wheat;
  width: 100%;
  height:100%;
  border: 0.2em navy solid;
}
body textarea{
  width: 80%;
  background-color: #f0e7d1;
  color: Navy;
  resize:none;
  padding: 0.4em 0.4em 0.4em;
  font-family: sans-serif;
  border: 0.1em solid;
}
select:hover{
  cursor: pointer;
  box-shadow: 0px 5px 10px #646467;
  transform: translateY(-5px);
}

#desIptBox{
  height: 10em;
}

#navButtons button{
  height: 3em;
  width: 6.6em;
  margin: 2% 4% 2% 4%;
  float: left;
  text-transform: uppercase;
  color: wheat;
  text-align: center;
  font-size: 1em;
}

@media only screen and (max-width: 980px) {
  .mainWrap{
    grid-template-columns: 100%;
    grid-template-areas:
      'create'
      'preview';
  }
  header{
    font-size: 1em;
    padding:5%;
  }
  .createWrap{
    grid-area:create;
    height: 33em;
  }
  #preview{
    grid-area:preview;
    height: 65em;
  }
  #desIptBox{
    height: 10em;
  }
  #previewTitle{
    font-size: 3em;
  }
  .prevWrap{
    padding:0%;
    grid-template-columns: 100%;
    grid-template-areas:
      'pic'
      'des'
      'par';
    grid-gap:5%;
  }
  #previewPic{
    grid-area:pic;
  }
  #previewPic img{
    max-height: 15em;
  }
  #previewDesc{
    grid-area:des;
  }
  #previewPart{
    grid-area:par;
  }

  #navButtons{
    margin-top: 12%;
  }
  .infoBoards{
    font-size: 1.5em;
    height:90%;
    min-height: 6em;
    width: 60%;
    margin:5% 20% 5% 20%;
    text-align: left;
  }
}

@media only screen and (max-width: 700px) {
  #preview{
    height: 55em;
  }
  .createWrap{
    height: 28em;
  }
}
@media only screen and (max-width: 500px) {
  #preview{
    height: 55em;
  }
  .infoBoards{
    width: 90%;
    margin:5%;
  }
  #previewTitle{
    margin:10%;
  }
  #navButtons{
    margin-top: 20%;
  }
}




</style>
