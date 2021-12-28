<template>
<body>
<header>
  <h1>Add questions and answers to your quiz! </h1>
</header>

  <div class="wrap2">
  <div>
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
    <div id="questionMenu">
      <template v-if="!this.isEditing">
        <h3>Select a question to make alterations</h3>
      </template>
      <template v-if="this.isEditing">
        <h3> You are making changes in :"{{this.allQuestions[this.questionNumber]}}"</h3>
      </template>
      <button v-for="(q,i) in this.allQuestions" v-bind:key="q" v-bind:index="i" v-on:click="accessQuestion(i)" v-bind:class="finishedQuestions">
        {{i+1}}: {{ q }}
      </button>
  </div>
</div>

  <div class="createWindow">
    <div id="createDiv">
      <h3> {{uiLabels.question}}: </h3> <br>
      <textarea id="quizTitle" type="text" v-model="question" maxlength="70" placeholder="Write your question ..."></textarea> <br>
      <h3 style="float: left"> Answer: </h3>
      <button type="submit" id="removeAns" v-on:click="removeAnswer()">
        Remove answer
      </button>
      <button id="addAnswerButton" v-on:click="addAnswer">
        Add answer
      </button><br>
      <div v-for="(_, i) in answers" v-bind:key="'answer'+i">
        <textarea id="ansAlt" type="text" v-model="answers[i]" v-bind:key="'answer'+i" maxlength="50" placeholder="Add an answer ..."></textarea>
        <input type="checkbox" v-bind:key="'answer'+i" v-model="isCorrect[i]">
      </div>
    </div>
    <div id="buttonDiv">
      <button type="submit" v-on:click="setTime()" style="background-color: darkcyan">
        <span>Set <br> timer</span>
      </button>
      <!--select type="submit" v-model="time">
        <option disabled value=""> Select time </option>
               <option>5</option>
               <option>10</option>
               <option>15</option>
      </select-->
      <button type="submit" v-on:click="PicChoose()" style="background-color: rosybrown">
        <!--img src="https://static.thenounproject.com/png/17840-200.png" style = "height:1.5em;"-->
        <span>Import picture</span>
      </button>
      <button  v-if="!this.isEditing" v-on:click="addQuestion()" >
        Add question
      </button>
      <button  v-if="this.isEditing" v-on:click="removeQuestion(this.questionNumber)" style = "background-color: #A3493E">
        Remove question
      </button>
      <button v-if="this.isEditing" v-on:click="saveChanges(this.questionNumber)" style = "background-color: royalblue">
        Save changes
      </button>
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
      <button class="backButton"> <img src="https://www.pngkey.com/png/full/87-875502_back-button-arrow-sign.png" style = "height:1em;"> Go back </button>
    </router-link>
    <router-link v-bind:to="'/polllibrary/'+ lang">
      <button style="float:right" class="backButton" v-on:click="sendQuiz()"> <img src="https://www.pngkey.com/png/full/87-875502_back-button-arrow-sign.png" style = "height:1em; transform: scaleX(-1);"> Save and play quiz </button>
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
      allQuestions:[],
      answers: ["", ""],
      allAnswers:[],
      questionNumber: 0,
      //allQnr:[],
      questionImg: "",
      allQimg:[],
      isCorrect:[false, false],
      allisCorr:[],
      allTime:[],
      data: {},
      uiLabels: {},
      counter: 2,
      timerCount: "",
      timerEnabled: true,
      time:"",
      isEditing: false,
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
    /*addQuestion: function () {
      socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers, t: this.time, questionNumber: this.questionNumber,questionImg: this.questionImg, isCorrect: this.isCorrect} )
      this.questionNumber ++
      this.question=""
      this.answers= ["", ""]
      this.questionImg=""
    },*/

    sendQuiz: function(){
      if(this.question!==""){
        this.addQuestion();
      }
      for (let i = 0; i < this.allQuestions.length; i++) {
        this.question= this.allQuestions[i]
        this.answers= this.allAnswers[i]
        this.questionImg = this.allQimg[i]
        this.time = this.allTime[i]
        this.isCorrect = this.allisCorr[i]
        socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers, t: this.time, questionNumber: i ,questionImg: this.questionImg, isCorrect: this.isCorrect} )

      }
    },
    clearFields: function(){
      this.question=""
      this.answers= ["", ""]
      this.counter = 2;
      this.questionImg=""
      this.isCorrect=[false,false]
      this.time=""
    },
    addQuestion: function(){
      this.allQuestions.push(this.question)
      this.allQimg.push(this.questionImg)
      this.allTime.push(this.time)
      this.allAnswers.push(this.answers)
      this.allisCorr.push(this.isCorrect)
      this.clearFields()
    },
    removeQuestion(i){
        this.allQuestions.splice(i,1);
         this.allQimg.splice(i,1);
        this.allTime.splice(i,1);
        this.allAnswers.splice(i,1);
        this.allisCorr.splice(i,1);
        this.isEditing = false;
        this.clearFields();
         
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

    setTime(){
      let clock = prompt("Set a maximum time for answering the question (in seconds):");
      this.time = clock;
      },
    accessQuestion: function (i){
      this.isEditing = true
      this.question = this.allQuestions[i]
      this.isCorrect = this.allisCorr[i]
      this.questionImg = this.allQimg[i]
      this.answers = this.allAnswers[i]
      this.time = this.allTime[i]
      this.questionNumber=i
    },
    saveChanges: function(i){
      this.isEditing = false
      this.allQuestions[i] =this.question
      this.allisCorr[i] = this.isCorrect
      this.allQimg[i] = this.questionImg
      this.allAnswers[i] = this.answers
      this.allTime[i] = this.time
      this.clearFields()
    }
    /*updatePreview(){
      //THis is the code for updating title and description
      this.timerCount = this.time;
      this.timerEnabled = true;
    },*/
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
  height: 32em;
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
  height: 25em;
  border: 5px black solid;
  overflow: hidden;
  resize: none;
  position: relative;
  padding-bottom: 2%;
}

#questionMenu{
  width:95%;
  height: 5em;
  border: black 2px solid;
  margin-top: 1%;
  background-color: wheat;
  overflow: auto;
  padding: 2%;
}
#questionMenu button{
  background-color: #CF903A;
  color: black;
  height: 50%;
  width: 20%;
  float:left;
  overflow: hidden;
}
#questionMenu h3{
  text-align: center;
}
#previewTitle{
  font-size: 30px;
  text-shadow: 3px 3px navy;
  color: white;
  line-break: auto;
  text-align:center;
  min-height: 18%;
}

#addAnswerButton {
  height: 100%;
  width: 15%;
  background-color: rgb(135, 175, 111);
}

#buttonDiv button {
  height: 100%;
  width: 20%;
  background-color: rgb(135, 175, 111);
}

#removeAns {
  height: 100%;
  width: 15%;
  background-color: rgb(255, 0, 0);
  margin-bottom: 1%;
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
.backButton{
  height: 10%;
  width: auto;
  margin: 2% 4% 2% 4%;
  float: left;
  text-transform: uppercase;
  color: navy;
  text-align: center;
  font-size: 1em;
}

.backButton img {
  margin-top: 5%;
  height: 1em;
}

.backButton text {
  margin-bottom: 5%;
  margin-top: 0%;
}

#previewPic img{
  width: 100%;
  object-fit: contain;
}
#forwardButton{
  height: 5%;
  width: 8%;
  margin-right: 4%;
  margin-top: 1%;
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
