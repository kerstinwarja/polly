<template>
  <body>
    <header>
      <h1>{{uiLabels.createHead}}</h1>
    </header>
    <div class="mainWrap">
      <div>
        <div id="preview">
          <div id="previewTitle">
            <span>{{question}}</span>
          </div>
          <div id="previewPic">
            <img v-if="questionImg" v-bind:src="questionImg">
          </div>
          <div id="answers">
              <textarea id="answerBox" type="text"  v-for="(_,i) in answers"  v-model="answers[i]" v-bind:key="'answer'+i"  v-bind:class="'answer'+i" v-bind:placeholder="uiLabels.previewPlaceholder" readonly>
              </textarea>
          </div>
        </div>

        <div id="questionMenu">
          <template v-if="!this.isEditing">
            <h3>{{uiLabels.questionAlterate}}</h3>
          </template>
          <template v-if="this.isEditing">
            <h3>{{uiLabels.changes}}"{{this.allQuestions[this.questionNumber]}}"</h3>
          </template>
          <button v-for="(q,i) in this.allQuestions" v-bind:key="q" v-bind:index="i" v-on:click="accessQuestion(i)" v-bind:class="finishedQuestions">
            {{i+1}}: {{ q }}
          </button>
        </div>
      </div>

      <div class="createWindow">

          <h3> {{uiLabels.question}}: </h3>
          <textarea id="qInput" type="text" v-model="question" maxlength="100" v-bind:placeholder="uiLabels.questionPlaceholder"></textarea> <br>
          <div id="ansTitle">
            <h3>{{uiLabels.answer}}</h3>
            <h3 id="markedCorrect">Mark<br>as<br>correct</h3>
          </div>
          <div   v-for="(_, i) in answers" v-bind:key="'answer'+i">
            <button  v-if="this.answers.length>2" class="ansButtons" type="submit" v-on:click="removeAnswer(i)" style="background-color: rgb(255, 0, 0);">-</button>
            <textarea type="text" v-model="answers[i]" v-bind:key="'answer'+i" maxlength="50" v-bind:placeholder="uiLabels.answerPlaceholder"></textarea>
            <input class="ansButtons" type="checkbox" v-bind:key="'answer'+i" v-model="isCorrect[i]">
          </div>
          <button v-if="this.answers.length<6" type="submit" v-on:click="addAnswer()" style="background-color: rgb(135, 175, 111);">{{uiLabels.answerAdd}}</button>
        <div id="buttonDiv">
          <!--div>
            <button type="submit" v-on:click="removeAnswer()" style="background-color: rgb(255, 0, 0);">
              {{uiLabels.answerRemove}}
            </button>
            <button v-on:click="addAnswer">
              {{uiLabels.answerAdd}}
            </button>
          </div-->

            <button type="submit" v-on:click="setTime()" style="background-color: darkcyan">
              <span>
                {{uiLabels.set}}<br>
                {{uiLabels.timer}}
              </span>
            </button>
            <button type="submit" v-on:click="PicChoose()" style="background-color: rosybrown">
              <span>
                {{uiLabels.import}}<br>{{uiLabels.picture}}
              </span>
            </button>
            <button  v-if="!this.isEditing" v-on:click="addQuestion()" >
              {{uiLabels.add}}<br>{{uiLabels.questionLower}}
            </button>
            <button  v-if="this.isEditing" v-on:click="removeQuestion(this.questionNumber)" style = "background-color: #A3493E">
              {{uiLabels.remove}}<br>{{uiLabels.questionLower}}
            </button>
            <button v-if="this.isEditing" v-on:click="saveChanges(this.questionNumber)" style = "background-color: royalblue">
              {{uiLabels.save}}<br>{{uiLabels.changes}}
            </button>

        </div>
      </div>
    </div>
    <div class="navButton">
    <router-link v-bind:to="'/initialize/'+ lang">
      <button style ="background-color: #4f5559">{{uiLabels.goBack}}</button>
    </router-link>
    <router-link v-bind:to="'/polllibrary/'+ lang">
      <button style="float:right; background-color: #236627" v-on:click="sendQuiz()">
        {{uiLabels.saveAndPlay}}
      </button>
    </router-link>
  </div>
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
      console.log("HERE")
      if(this.answers.length<6) {
        this.answers.push("");
        this.isCorrect.push(false);
      }
    },
    removeAnswer: function (i) {
      if(this.answers.length>2) {
        this.answers.splice(i, 1);
        this.isCorrect.splice(i, 1);
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
  font-size: 1.5em;
  text-shadow: -0.05em 0 navy, 0 0.15em navy, 0.15em 0 navy, 0 -0.05em navy;
  margin-bottom: 5%;
}
h3{
  margin:0px;
  padding: 2% 10% 1%;
  text-align: left;
  color: Navy;
}

body textarea{
  width: 70%;
  background-color: #f0e7d1;
  color: Navy;
  resize:none;
  padding: 0.4em 0.4em 0.4em;
  font-family: sans-serif;
  border: 0.1em solid;
}

.mainWrap {
  margin: 0px;
  padding: 0% 4% 0% 4%;
  width: 92%;
  height: 95%;
  display: grid;
  grid-gap: 5%;
  grid-template-columns: 61% 31%;
  align-items: top;
}
#preview{
  background-color: wheat;
  background-size: cover;
  max-height: 100%;
  background-position: bottom;
  color: Black;
  height: 27em;
  border: 0.3em black solid;
  overflow: hidden;
  resize: none;
  position: relative;
  padding: 2% 0% 1% 0%;
  align-items: bottom;
}

