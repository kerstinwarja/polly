<template>
  <!--{{pollId}}-->
  <Question v-bind:question="question"
            v-on:answer="submitAnswer"/>
  
</template>

<script>
// @ is an alias to /src
import Question from '@/components/Question.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Poll',
  components: {
    Question
  },
  data: function () {
    return {
      question: {
        q: "",
        a: []
      },
      pollId: "inactive poll"
    }
  },
  created: function () {
    //sockets, server, data, console.log osv
    this.pollId = this.$route.params.id
    //console.log("steg1")
    socket.emit('joinPoll', this.pollId)
    //console.log("steg2")
    socket.on("newQuestion", q =>
      this.question = q
    )
    
  },
  methods: {
    submitAnswer: function (answer) {
      socket.emit("submitAnswer", {pollId: this.pollId, answer: answer})
    }
  }
}
</script>
