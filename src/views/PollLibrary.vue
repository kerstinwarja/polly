<template>
  <header>
    <h1>{{uiLabels.participatePoll}}</h1>
    
  </header>
  <h2>{{uiLabels.onThisPage}}</h2>
  <h2>{{uiLabels.insertYourGroups}}</h2>
  <div id="partPoll">
    <label>
      {{uiLabels.nameInsert}}<br>
    </label>
    <select v-model="id" id="selectId">
      <option v-for="pollId in polls" v-bind:key="pollId" >{{pollId}}  </option>
    </select>
    <label>
      {{uiLabels.nickInsert}}<br>
      <input type="text" maxlength="17" v-model="myName">
    </label>
    <div class="buttonLink">
      <button v-on:click="startquiz">{{uiLabels.participatePoll}}!</button>
      <button v-on:click="hostQuiz">{{uiLabels.host}}</button>
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
      pollId:"",
      myName: "",
      isHost:false,
      polls:[]
    }
  },

  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      console.log(labels)
      this.uiLabels = labels
    })
    socket.emit("getPolls");
    socket.on("polls", (polls) => {
      this.polls=polls;
    });

  },
  methods:{
    startquiz: function() {
      this.pollId = this.id
      if(this.polls.indexOf(this.pollId)!=-1){
        if(this.myName != "" && this.myName!= undefined){
          socket.emit('sendNickname',{pollId:this.pollId, myName:this.myName});
          this.isHost= false
          this.$router.push({ name: 'StartQuiz', params: { id: this.pollId, lang: this.lang, isHost:this.isHost, myName: this.myName} })
        }
        else alert(this.uiLabels.alertNickname)
      }
      else alert(this.uiLabels.alertNoQuiz)
      
    },

    hostQuiz: function(){
      this.isHost= true;
      this.pollId = this.id

      if(this.polls.indexOf(this.pollId)!=-1){
        this.$router.push({ name: 'StartQuiz', params: { id: this.pollId, lang: this.lang, isHost: this.isHost} })
      }
      else{
        alert(this.uiLabels.alertNoQuiz)
      }

    }
  }
}

</script>

<style scoped>
header {
  font-size: 20pt;
  text-align: center;
  padding-top:0; /*5%*/
  color: white;
  text-shadow: -0.03em 0 #990000, 0 0.03em #990000, 0.07em 0 #990000, 0 -0.03em #990000;
}
h1{
  margin: 5% 0% 2% 0%;
}

h2 {
  margin: 0% 0% 2% 0%;
  text-align: center;
  color: white;
  text-shadow: -0.03em 0 #990000, 0 0.03em #990000, 0.07em 0 #990000, 0 -0.03em #990000;
  font-size: 18pt;
  line-break: auto;
}
#partPoll {
  width: 30%;
  height:auto;
  display: grid;
  border: #2d4463 solid;
  background-color: wheat;
  color: #2d4463;
  text-shadow: 0.1em 0.1em white;
  margin-left: 35%;
  font-size: 1.2em;
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
  font-size: 0.8em;
  color: #2d4463;
  text-shadow: 0.1em 0.1em white;
  margin-top: 3%;
}

#partPoll input {
  height: 50%;
  width: 50%;
  font-size: 1.2em;
  background-color: #fbf1e0;
  color: #2d4463;
  border: 0.1em #2d4463 solid;
  text-align:center;
  padding:0;
}
#selectId{
  height: 100%;
  width: 51%;
  font-size: 1.2em;
  background-color: #fbf1e0;
  color: navy;
  border: 0.1em navy solid;
  margin-left:25%;
  text-align:center;
  

}

.buttonLink {
  padding-bottom: 15%;
}

@media only screen and (max-width: 890px) {
  #partPoll{
    width:80%;
    margin-left:10%;
  }
}

</style>
