<template>
  <header>
    <h1>{{uiLabels.participatePoll}}</h1>
  </header>
  <h2>{{uiLabels.onThisPage}}</h2>
  <h2>{{uiLabels.insertYourGroups}}</h2>
  <div id="partPoll">
    <label>
      {{uiLabels.nameInsert}}<br>
      <input type="text" v-model="id"><br>
    </label>
    <label>
      {{uiLabels.nickInsert}}<br>
      <input type="text" maxlength="17" v-model="nickname">
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
      nameArray:[],
      nameTaken:false,
      nickname: ""
    }
  },

//behöver nog inte denna om alla får ha samma nickname
  watch:{
    id: function(thisId){
      if(thisId!=""){
            this.pollId = thisId
            socket.emit('getNickname',{pollId:this.pollId});
            socket.on("getName",participants => {
                  this.nameArray = participants
                });
            console.log("nameArray "+this.nameArray)
      }

    }
  },

  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      console.log(labels)
      this.uiLabels = labels
    })

    //markering
    //socket.emit('getNickname',{pollId:this.pollId});
    //socket.on("sendName",this.pollId)
    socket.on("getName",participants => {
          this.nameArray = participants
        })
  },
  methods:{
    startquiz: function() {
      if(this.nickname != "" && this.nickname!= undefined){
        this.myName = this.nickname
        //this.pollId = this.id
        //KAOS vi ska fixa
        for(let index in this.nameArray){
          console.log(this.nameArray[index])
          if(this.myName==this.nameArray[index]){
            alert("Nickname already exists")

          }
          else{
            this.nameTaken=true
          }
        }
        if(this.nameTaken==false){
          socket.emit('sendNickname',{pollId:this.pollId, myName:this.myName});
          this.isHost= false
          this.$router.push({ name: 'StartQuiz', params: { id: this.pollId, lang: this.lang, isHost:this.isHost} })
        }
      }
      else {
        alert("YOU NEED A NICKNAME")
      }
  },

    hostQuiz: function(){
      this.isHost= true;
      this.pollId = this.id
      socket.emit()
      this.$router.push({ name: 'StartQuiz', params: { id: this.pollId, lang: this.lang, isHost: this.isHost} })
    }
  }
}

</script>

<style>
header {
  font-size: 20pt;
  text-align: center;
  padding-top:0; /*5%*/
  color: white;
  text-shadow: -0.05em 0 #990000, 0 0.15em #990000, 0.15em 0 #990000, 0 -0.03em #990000;
}
h1{
  margin: 5% 0% 2% 0%;
}

h2 {
  margin: 0% 0% 5% 0%;
  text-align: center;
  color: white;
  text-shadow: -0.05em 0 #990000, 0 0.1em #990000, 0.1em 0 #990000, 0 -0.03em #990000;
  font-size: 18pt;
  line-break: auto;
}
#partPoll {
  width: 30%;
  height:auto;
  display: grid;
  border: navy solid;
  background-color: wheat;
  color: navy;
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
  color: navy;
  text-shadow: 0.1em 0.1em white;
  margin-top: 3%;
}

#partPoll input {
  height: 50%;
  width: 50%;
  font-size: 1.2em;
  background-color: #fbf1e0;
  color: navy;
  border: 0.1em navy solid;
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
