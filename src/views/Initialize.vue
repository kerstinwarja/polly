<template>
  <body>
    <header>
      <h1>It's time to create your quiz!</h1>
    </header>
    <div class="wrap2">
      <div id="preview">
        <h4> It's time to play</h4>
        <div id="previewTitle">
          <p> {{pollId}} </p>
        </div>
        <div class="wrap4">
          <div class="infoBoards" id="previewDesc">
            <span id="pdes">{{pollDesc}}</span>
          </div>
          <div id="previewPic">
            <img v-if="pollImg" v-bind:src="pollImg" id="prePic">
          </div>
          <div class="infoBoards" id="previewPartis">
            <span>This is where your participants will be listed </span>
          </div>
        </div>
        <div id="audio">
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
        {{music}}
      </div>
      <div id="audio">
         </div>
      </div>
      <div class="createWindow">
        <h3> Quiz name: </h3>
        <textarea id="quizTitle" type="text" v-model="pollId" placeholder="Pick a name for your quiz..."></textarea>
        <h3>Quiz description:</h3>
        <textarea id="desIptBox" type="text" v-model="pollDesc" placeholder="Add a description of your quiz..."></textarea>
        <div class="wrap3">
          <button type="submit" v-on:click="PicChoose()">
            <img src="https://static.thenounproject.com/png/17840-200.png" style = "height:1.5em; background-color: #CF903A;">
            <span>Import picture</span>
          </button>
          <select v-model="music" id="music">
            <!--gör selected hidden nått mer än att ta bort "selected music"?-->
           <!-- <option disabled value="" selected hidden> select music </option> -->
                   <option>Brass</option>
                   <option>Ragtime</option>
                   <option>Strings</option>
                   <option>Techno</option>
                   <option>Trap</option>
          </select>
        </div>
      </div>
    </div>


    <!--<router-link v-bind:to="'/create/'+lang">
        <button v-on:click="createPoll">{{uiLabels.createPoll}}</button>
    </router-link>
        <router-link v-bind:to="'/'">
      <img src="https://www.pngkey.com/png/full/87-875502_back-button-arrow-sign.png" id="backButton" >
    </router-link>
    <router-link v-bind:to="'/create/'+lang">
      <img src="https://www.pngkey.com/png/full/87-875502_back-button-arrow-sign.png" id="forwardButton" >
    </router-link>-->
    <!--router-link v-bind:to="'/create/'+lang">
      <button v-on:click="createPoll">{{uiLabels.createPoll}}</button>
    </router-link-->
      <router-link v-bind:to="'/'">
        <img src="https://www.pngkey.com/png/full/87-875502_back-button-arrow-sign.png" id="backButton" >
      </router-link>
      <img src="https://www.pngkey.com/png/full/87-875502_back-button-arrow-sign.png" id="forwardButton" v-on:click="createPoll">
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
      //pollName:""
      pollDesc:"", // vi använder bara pollDesc inte pollDes :)
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
      //Skickar pollDesc till servern
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang, pollDesc: this.pollDesc, pollImg: this.pollImg, SONG: this.SONG })
      this.$router.push({ name: 'Create', params: { id: this.pollId, lang: this.lang} })

    },

    PicChoose(){
      let pict = prompt("Please enter a pictureadress:", "https://m.media-amazon.com/images/I/714csIk-dRL._AC_SL1500_.jpg");
      this.pollImg = pict;
       console.log(this.pollImg)
  },

  }}
</script>

<style scoped>
header {
  font-size: 20pt;
  text-shadow: -1px 0 #990000, 0 4px #990000, 4px 0 #990000, 0 -1px #990000;
}
.createWindow{
  background-color: wheat;
  width: 100%;
  border: 3px navy solid;
}
body textarea{
  width: 80%;
  background-color: #fbf1e0;
  color: Navy;
  resize:none;
  padding: 5px 5px 5px;
  font-family: sans-serif;
  border: 2px solid;
}

header h1 {
  margin: 0%;
  padding: 0% 0% 3% 0%;
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
  text-shadow: -1px 0 #990000, 0 3px #990000, 3px 0 #990000, 0 -1px #990000;
  font-size: 18pt;
}
#backButton{
  height: 5%;
  width: 8%;
  margin-left: 4%;
  margin-top: 2%;
  float: left;
}

#forwardButton{
  height: 5%;
  width: 8%;
  margin-right: 4%;
  margin-top: 2%;
  float: right;
  transform: scaleX(-1);
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
  color: Grey;
  height: 100%;
  border: 5px #0b074d solid;
}
#previewTitle{
  font-size: 30px;
  text-shadow: -1px 0 navy, 0 3px navy, 3px 0 navy, 0 -1px navy;
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
  font-size: 1em;
}
#previewDesc {
  margin: 10%;
}

#desIptBox{
  height: 20em;
}
::placeholder{
  color:Navy;
}

#backButton{
  height: 5%;
  width: 8%;
  margin-left: 4%;
  margin-top: 2%;
  float: left;
}
#forwardButton{
  height: 5%;
  width: 8%;
  margin-right: 4%;
  margin-top: 2%;
  float: right;
  transform: scaleX(-1);
}

#forwardButton:hover {
  cursor: pointer;
}

.wrap2 {
   margin: 0px;
   padding-left: 4%;
   width: 95%;
   height: 95%;
   display: grid;
   grid-gap: 5%;
   grid-template-columns: 61% 31%;
   align-items: center;

  }

  .wrap2 button{
    background-color: wheat;
    text-transform: uppercase;
    padding-bottom: 1%;
    font-size:80%;
  }

.wrap3 {
   margin: 0px;
   padding: 5% 0% 5% 8%;
   grid-gap: 4%;
   width: 80%;
   display: grid;
   grid-template-columns: 50% 50%;
   align-items: center;
  }

.wrap3 button {
  background-color: #CF903A;
}
  .wrap4{
    margin: 0px;
    padding: 5% 0% 5% 0%;
    grid-gap: 1%;
    width: 100%;
    height: 40%;
    display: grid;
    grid-template-columns: 33% 33% 32%;
    align-items: center;
  }

  #music {
    background-color: #fbf1e0;
    border: 2px navy solid;
  }
</style>
