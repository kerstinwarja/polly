<template>
<div id="quest">
  <div id="timer" v-if="this.question.t != ''">
    {{this.question.t - this.timerCount}}
  </div>
  <p>{{question.q}}</p>
  <img v-if="question.questionImg" v-bind:src="question.questionImg" id="prePic">
</div>
<!--Dethär skulle behöva bytas ut mot att alternativet man klickar på får en tjock border-->
<template  v-if="myAnswer!==''">
  <h3> My answer is: {{this.myAnswer}}</h3>
</template>
<!--fram till hit-->
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

<template v-if="timesUp">
  <button v-for="(a,index) in question.a" v-bind:key="a" v-bind:index="index" v-bind:class="'ans'+ question.isCorrect[index]">
    {{ a }}
    {{this.question.isCorrect[index]}}
  </button>
</template>

</div>

</template>
<script>

export default {
  name: 'Bars',
  props: {
    question: Object,

  },
  emits:["answer"],

  data: function () {
    return {
      timerCount: 0,
      timerEvent:null,
      timerEnabled: true,
      timesUp:false,
      myAnswer:"",
      clicked:false,
      pickedIndex:"",
      cloneAnsArray:[],
      cloneStartAns:[]
    }
  },
  watch:{
    timerCount: function(timeNow){
      if(timeNow==this.question.t){
            clearInterval(this.timerEvent)
            this.timesUp=true;
            console.log("timesUp" + this.timesUp)
      }
    }
  },
  //Timer

  created:function(){
    var a = new Date()
    //var intervalId = setInterval(()=>{console.log(this.timerCount - Math.round((new Date() - a)/1000))}, 1000)
    this.timerEvent = setInterval(()=>{this.timerCount = Math.round((new Date() - a)/1000)}, 1000) //Math.round((new Date() - a)/1000)
    //console.log(intervalId)
  },

  methods: {

    answer: function (answer, index) {
      this.$emit("answer", answer);
      //this.timesUp=true;
      this.myAnswer=answer;
      this.clicked=true;
      this.findPickedAnswer(this.myAnswer);
      if(this.question.isCorrect[index]){
        console.log("CORRECT!");
        //this.ansCorrect=true;

      }else{
        console.log("INCORRECT!");
      }
    },
    findPickedAnswer(myAnswer){
      var array = this.question.a
      this.pickedIndex = array.indexOf(myAnswer)
      this.cloneAnsArray = array.slice(this.pickedIndex+1)
      this.cloneStartAns = array.slice(0, this.pickedIndex)
    }

  }
}
</script>

<style>
  #quest{
    font-size: 40pt;
    text-align: center;
    padding-top:0; /*5%*/
    margin: 0;
    color: white;
    text-shadow: 3px 3px #990000;
  }

  #ans{
    display:grid;
    height: 200px;
    width: 90%;
    grid-template-columns: repeat(2, 1fr); /*default*/
    gap: 10px;
    align-items: center;
    margin-left:5%;
    margin-right: 5%;
    margin-top: 0%;

  }

  button{
    height:100%;
    width:100%;
    background-color: greenyellow;
    font-size:30pt;

  }
  #prePic{
    width: 30%;
    object-fit: contain;
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
    background-color:#99e5cb;
    border: black 8px solid;
    }

  h3{
    font-size: 20pt;
    color: white;
    text-shadow: 3px 3px #990000;
    }

</style>
