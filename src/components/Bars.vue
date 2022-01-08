<template>
<div class="barWrapper">
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
  padding-top: 100%;
  font-size: 1em;
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
  border: 0.2em navy solid;
  border-radius: 0.8em;
  font-size: 2em;
  color: navy;
  vertical-align: bottom;
  display: grid;
  grid-template-rows: 15% 15% 15% 15% 15%;
  grid-gap: 6%;
  padding: 0%;
}
</style>