#previewTitle{
  font-size: 1.5em;
  text-shadow: -0.01em 0 navy, 0 0.07em navy, 0.07em 0 navy, 0 -0.01em navy;
  color: white;
  line-break: auto;
  text-align:center;
  min-height: 18%;
}

#previewPic{
  height: 25%;
  width: 35%;
  position: absolute;
  left: 32.5%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
#previewPic img{
  width: 100%;
  object-fit: contain;
}
#answers{
  display:grid;
  height: 9em;
  width: 90%;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5em;
  align-items: center;
  margin-left:5%;
  margin-right: 5%;
  margin-top: 26%;
  clear: left;
/*  transform: translateY(-10%);*/

}
#answerBox{
  height:85%;
  width:90%;
  font-size:0.5;
  border-radius: 0.7em;
  color:black;
}
#questionMenu{
  width:95%;
  height: 5em;
  border: black 0.1em solid;
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

.createWindow{
  background-color: wheat;
  width: 100%;
  border: 0.2em navy solid;
  height: 34em;
  position: relative;
}

#qInput{
  width:90%
}
#ansTitle{
  display:grid;
  grid-template-columns: 85% 15%;
  padding-left:3%;
}
.ansButtons{
  margin: 0% 4% 0% 4%;
  /*-ms-transform: translateY(-50%);*/
  transform: translateY(-75%);
}
#markedCorrect{
  font-size:0.9em;
  text-align: center;
}
#buttonDiv {
  height: 10%;
  width: 100%;
  position: absolute;
  padding: 5% 0% 5% 0%;
  bottom: 0px;
}
#buttonDiv button {
  height: 100%;
  width: 23%;
  background-color: rgb(135, 175, 111);
}

.navButton button{
  height: 3em;
  width: 6em;
  margin: 2% 4% 2% 4%;
  float: left;
  text-transform: uppercase;
  color: wheat;
  text-align: center;
  font-size: 1em;
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

@media only screen and (max-width: 1300px) {
 body textarea{
   width:60%;
 }
 #ansTitle{
   grid-template-columns: 80% 20%;
 }

}

@media only screen and (max-width: 980px) {
  /* For mobile phones: */
  .mainWrap{
  padding: 0% 8% 0% 8%;
  width:84%;
    grid-template-columns: 100%;
    grid-template-areas:
      'create'
      'preview'
  }
  header{
    font-size: 1.5em;
    padding-top:5%
  }
  #preview{
    grid-area:preview;
  }
  .createWindow{
    grid-area:create;
    height: 36em;
  }
  .navButton{
    margin-top: 10%;
  }
  #ansTitle{
    grid-template-columns: 70% 30%;
  }
  #answers{
    transform: translateY(0%);
  }
}
@media only screen and (max-width: 700px) {
  #preview{
    height:25em
  }
}

@media only screen and (max-width: 600px) {
  #preview{
    height:21em
  }
}

@media only screen and (max-width: 400px) {
  #preview{
    height:18em
  }
  #buttonDiv button {
    width:25%;
  }
}
</style>
