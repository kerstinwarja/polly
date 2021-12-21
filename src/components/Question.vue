<template>
<div id="quest">
  <div id="timer">
    {{this.question.t - this.timerCount}}
  </div>
  <p>{{question.q}}</p>
  <img v-if="question.questionImg" v-bind:src="question.questionImg" id="prePic">
</div>
<div id="ans">
<template v-if="!clicked">
  <button v-for="(a,index) in question.a" v-bind:key="a" v-bind:index="index" v-bind:class="'ans'+index" v-on:click="answer(a, index)">
    {{ a }}
  </button>
</template>
<template v-if="clicked">
  <button v-for="(a,index) in question.a" v-bind:key="a" v-bind:index="index" v-bind:class="'ans'+ question.isCorrect[index]" v-on:click="answer(a, index)">
    {{ a }}
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
      clicked:false,
      ansCorrect:false
    }
  },
  watch:{
    timerCount: function(timeNow){
      if(timeNow==this.question.t){
            clearInterval(this.timerEvent)
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
      this.clicked=true;
      if(this.question.isCorrect[index]){
        console.log("CORRECT!");
        this.ansCorrect=true;

      }else{
        console.log("INCORRECT!");
      }
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

</style>
