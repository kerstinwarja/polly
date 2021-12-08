<template>
<body>

<header>
  <h1>Add questions and answers to your quiz!</h1>
</header>


<div class="wrap2">
<div id="preview">
  <div id="previewTitle">
    <p id="as">Preview</p>
  </div>
  <div id="answers">
    <textarea id="answerBox" type="text"  v-for="(_,i) in answers"  v-model="answers[i]" v-bind:key="'answer'+i" placeholder="Add an answer ..." readonly></textarea>
  </div>
</div>

<div class="createWindow">
  <div id="createDiv">
  <h3> {{uiLabels.question}}: </h3> <br>
  <textarea id="quizTitle" type="text" v-model="question" placeholder="Write your question ..."></textarea> <br>
  <h3>Answer:</h3> <br>
  <textarea id="ansAlt" type="text" v-for="(_, i) in answers" v-model="answers[i]" v-bind:key="'answer'+i" maxlength="50" placeholder="Add an answer ..."></textarea>
</div>
  <div id="buttonDiv">
  <button id="addQuestionButton" v-on:click="addAnswer">
    Add answer
  </button>

  <button type="submit" id="updatePre" v-on:click="updatePreview()">
    Update preview
  </button>
  <router-link v-bind:to="'/initialize/'">
      <img src="https://www.pngkey.com/png/full/87-875502_back-button-arrow-sign.png" id="backButton" >
    </router-link>
    <router-link v-bind:to="'/polllibrary/'">
      <img src="https://www.pngkey.com/png/full/87-875502_back-button-arrow-sign.png" id="forwardButton" >
    </router-link>
</div>
</div>


</div>

  <div>
    <!--
    Poll link:
    <input type="text" v-model="pollId">
    <button v-on:click="createPoll">
      Create poll
    </button>
    -->


<!--    <div>

      <h3> {{uiLabels.question}}: </h3>
      <input type="text" v-model="question">
      <div>
        Answers:
        <input v-for="(_, i) in answers"
               v-model="answers[i]"
               v-bind:key="'answer'+i">
        <button v-on:click="addAnswer">
          Add answer alternative
        </button>
      </div>
    </div>-->

    <button v-on:click="addQuestion">
      Add question
    </button>
    <input type="number" v-model="questionNumber">
    <button v-on:click="runQuestion">
      Run question
    </button>
    {{data}}
    <router-link v-bind:to="'/result/'+pollId">Check result</router-link>
  </div>
  <router-link v-bind:to="'/initialize/'">
      <img src="https://www.pngkey.com/png/full/87-875502_back-button-arrow-sign.png" id="backButton" >
    </router-link>
    <router-link v-bind:to="'/polllibrary/'">
      <img src="https://www.pngkey.com/png/full/87-875502_back-button-arrow-sign.png" id="forwardButton" >
    </router-link>

</body>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Create',
  data: function () {
    return {
      lang: "",
      pollId: "", //remove to not overwrite from initialize?
      question: "",
      answers: ["", ""],
      questionNumber: 0,
      data: {},
      uiLabels: {},
      counter:2
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
    addQuestion: function () {
      socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers } )
    },
    addAnswer: function () {
      this.counter++;
      if(this.counter<7) {
        this.answers.push("");
      }
    },
    runQuestion: function () {
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
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
    }
  }
}
</script>


<style>

header {
  font-size: 20pt;
  text-shadow: 3px 3px navy;
}

h3{
  margin:0px;
  padding: 2% 10% 1%;
  text-align: left;
  color: Navy;
}

.createWindow{
  background-color: wheat;
  width: 100%;
  min-height: 110%;
  position: relative;
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

body textarea{
  width: 80%;
  background-color: wheat;
  color: Navy;
  resize:none;
  padding: 5px 5px 5px;
  font-family: sans-serif;
  border: 2px solid;
}

#preview{
  background-color: black;
  background-size: cover;
  max-height: 100%;
  background-position: bottom;
  color: Grey;
  height: 100%;
  border: 5px black solid;
  overflow: hidden;
  resize: none;
padding-bottom: 5%;
}

#previewTitle{
  font-size: 30px;
  text-shadow: 3px 3px navy;
  color: white;
  height: 15%;
  line-break: auto;
  max-height: 15%;
}

#addQuestionButton {
  height: 100%;
  width: 25%;
  background-color: #ffcc00;
}

#updatePre {
  height: 100%;
  width: 25%;
  background-color: rgb(135, 175, 111);

}

#answers{
  display:grid;
  height: 200px;
  width: 90%;
  grid-template-columns: repeat(2, 1fr); /*default*/
  gap: 25px;
  align-items: center;
  margin-left:5%;
  margin-right: 5%;
  margin-top: 20%;

}

#answerBox{
  height:85%;
  width:100%;
  background-color: greenyellow;
  font-size:3vh;
  border-radius: 20px;
  text-size-adjust: auto;
}

#ansAlt {

}

#createDiv {
  min-height: 85%;
}

#buttonDiv {
  height: 10%;
  width: 100%;
  position: absolute;
  padding-bottom: 5%;
  bottom: 0px;

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

</style>
