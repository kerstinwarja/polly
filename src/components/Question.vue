<template>
<div id="quest">
  <p>{{question.q}}</p>
  <p>{{question.questionNumber}}</p>
  <p>{{question.isCorrect}}</p>
</div>
<div id="ans">
  <button v-for="(a,index) in question.a" v-bind:key="a" v-bind:index="index" v-bind:class="'ans'+index" v-on:click="answer(a)"> <!--v-bind:correct=isCorrect-->
    {{ a }}
  </button>
</div>



</template>
<script>

export default {
  name: 'Bars',
  props: {
    question: Object,

  },

/*  data: function () {
    return {
      isCorrect:
    }
  },*/


  methods: {
    answer: function (answer) {
      this.$emit("answer", answer);
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



</style>
