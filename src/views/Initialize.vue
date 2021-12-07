<template>
  <body>
    <header>
      <h1>It's time to create your quiz!</h1>
    </header>
    <div class="wrap2">
      <div id="preview">
        <div id="previewTitle">
        <p id="as">Preview</p>
        </div>
        <div id="previewDesc">
          <span id="pdes" style="background-color: black">Preview desc</span>
        </div>
        <div id="previewPic">
      </div>
      <div id="audio">
      </div>
      </div>
      <div class="createWindow">
        <h3> Quiz name: </h3>
        <textarea id="quizTitle" type="text" v-model="pollId" placeholder="Pick a name for your quiz..."></textarea>
        <h3>Quiz description:</h3>
        <textarea id="desIptBox" type="text" v-model="pollDes" placeholder="Add a short description of your quiz..."></textarea>
        <!--button v-on:click="createPoll">
          Create poll
        </button-->
        <div class="wrap3">
          <button type="submit" v-on:click="PicChoose()">
            <img src="https://static.thenounproject.com/png/17840-200.png" style = "height:1.5em;">
            <span>Import picture</span>
          </button>
           <!-- v-on:click="MusicChoose()" -->
          <select type="submit" v-model="music" id="music">
            <option disabled value=""> select music </option>
                   <option>Brass</option>
                   <option>Ragtime</option>
                   <option>Strings</option>
                   <option>Techno</option>
                   <option>Trap</option>
            <img src="http://assets.stickpng.com/thumbs/5a02cab818e87004f1ca43d9.png" style = "height:1.5em;">
            <span>Import music</span>
          </select>
        </div>
        
        <button type="submit" id="updatePre" v-on:click="updatePreview()">
          Update preview
        </button>
      </div>
    </div>
    <router-link v-bind:to="'/create/'+lang">
        <button v-on:click="createPoll">{{uiLabels.createPoll}}</button>
    </router-link>
    <router-link v-bind:to="'/'">
      <img src="https://www.pngkey.com/png/full/87-875502_back-button-arrow-sign.png" id="backButton" >
    </router-link>
    <router-link v-bind:to="'/'">
      <img src="https://www.pngkey.com/png/full/87-875502_back-button-arrow-sign.png" id="forwardButton" >
    </router-link>
    
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
      data: {},
      uiLabels: {},
      pollDes: "",
      music: ""
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
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
    },
    PicChoose(){
      let pict = prompt("Please enter a pictureadress:", "https://m.media-amazon.com/images/I/714csIk-dRL._AC_SL1500_.jpg");
    if (pict != null || pict != "") {
        document.getElementById("previewPic").style.backgroundImage = "url(" + pict+")";
        document.getElementById("previewPic").style.visibility= "hidden";
    }
  },
  MusicChoose(){
    var t1 = " type="+ '"audio/ogg"'+">";
    var t2 = " type="+ '"audio/mpeg"'+">";
    var song = "circus"+this.music+".mp3";
    var songPath = "../music/"
    var songsongPath = songPath + song;
    var s1 = "<p>"+ songsongPath +"</p>" +" <audio controls autoplay>"+"<source src=\""+songsongPath +"\"" + t2 +' <source src="'+songsongPath +"\"" +  t1 + " Your browser does not support the audio element. </audio>";
    console.log(s1);
    document.getElementById('audio').innerHTML = s1;
    var audio = new Audio(require(songsongPath))
    audio.play();
}
  
  },
  
    updatePreview(){
      //THis is the code fro updating title and description
      
      var c1 = document.getElementById('quizTitle').value;
      var d1 = document.getElementById('as');
      d1.innerHTML = c1;
      var c2 = document.getElementById('desIptBox').value;
      var d2 = document.getElementById('pdes');
      d2.innerHTML = c2;
      document.getElementById("previewPic").style.visibility= "visible";
      this.MusicChoose();
  },
    
  }
</script>

<style>
header {
  font-size: 20pt;
  text-shadow: 3px 3px navy;
}

.createWindow{
  background-color: wheat;
  width: 100%;
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
  height: 100%;
  border: 5px black solid;
}
#previewTitle{
  font-size: 30px;
  text-shadow: 3px 3px navy;
  color: white;
  height: 15%;
  line-break: auto;
  max-height: 15%;
}
#as{
  margin: 10px 0px 0px;
}

#previewDesc{
  width: 40%;
  height: 70%;
  float: left;
  color: aliceblue;
  font-family: "Times New Roman";
  line-break: auto;
}
#previewPic{
  width: 50%;
  height: 70%;
  float: left;
  background-repeat: no-repeat;
  background-size: 100% 100%;
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

.wrap3 {
   margin: 0px;
   padding: 5% 0% 5% 8%;
   grid-gap: 4%;
   width: 80%;
   display: grid;
   grid-template-columns: 50% 50%;
   align-items: center;
  }

.wrap2 button{
  background-color: wheat;
  text-transform: uppercase;
  padding-bottom: 1%;
  font-size:80%;
}

</style>
