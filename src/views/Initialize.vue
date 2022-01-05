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
            <span>{{pollDesc}}</span>
          </div>
          <div id="previewPic">
            <img v-if="pollImg" v-bind:src="pollImg">
          </div>
          <div class="infoBoards">
            <span>{{uiLabels.participants}}</span>
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
      <img src="https://www.pngkey.com/png/full/87-875502_back-button-arrow-sign.png" id="backButton" >
    </router-link>
      <img src="https://www.pngkey.com/png/full/87-875502_back-button-arrow-sign.png" id="forwardButton" v-on:click="createPoll">
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
      questionNumber: 0
    }
  },
  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("dataUpdate", (data) =>
        this.data = data
    )
    socket.on("pollCreated", (data) =>
        this.data = data)
  },
  methods: {
    createPoll: function () {
      this.timerCount = this.time;
      this.SONG = this.music;
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang, pollDesc: this.pollDesc, pollImg: this.pollImg, SONG: this.SONG })
      this.$router.push({ name: 'Create', params: { id: this.pollId, lang: this.lang} })
    },
    PicChoose(){
      let pict = prompt("Please enter a pictureadress:", "https://m.media-amazon.com/images/I/714csIk-dRL._AC_SL1500_.jpg");
      this.pollImg = pict;
      console.log(this.pollImg)
    },
  }
}
</script>

<style scoped>
header {
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
  font-size: 2em;
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
  background-color: wheat;
  text-transform: uppercase;
  padding-bottom: 1%;
  font-size:80%;
  width: 80%;
  border: 0.2em black solid;
}

.prevWrap{
  margin: 0px;
  padding: 5% 0% 5% 0%;
  grid-gap: 1%;
  width: 100%;
  height: 40%;
  display: grid;
  grid-template-columns: 33% 33% 32%;
  align-items: center;
}
#previewPic img{
  width: 100%;
  object-fit: contain;
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
  font-size: 30px;
  text-shadow: -0.03em 0 navy, 0 0.07em navy, 0.07em 0 navy, 0 -0.03em navy;
  color: white;
  height: 10%;
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
  font-size: 1em;
}
#previewDesc {
  margin: 10%;
}

.createWrap{
  background-color: wheat;
  width: 100%;
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

#desIptBox{
  height: 10em;
}

#backButton{
  height: 3em;
  margin: 2% 4% 2% 4%;
  float: left;
      z-index:-1;
}
#forwardButton{
  height: 3em;
  margin: 2% 4% 2% 4%;
  float: right;
  transform: scaleX(-1);
}
#forwardButton:hover {
  cursor: pointer;
}

@media only screen and (max-width: 700px) {
  /* For mobile phones: */
  .mainWrap{
    grid-template-columns: 100%;
    grid-template-areas:
      'create'
      'preview'
      'navButton'
  }
  header{
    font-size: 1em;
    padding:5%;
  }
  .createWrap{
    grid-area:create;
    height: 28em;
  }
  #preview{
    grid-area:preview;
    height: 18em;
  }
  #desIptBox{
    height: 10em;
  }
  #navButtons{
    margin-top: 12%;
    grid-area: navButton;
  }
}
</style>
