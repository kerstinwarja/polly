<template>
<header v-if="this.questionNumber == this.allQuestions-1">And the winner is:{{arrdata[0][0]}} </header>
    <header>Scoreboard</header>
<div class="barWrapper">
  <template v-if="arrdata[0][1] == arrdata[1][1]"> The leaders are: {{arrdata[0][0]}} and {{arrdata[1][0]}} </template>
  <template v-else> The leader is: {{arrdata[0][0]}} </template>
  <div class="bar" v-for="(item, key) in data" v-bind:key="key">
    <div v-bind:style="{height: item + 'px', width:'30px'}">

    </div>
    <div id="barSpan">
      <span> {{item}} </span>
    </div>
    <div id="names">
      {{key}}
    </div>
  </div>

</div>

</template>

<script>
export default {
  name: 'Bars',
  props: {
    data: Object,
  },
  data: function () {
    return {
      arrdata:[],
    }
  },
  created:function(){
    this.sortera();
  },
  methods: {
    sortera(){
    this.arrdata = Object.entries(this.data).sort((a,b) => b[1]-a[1]);

    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bar {
  display: inline-block;
  width: 50px;
  transform: rotate(-90deg);
  margin: 0%;

}

#barSpan {
  position: relative;
  transform: rotate(90deg);
  font-size: 1.5em;
}

#names {
  transform: rotate(90deg);
  padding-top: 150%;
  font-size: 1em;


}

.bar:nth-child(1) div:nth-child(1) {
  background-color: #990000;
  margin: auto;
  border: 0.1em black solid;
}
.bar:nth-child(2) div:nth-child(1) {
  background-color:navy;
  margin: auto;
  border: 0.1em black solid;
}
.bar:nth-child(3) div:nth-child(1) {
  background-color: #ffcc00;
  margin: auto;
  border: 0.1em black solid;
}
.bar:nth-child(4) div:nth-child(1) {
  background-color:rgb(100, 155, 36);
  margin: auto;
  border: 0.1em black solid;
}
.bar:nth-child(5) div:nth-child(1) {
  background-color:#633D41;
  margin: auto;
  border: 0.1em black solid;
}
header {
  font-size: 5em;
  text-shadow: -0.03em 0 #990000, 0 0.07em #990000, 0.07em 0 #990000, 0 -0.01em #990000;
  color: white;
  padding-top: 0%;
  margin-bottom: 3%;
}

.barWrapper {
  background-color: wheat;
  width: 50%;
  min-height: 10em;

  margin: auto;
  border: 0.2em navy solid;
  border-radius: 0.8em;
  font-size: 2em;
  color: navy;
  vertical-align: bottom;
  display: grid;
  grid-template-rows: 12% 12% 12% 12% 12%;
  grid-gap: 10%;
  padding: 0%;
}
</style>
