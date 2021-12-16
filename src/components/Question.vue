<template>
<div id="quest">
  <p>{{question.q}}</p>
</div>
<div id="ans">
  <button v-for="(a,index) in question.a" v-bind:key="a" v-bind:index="index" v-bind:correct=isCorrect v-bind:class="'ans'+index" v-on:click="answer(a)">
    {{ a }}
    {{isCorrect}}
  </button>
</div>



</template>
<script>
export default {
  name: 'Bars',
  props: {
    question: Object,
    
  },
  
  data: function () {
    return {
      isCorrect:true,
      timerCount: this.question.t,
      timerEnabled: true,
    }
  },
  
 
  
  methods: {
    answer: function (answer) {
      this.$emit("answer", answer);
      this.isCorrect=false;
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
    margin-top: 20%;
    
  }

  button{
    height:100%;
    width:100%;
    background-color: greenyellow;
    font-size:30pt;
    
  }
  .ans0{

    background-color:yellow;
  }
  .ans1{
      background-color:green;
  }
   .ans2{
    background-color:red;
  }
   .ans3{
    background-color:blue;
  }
  .ans4{
    background-color:blue;
  }
  .ans5{
    background-color:blue;
  }



</style>