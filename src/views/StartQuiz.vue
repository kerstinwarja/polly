<template>
   <body>
        <div id="preview">
            <div id="previewTitle">
                <p id="as">{{this.pollId}}</p>
            </div>
            <div id="previewDesc">
                <span id="pdes" style="background-color: black">Preview desc</span>
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
      uiLabels: {},
      pollId: "",
      lang: "en"
    }
  },
  created: function () {
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  },
  methods: {
    created: function () {
      this.lang = this.$route.params.lang;
      socket.emit("pageLoaded", this.lang);
      socket.on("init", (labels) => {
        console.log(labels)
        this.uiLabels = labels
      })
      console.log(this.pollId)
    },
    }
  }

</script>

<style>
header {
  font-size: 20pt;
  text-shadow: 3px 3px navy;
}


h3{
  margin:0px;
  padding: 2% 10% 1%;
  text-align: left;
  color: Navy;
}

#previewTitle{
  font-size: 30px;
  text-shadow: 3px 3px navy;
  color: white;
  height: 15%;
  line-break: auto;
  max-height: 15%;
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
