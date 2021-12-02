<template>
  <body>
   <div id="partPoll">
            <label>
              Write poll id:
              <input type="text" v-model="id">
            </label>
            <router-link v-bind:to="'/poll/+id'" tag="button"><br>{{uiLabels.participatePoll}}hej</router-link>
            </div>
  </body>
</template>
<script>
  export default {
    name: 'PollLibrary',
    data: function () {
      return {
        uiLabels:{},
        id: "",
        lang: "en"
      }
    }
  }
</script>
<style>

  #partPoll{
    background-color: wheat;
    width: 30%
  }

</style>