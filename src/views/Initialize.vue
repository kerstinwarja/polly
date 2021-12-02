<template>
  <body>
    <header>
      <h1>It's time to create your quiz!</h1>
    </header>
    <div class="wrap2">
      <div id="preview">Preview</div>
      <div class="createWindow">
        <h3> Quiz name: </h3>
        <textarea type="text" v-model="pollId" placeholder="Pick a name for your quiz..."></textarea>
        <h3>Quiz description:</h3>
        <textarea id="desIptBox" type="text" v-model="pollDes" placeholder="Add a short description of your quiz..."></textarea>
        <!--button v-on:click="createPoll">
          Create poll
        </button-->
        <button type="submit">
          <img src="http://assets.stickpng.com/thumbs/5a02cab818e87004f1ca43d9.png" style = "height:1.5em;">
          <span>Import music</span>
        </button>
      </div>
    </div>
    <router-link v-bind:to="'/create/'+lang">
        <button v-on:click="createPoll">{{uiLabels.createPoll}}</button>
    </router-link>
  </body>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Initialize',
  data: function () {
    return {
      lang: "",
      pollId: "",
      data: {},
      uiLabels: {},
      pollDes: ""
    }
  },
  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("dataUpdate", (data) =>
      this.data = data
    )
    socket.on("pollCreated", (data) =>
      this.data = data)
  },
  methods: {
    createPoll: function () {
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
    },
  }
}
</script>

<style>
header {
  font-size: 20pt;
  text-shadow: 3px 3px navy;
}

.createWindow{
  background-color: wheat;
  width: 100%;
}

body textarea{
  width: 80%;
  background-color: wheat;
  color: Navy;
  resize:none;
  padding: 5px 5px 5px;
  font-family: sans-serif;
  border: 2px solid;
}

.wrap2 button{
  width: 50%;
  background-color: wheat;
  text-transform: uppercase;
  text-align:center;
  align-items: middle;
}
.wrap2 span{

  text-align: center;
  line-height: 1em;
}

h3{
  margin:0px;
  padding: 2% 10% 1%;
  text-align: left;
  color: Navy;
}

#preview{
  background-color:Black;
  color:Grey;
  height: 100%;
}

#desIptBox{
  height: 20em;
}

::placeholder{
  color:Navy;
}

.wrap2 {
   margin: 0px;
   padding-left:4%;
   width: 95%;
   height: 95%;
   display: grid;
   grid-gap: 5%;
   grid-template-columns: 61% 31%;
   align-items: center;
  }

/*#guide{
  display:inline-block;
  background-color: Wheat;
  padding: 0px 10px 0px;
  border: 2px solid;
}*/
</style>
