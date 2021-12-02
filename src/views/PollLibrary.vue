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
        <input type="text" v-model="id">
      </label>
      <div class="buttonLink">
      <router-link v-bind:to="'/poll/+id'" tag="button"><br>
        <!--{{uiLabels.participatePoll}}-->
        <button> Participate in poll!</button> <!-- Här vill vi koppla till vårt json, hur gör vi? -->
      </router-link>
    </div>
    </div>


</template>

<script>
export default {
  name: 'Start',
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: "en"
    }
  },
}

</script>

<style>

#partPoll {
  width: 30%;
  display: grid;
  border: navy solid;
  background-color: wheat;
  color: navy;
  text-shadow: 2px 2px white;
  margin-left: 35%;
  font-size: 25pt;
}
#partPoll label {
  padding-top: 10%;

}

#partPoll button{
  width: 60%;
  height: 50%;
  background-color: #ffd11a;
  text-transform: uppercase;
  font-size: 13pt;
  color: navy;
  text-shadow: 1px 1px white;
}

#partPoll input {
  height: 50%;
  width: 50%;
  font-size: 20pt;
}

.buttonLink {
  padding-bottom: 15%;
}


.pollLabHeader {
  font-size: 30pt;
  text-align: center;
  padding-top: 5%;
  margin: 0;
  color: white;
  text-shadow: 3px 3px #990000;

}

h2 {
  margin: 5%;
  text-align: center;
  color: white;
  text-shadow: 2px 2px #990000;
  font-size: 25pt;

}

</style>
