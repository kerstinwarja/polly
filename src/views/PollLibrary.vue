<template>

  <header class="pollLabHeader">
    <h1>Participate in poll</h1>
  </header>


  <h2>
    On this page you can participate in a poll with your friends. <br>
    Insert your group's shared poll ID to participate in the poll.
  </h2>


    <div id="partPoll">
      <label>
        Insert poll ID: <br>
        <input type="text" v-model="id"><br>
      </label>
      <label>
        Insert nickname: <br>
        <input type="text" v-model="nickname">  <!-- skicka till servern hur? tar det senare-->
      </label>
      here{{this.nickname}}
      <div class="buttonLink">
        
         <!--<router-link  v-bind:to="/startquiz/+id" -->  tag="button"><br>
          <button v-on:click="startquiz">{{uiLabels.participatePoll}}!</button> <!-- Här vill vi koppla till vårt json, hur gör vi? -->
        <!-- </router-link> -->
      </div>
    </div>
    


</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'PollLibrary',
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: "",
      pollId: "",
      myName:""

    }
  },
  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      console.log(labels)
      this.uiLabels = labels
    })
    
  },
  methods:{
    startquiz: function() {
      if(this.nickname != "" && this.nickname!= undefined){
        this.myName = this.nickname
      this.pollId = this.id
      this.$router.push({ name: 'StartQuiz', params: { id: this.pollId} })
      }
      else {
        alert("YOU NEED A NICKNAME")
      }
  }
}
}

</script>

<style>
  
#partPoll {
  width: 30%;
  height:auto;
  display: grid;
  border: navy solid;
  background-color: wheat;
  color: navy;
  text-shadow: 2px 2px white;
  margin-left: 35%;
  font-size: 15pt;
  text-transform: uppercase;
  
}
#partPoll label {
  padding-top: 10%;

}

#partPoll button{
  width: 60%;
  height: 50%;
  background-color: #ffcc00;
  text-transform: uppercase;
  font-size: 13pt;
  color: navy;
  text-shadow: 1px 1px white;
}

#partPoll input {
  height: 50%;
  width: 50%;
  font-size: 20pt;
  background-color: #fbf1e0;
  color: navy;
  border: 2px navy solid;
}

.buttonLink {
  padding-bottom: 15%;
}


.pollLabHeader {
  font-size: 20pt;
  text-align: center;
  padding-top:0; /*5%*/
  margin: 0;
  color: white;
  text-shadow: 3px 3px #990000;

}

h2 {
  margin: 5%;
  text-align: center;
  color: white;
  text-shadow: 2px 2px #990000;
  font-size: 18pt;

}

</style>
