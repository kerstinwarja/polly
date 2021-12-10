<template>
   <body>   
        <div id="preview">
            <div id="previewTitle">
                <p id="as">{{pollId}}</p>
            </div>
            <div id="previewDesc">
                <span id="pdes" style="background-color: black">INFO:{{pollDesc}}</span>
            </div>
            <div id="previewPic">
            </div>
        </div>
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

    socket.on("createPoll", (data) =>
      this.data = data)

  },
  
   
  
  
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
h3{
  margin:0px;
  padding: 2% 10% 1%;
  text-align: left;
  color: Navy;
}
#preview{
  background-image: url(https://png.pngtree.com/thumb_back/fw800/background/20200916/pngtree-circus-background-image_398762.jpg);
  background-size: cover;
  max-height: 100%;
  background-position: bottom;
  color: Grey;
  height: 100%;
  border: 5px black solid;
}
#previewTitle{
  font-size: 30px;
  text-shadow: 3px 3px navy;
  color: white;
  height: 15%;
  line-break: auto;
  max-height: 15%;
}
#as{
  margin: 10px 0px 0px;
}
#previewDesc{
  width: 40%;
  height: 70%;
  float: left;
  color: aliceblue;
  font-family: "Times New Roman";
  line-break: auto;
}
#previewPic{
  width: 50%;
  height: 70%;
  float: left;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
#desIptBox{
  height: 20em;
}
::placeholder{
  color:Navy;
}
#updatePre{
  width: 84%;
  background-color: rgb(135, 175, 111);
  margin-bottom: 4%;
}
.wrap2 {
   margin: 0px;
   padding-left: 4%;
   width: 95%;
   height: 95%;
   display: grid;
   grid-gap: 5%;
   grid-template-columns: 61% 31%;
   align-items: center;
  }
.wrap3 {
   margin: 0px;
   padding: 5% 0% 5% 8%;
   grid-gap: 4%;
   width: 80%;
   display: grid;
   grid-template-columns: 50% 50%;
   align-items: center;
  }
.wrap2 button{
  background-color: wheat;
  text-transform: uppercase;
  padding-bottom: 1%;
  font-size:80%;
}
</style>