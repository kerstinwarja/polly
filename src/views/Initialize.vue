<template>
  <body>
    <header>
      <h1>It's time to create your quiz!</h1>
      {{ timerCount }}
    </header>
    <div class="wrap2">
      <div id="preview">
        <h4> It's time to play</h4>
        <div id="previewTitle">
          <p id="as">Preview</p>
        </div>
        <div class="wrap4">
          <div class="infoBoards" id="previewDesc">
            <span id="pdes">Preview desc</span>
          </div>
          <div id="previewPic">
          </div>
          <div class="infoBoards" id="previewPartis">
            <span>This is where your participants will be listed </span>
          </div>
        </div>
        <div id="audio">
       <audio controls v-if="SONG == 'Brass'">
          <source src="../music/circusBrass.mp3" type="audio/mpeg">
        </audio>
        <audio controls v-if="SONG == 'Trap'">
          <source src="../music/circusTrap.mp3" type="audio/mpeg">
        </audio>
        <audio controls v-if="SONG == 'Strings'">
          <source src="../music/circusStrings.mp3" type="audio/mpeg">
        </audio>
        <audio controls v-if="SONG == 'Techno'">
          <source src="../music/circusTechno.mp3" type="audio/mpeg">
        </audio>
        <audio controls v-if="SONG == 'Ragtime'">
          <source src="../music/circusRagtime.mp3" type="audio/mpeg">
        </audio>
      </div>
      <div id="audio">
         </div>
      </div>
      <div class="createWindow">
        <h3> Quiz name: </h3>
        <textarea id="quizTitle" type="text" v-model="pollId" placeholder="Pick a name for your quiz..."></textarea>
        <h3>Quiz description:</h3>
        <textarea id="desIptBox" type="text" v-model="pollDesc" placeholder="Add a short description of your quiz..."></textarea>
        <div class="wrap3">
          <button type="submit" v-on:click="PicChoose()">
            <img src="https://static.thenounproject.com/png/17840-200.png" style = "height:1.5em;">
            <span>Import picture</span>
          </button>
          <select type="submit" v-model="music" id="music">
            <!--gör selected hidden nått mer än att ta bort "selected music"?-->
            <option disabled value="" selected hidden> select music </option>
                   <option>Brass</option>
                   <option>Ragtime</option>
                   <option>Strings</option>
                   <option>Techno</option>
                   <option>Trap</option>
            <img src="http://assets.stickpng.com/thumbs/5a02cab818e87004f1ca43d9.png" style = "height:1.5em;">
            <span>Import music</span>
          </select>


          <!-- timerKOD ska flyttas-->
          <select type="submit" v-model="time" id="time">
            <option disabled value=""> select time </option>
                   <option>15</option>
                   <option>30</option>
                   <option>45</option>
          </select>
        </div>

        <button type="submit" id="updatePre" v-on:click="updatePreview()">
          Update preview
        </button>
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
      //timerKOD ska flyttas v
      timerCount: 30,
      timerEnabled: true,
      question: "",
      answers: ["", ""],
      questionNumber: 0
    }
  },
  watch: {

            timerCount: {
                handler(value) {

                    if (value > 0 && this.timerEnabled) {
                        setTimeout(() => {
                            this.timerCount--;
                        }, 1000);
                    }
                    else{
                      this.timerCount = "SLUT"
                    }

                },
            }

        },
        //timerKOD ska flyttas ^
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
      //Skickar pollDesc till servern.
      console.log("in createPoll "+this.pollImg)
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang, pollDesc: this.pollDesc, pollImg: this.pollImg, SONG: this.SONG })
      this.$router.push({ name: 'Create', params: { id: this.pollId, lang: this.lang} })

    },


    PicChoose(){
      let pict = prompt("Please enter a pictureadress:", "https://m.media-amazon.com/images/I/714csIk-dRL._AC_SL1500_.jpg");
    if (pict != null || pict != "") {
        document.getElementById("previewPic").style.backgroundImage = "url(" + pict+")";
        document.getElementById("previewPic").style.visibility= "hidden";
    }
    this.pollImg = pict;
    console.log(this.pollImg)
  },
  MusicChoose(){
     this.SONG = this.music;
     console.log("this.song "+this.SONG)

},
    updatePreview(){
      //THis is the code for updating title and description
      var c1 = document.getElementById('quizTitle').value;
      var d1 = document.getElementById('as');
      this.pollId = c1;

      d1.innerHTML = c1;
      var c2 = document.getElementById('desIptBox').value;
      var d2 = document.getElementById('pdes');
      this.pollDesc = c2;
      d2.innerHTML = c2;
      document.getElementById("previewPic").style.visibility= "visible";
      this.MusicChoose();
      //timerKOD ska flyttas
      this.timerCount = this.time;
      this.timerEnabled = true;
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
  background-color: wheat;
  color: Navy;
  resize:none;
  padding: 5px 5px 5px;
  font-family: sans-serif;
  border: 2px solid;
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

#preview{
  background-image: url(https://png.pngtree.com/thumb_back/fw800/background/20200916/pngtree-circus-background-image_398762.jpg);
  background-size: cover;
  max-height: 100%;
  background-position: bottom;
  color: Grey;
  height: 80%;
  border: 5px black solid;
}
#previewTitle{
  font-size: 30px;
  text-shadow: -1px 0 navy, 0 3px navy, 3px 0 navy, 0 -1px navy;
  color: white;

  line-break: auto;
  max-height: 15%;
}
#as{
  margin: 10px 0px 0px;
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

#previewDesc {
  margin: 10%;
}

#previewPic{
  background-size: contain;
  /*float: left;*/
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
}

#desIptBox{
  height: 20em;
}
::placeholder{
  color:Navy;
}
#updatePre{
  width: 84%;
  background-color: rgb(135, 175, 111);
  margin-bottom: 4%;
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
   align-items: top;
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
</style>
