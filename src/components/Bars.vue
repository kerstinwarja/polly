<template>
<div class="barWrapper">
  <div class="bar" v-for="(item, key) in arrdata" v-bind:key="'i'+key">
    <div v-bind:style="{height: item[1] + 'px', width:'1em'}">

    </div>
    <div id="barSpan">
      <span> {{item[1]-10}}p </span>
    </div>
    <div id="names">
      <p>{{item[0]}}</p>
    </div>
  </div>
</div>
</template>


<script>
export default {
  name: 'Bars',
  props: {
    data: Object,
    arrdata: Array,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bar {
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
  margin-left: -1.2em;
  font-size: 0.8em;
  position: absolute;
    top: 2px;
    left: 1px;
    color: black;
    font-weight: bold;
}

.bar:nth-child(1) div:nth-child(1) {
  background-color: #990000;
  margin: auto;
  border: 0.1em black solid;
  margin-top: 1em;
}
.bar:nth-child(2) div:nth-child(1) {
  background-color:navy;
  margin: auto;
  border: 0.1em black solid;
  margin-top: 1em;
}
.bar:nth-child(3) div:nth-child(1) {
  background-color: #ffcc00;
  margin: auto;
  border: 0.1em black solid;
  margin-top: 1em;
}
.bar:nth-child(4) div:nth-child(1) {
  background-color:rgb(100, 155, 36);
  margin: auto;
  border: 0.1em black solid;
  margin-top: 1em;
}
.bar:nth-child(5) div:nth-child(1) {
  background-color:#633D41;
  margin: auto;
  border: 0.1em black solid;
  margin-top: 1em;
}

.barWrapper {
  background-color: wheat;
  width: 50%;
  min-height: 12em;
  max-height: 12em;
  margin: auto;
  border: 0.2em #2d4463 solid;
  border-radius: 0.8em;
  font-size: 2em;
  color: #2d4463;
  vertical-align: bottom;
  display: grid;
  grid-template-rows: 15% 15% 15% 15% 15%;
  grid-gap: 6%;
  padding: 0%;
}

@media only screen and (max-width: 1100px) {
  .barWrapper {
    width: 90%;
    min-height: 16em;
    max-height: 16em;
  }}

</style>
