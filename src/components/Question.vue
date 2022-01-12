<template>
  <div id="quest">
    <p>{{question.q}}</p>
  </div>
  <div id="prePic">
    <img v-if="question.questionImg" v-bind:src="question.questionImg" >
  </div>
  <div class="timer">
    <div v-if="this.question.t != '' && this.question.t!=null">
      {{this.question.t - this.timerCount}}
    </div>
    <button v-show="isHost" v-on:click="zeroTimer" id="timesUp">
      {{uiLabels.timesUp}}
    </button>
  </div>
  <div id="ans">
  <template v-if="!timesUp && !this.clicked">
    <button v-for="(a,index) in question.a" v-bind:key="a" v-bind:index="index" v-bind:class="'ans'+index" v-on:click="this.myAnswer =='' && (answer(a, index))"> <!--id="{clicked ? 'isChosen': ''}"-->
      {{ a }}
    </button>
  </template>
  <!--Jag gjorde en variant här men lite krånglig egentligen, funkar dock fast byter färg också. //Pelle -->
  <template v-if="!timesUp && this.clicked">
    <button v-for="(a,index) in cloneStartAns" v-bind:key="a" v-bind:index="index" v-bind:class="'ans'+index"> <!--id="{clicked ? 'isChosen': ''}"-->
      {{ a }}
    </button>

    <button  v-bind:key="this.question.a[this.pickedIndex]" v-bind:index="index" v-bind:class="'ans'+'Pick'" > <!--id="{clicked ? 'isChosen': ''}"-->
      {{ this.question.a[this.pickedIndex] }}
    </button>

    <button v-for="(a,index) in cloneAnsArray" v-bind:key="a" v-bind:index="index+this.pickedIndex" v-bind:class="'ans'+(index+this.pickedIndex+1)" > <!--id="{clicked ? 'isChosen': ''}"-->
      {{ a }}
    </button>
  </template>

  <template v-if="this.timesUp">
    <button v-for="(a,index) in question.a" v-bind:key="a" v-bind:index="index" v-bind:class="'ans'+ question.isCorrect[index]">
      {{ a }}
    </button>
  </template>
  </div>

</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Bars',
  props: {
    question: Object,
    timesUp: Boolean,
    isHost: Boolean
  },
  emits:["answer", "timesUp"],

  data: function () {
    return {
      uiLabels: {},
      lang:"",
      timerCount: 0,
      timerEvent:null,
      timerEnabled: true,
      myAnswer:"",
      clicked:false,
      pickedIndex:"",
      cloneAnsArray:[],
      cloneStartAns:[],
      pollId: "",
      questionCounter: 0
    }
  },
  watch:{
    timerCount: function(timeNow){
      if(timeNow==this.question.t){
        clearInterval(this.timerEvent)
        this.$emit('timesUp')
      }
    },
    timesUp: function (isTimeUp) {
      if(isTimeUp)
        clearInterval(this.timerEvent)
        this.timerCount = this.question.t
    }
  },
  //Timer
  created:function(){
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      console.log(labels)
      this.uiLabels = labels
    })
    //if(this.question.t!=""&&this.question.t!=null){
      var a = new Date()
      this.timerEvent = setInterval(()=>{this.timerCount = Math.round((new Date() - a)/1000)}, 1000) //Math.round((new Date() - a)/1000)
    //}
  },
  methods: {
    answer: function (answer, index) {
      if(!this.isHost){
        this.$emit("answer", answer);
        //this.timesUp=true;
        this.myAnswer=answer;
        this.clicked=true;
        this.findPickedAnswer(this.myAnswer);
        if(this.question.isCorrect[index]){
          console.log("CORRECT!");
          //this.ansCorrect=true;
        }
        else{
          console.log("INCORRECT!");
        }
      }
    },
    findPickedAnswer(myAnswer){
      var array = this.question.a
      this.pickedIndex = array.indexOf(myAnswer)
      this.cloneAnsArray = array.slice(this.pickedIndex+1)
      this.cloneStartAns = array.slice(0, this.pickedIndex)
    },
    zeroTimer: function() {
      this.$emit('timesUp')
    }
  }
}
</script>

<style scoped>
.timer {
  position: absolute;
  left: 80%;
  font-size: 6em;
  height:20%;
  align-items: top;
}
#timesUp{
  font-size: 15%;
  text-transform: uppercase;
  height: 4em;
  width: auto;
  background-color: black;
  color: white;
  position:relative;
  margin-bottom: 50%;
}

#prePic{
  height: 35%;
  width: 45%;
  position: absolute;
  left: 27.5%;
  /*background-repeat: no-repeat;
  background-size: 100% 100%;*/
}

#prePic img {
  height: 100%;
  width:100%;
  object-fit: contain;
}
#ans{
  display:grid;
  height: 10em;
  width: 90%;
  max-width: 90em;
  grid-template-columns: repeat(2, 1fr); /*default*/
  gap: 3%;
  align-items: center;
  margin:25% 5% 0% 5%;
}
.ans0{
  background-color:#628579;
}
.ans1{
  background-color:#536CB0;
}
.ans2{
  background-color:#CF903A;
}
.ans3{
  background-color:#A3493E;
}
.ans4{
  background-color:#D8A1A9;
}
.ans5{
  background-color:#633D41;
}
.anstrue{
  background-color: green;
}
.ansfalse{
  background-color: gray;
  opacity: 0.3;
}
.ansPick{
  background-color: white;
  border: black 0.2em solid;
}
#quest{
  font-size: 3em;
  text-align: center;
  padding-top:0; /*5%*/
  margin: 0;
  color: white;
  text-shadow: 3px 3px #990000;
}

button{
  height:100%;
  width:100%;
  background-color: wheat;
  font-size:2em;
  border: black 0.1em solid;
}
@media only screen and (max-width: 1330px) {
  #ans{
    margin:35% 5% 0% 5%;
  }
}
@media only screen and (max-width: 990px) {
  button{
    font-size:1.5em;
  }
  #ans{
    margin:48% 5% 0% 5%;
  }
}
@media only screen and (max-width: 705px) {
#ans{
  margin:60% 5% 0% 5%;
}
button{
  font-size:1em;
}
.timer {
  font-size: 3em;
}
#quest{
  font-size:2em;
}
}
@media only screen and (max-width: 500px) {
  #ans{
    margin:80% 5% 0% 5%;
  }}
</style>
