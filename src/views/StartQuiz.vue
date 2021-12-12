<template>
   <body>
      <div id="previewTitle">
        <h4> It's time to play</h4>
        <header>{{pollId}}</header>
      </div>
      <div id="wrap">
        <div id="description">
            <span id="pdes" style="background-color: black">{{pollDesc}}</span>
        </div>
        <div id="picture">
          <img v-bind:src="this.pollImg" style="height:100%;">
        </div>
      </div>
        <router-link v-bind:to="'/poll/'+ this.pollId">
          <button id="startButton">START QUIZ</button>
        </router-link>
    </body>
</template>
<script>
import io from 'socket.io-client';
const socket = io();
export default {
  name: 'StartQuiz',

  data: function () {

    return {
      lang: "",
      pollId: "",
      //pollName:""
      pollDesc:"",
      pollImg:"",
      //data: {},
      //uiLabels: {},
      //pollDes: [],
      //question: "",
      //answers: ["", ""],
      //questionNumber: 0,
       question: {
        q: "",
        a: []
      },
    }

  },
  created: function () {
    this.pollId = this.$route.params.id;


    //emittar join poll
    socket.emit('joinPoll',this.pollId)
    //lyssnar på frågor, kanske ta bort
    socket.on("newQuestion", q =>
      this.question = q
    )
    //lyssnar på description i socket.js i join poll
    socket.on("description", desc =>
      this.pollDesc = desc
    )

    socket.on("imageAddress", imag =>
      this.pollImg = imag
    )
    console.log("image"+this.pollImg)

    socket.on("createPoll", (data) =>
      this.data = data)
  },

}
</script>
<style scoped>

header{
  padding-top:0px;
  padding-bottom:5%;
}

#previewTitle{
  font-size: 30px;
  text-shadow: 3px 3px navy;
  color: white;
  height: 15%;
  line-break: auto;
  max-height: 15%;
}

#description{
  width: 50%;
  height: 70%;
  float: left;
  color: aliceblue;
  font-family: "Times New Roman";
  line-break: auto;
}
#picture{
  width: 40%;
  height: 70%;
  float: left;
  text-align: right;
  /*background-repeat: no-repeat;
  background-size: 100% 100%;*/
}

#startButton {
  height: 3em;
  width: 10%;
  background-color: rgb(100, 155, 36);
  margin: 2% 2%;
}

.wrap {
   margin: 0px;
   padding: 5% 0% 5% 8%;
   grid-gap: 4%;
   width: 80%;
   display: grid;
   grid-template-columns: 50% 50%;
   align-items: center;
  }

</style>
