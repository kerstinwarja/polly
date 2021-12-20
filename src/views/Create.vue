<template>
<body>
<header>
  <h1>Add questions and answers to your quiz!</h1>
</header>

  <div class="wrap2">
  <div id="preview">
    <div id="previewTitle">
      <span id="as">{{question}}</span>
    </div>
    <div id="previewPic">
      <img v-if="questionImg" v-bind:src="questionImg" id="prePic">
    </div>
    <div id="answers">
      <textarea id="answerBox" type="text"  v-for="(_,i) in answers"  v-model="answers[i]" v-bind:key="'answer'+i"  v-bind:class="'answer'+i" placeholder="Add an answer ..." readonly>
      </textarea>
    </div>
  </div>

  <div class="createWindow">
    <div id="createDiv">
      <h3> {{uiLabels.question}}: </h3> <br>
      <textarea id="quizTitle" type="text" v-model="question" placeholder="Write your question ..."></textarea> <br>
      <h3 style="float: left"> Answer: </h3>
      <button type="submit" id="removeQues" v-on:click="removeAnswer()">
        Remove answer
      </button>
      <button id="addQuestionButton" v-on:click="addAnswer">
        Add answer
      </button><br>
      <div v-for="(_, i) in answers" v-bind:key="'answer'+i">
        <textarea id="ansAlt" type="text" v-model="answers[i]" v-bind:key="'answer'+i" maxlength="50" placeholder="Add an answer ..."></textarea>
        <input type="checkbox" v-model="isCorrect[i]">
        {{isCorrect[i]}}
      </div>
    </div>
    <div id="buttonDiv">
      <button type="submit" id="updatePre" v-on:click="updatePreview()">
        Update preview
      </button>
      <button id="addQues" v-on:click="addQuestion">
        Add question
      </button>

      <button id="importPic" type="submit" v-on:click="PicChoose()">
        <!--img src="https://static.thenounproject.com/png/17840-200.png" style = "height:1.5em;"-->
        <span>Import picture</span>
      </button>
      <!-- timerKOD  -->
      Timer
          <select type="submit" v-model="time">
            <option disabled value=""> select time </option>
                   <option>3</option>
                   <option>7</option>
                   <option>9</option>
          </select>
    </div>
  </div>

</div>

  <div>
    <input type="number" v-model="questionNumber">
    <button v-on:click="runQuestion">
      Run question
    </button>
    {{data}}
    <router-link v-bind:to="'/result/'+ pollId">Check result</router-link>
  </div>
  <router-link v-bind:to="'/initialize/'+ lang">
      <img src="https://www.pngkey.com/png/full/87-875502_back-button-arrow-sign.png" id="backButton" >
    </router-link>
    <router-link v-bind:to="'/polllibrary/'+ lang" v-on:click=saveQuiz()>
      <img src="https://www.pngkey.com/png/full/87-875502_back-button-arrow-sign.png" id="forwardButton">
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
      //pollId: "", //remove to not overwrite from initialize?
      question: "",
      answers: ["", ""],
      questionNumber: 0,
      questionImg: "",
      data: {},
      uiLabels: {},
      counter: 2,
      timerCount: "",
      timerEnabled: true,
      isCorrect:[false, false],
    }
  },
  created: function () {
    this.lang = this.$route.params.lang;
    this.pollId = this.$route.params.id;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("dataUpdate", (data) =>
      this.data = data
    )
    socket.on("pollCreated", (data) =>
      this.data = data
    )
  },
  methods: {
    /*createPoll: function () {
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
    },*/
    addQuestion: function () {
      socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers, t: this.time, questionNumber: this.questionNumber,questionImg: this.questionImg, isCorrect: this.isCorrect} )
      this.questionNumber ++
      //empy all textareas when the question has been added
      //document.getElementById('quizTitle').reset();
    },
    addAnswer: function () {
      if(this.counter<6) {
        this.answers.push("");
        this.isCorrect.push(false);
        this.counter++;
      }
    },
    removeAnswer: function () {
      if(this.counter>2) {
        this.counter--;
        this.answers.pop();
        this.isCorrect.pop();

      }
    },
    runQuestion: function () {
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
    },
    PicChoose(){
      let person = prompt("Please enter a pictureadress:", "https://m.media-amazon.com/images/I/714csIk-dRL._AC_SL1500_.jpg");
      this.questionImg = person;
      },

    updatePreview(){
      //THis is the code for updating title and description
      this.timerCount = this.time;
      this.timerEnabled = true;
    },
    saveQuiz(){
      var c1 = document.getElementById('quizTitle').value;
      if(c1!=""){
        this.addQuestion()
      }
      console.log("ADDED!")
    }
    },
  }

</script>


<style scoped>

header {
  font-size: 20pt;
  text-shadow: 3px 3px navy;
  margin-bottom: 5%;
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
  border: 3px navy solid;
  height: 120%;
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
  align-items: top;
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

::placeholder{
  color:navy;
}

#preview{
  background-color: wheat;
  background-size: cover;
  max-height: 100%;
  background-position: bottom;
  color: Black;
  height: 72vh;
  border: 5px black solid;
  overflow: hidden;
  resize: none;
  position: relative;
  padding-bottom: 2%;
}

#previewTitle{
  font-size: 30px;
  text-shadow: 3px 3px navy;
  color: white;
  line-break: auto;
  text-align:center;
}

#addQuestionButton {
  height: 100%;
  width: 15%;
  background-color: #ffcc00;
}

#updatePre {
  height: 100%;
  width: 20%;
  background-color: rgb(135, 175, 111);
}

#addQues {
  height: 100%;
  width: 20%;
  background-color: rgb(100, 155, 36);
  margin: 0 2%;
}

#removeQues {
  height: 100%;
  width: 15%;
  background-color: rgb(255, 0, 0);
  margin-bottom: 1%;
}

#importPic {
  height: 100%;
  width: 20%;
  background-color: wheat;
}

#previewPic{
  width: 25%;
  height: 35%;
  position: absolute;
  left: 37.5%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

#answers{
  display:grid;
  height: 150px;
  width: 90%;
  grid-template-columns: repeat(2, 1fr); /*default*/
  gap: 25px;
  align-items: center;
  margin-left:5%;
  margin-right: 5%;
  margin-top: 25%;
  clear: left;
}

#answerBox{
  height:85%;
  width:100%;
  font-size:2vh;
  border-radius: 12px;
  color:black;
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
  margin-top: 10%;
  float: left;

}
#previewPic img{
  width: 100%;
  object-fit: contain;
}
#forwardButton{
  height: 5%;
  width: 8%;
  margin-right: 4%;
  margin-top: 10%;
  float: right;
  transform: scaleX(-1);
}

#timer{
  margin: 0%;
}
.answer0{
  background-color:#628579;
  }
.answer1{
  background-color:#536CB0;
  }
.answer2{
  background-color:#CF903A;
  }
.answer3{
   background-color:#A3493E;
  }
.answer4{
  background-color:#D8A1A9;
  }
.answer5{
  background-color:#633D41;
  }
</style>
