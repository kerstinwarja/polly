<template>
<div id="quest">
  <p>{{question.q}}</p>
</div>
<div id="ans">
  <button v-for="a in question.a"  v-bind:key="a" v-on:click="answer(a)">
    {{ a }}   
  </button>
</div>

  <!--<button id="ans1" v-if="question.a[0]">
    {{ question.a[0]}} 
  </button>
  <button id="ans2" v-if="question.a[1]">
    {{ question.a[1]}} 
  </button>
  <button id="ans3" v-if="question.a[2]">
    {{ question.a[2]}} 
  </button>
  <button id="ans4" v-if="question.a[3]">
    {{ question.a[3]}} 
  </button>
  <button id="ans5" v-if="question.a[4]">
    {{ question.a[4]}} 
  </button>
  <button id="ans6" v-if="question.a[5]">
    {{ question.a[5]}} 
  </button> -->


  <!--{{question.a[0]}} -->

</template>
<script>
export default {
  name: 'Bars',
  props: {
    question: Object
  },
  counter:0,
  
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
  #ans1{
    background-color: blue;
  }
   #ans2{
    background-color:red;
  }
   #ans3{
    background-color:green;
  }


</style>