function sockets(io, socket, data) {
  socket.emit('init', data.getUILabels());

  socket.on('pageLoaded', function (lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('switchLanguage', function(lang) {
    socket.emit('init', data.getUILabels(lang));
  });

//Lägg till d.img här
  socket.on('createPoll', function(d) {
    console.log("in data"+d.pollImg);
    socket.emit('pollCreated', data.createPoll(d.pollId, d.lang, d.pollDesc, d.pollImg, d.SONG));
    //här lägger vi till beskrivningen
  });

  socket.on('addQuestion', function(d) {
    data.addQuestion(d.pollId, {q: d.q, a: d.a, t: d.t}, d.questionNumber );
    socket.emit('dataUpdate', data.getAnswers(d.pollId));
    console.log("hej")
    console.log("här är"+d.questionNumber)
  });
  //används inte nu men ha kvar som inspo för framtiden :)
  /*socket.on('addDescription', function(d) {
    data.addDescription(d.pollId, d.pollDesc);
    socket.emit('dataUpdate', data.getDescription(d.pollId));
  });*/

  socket.on('joinPoll', function(pollId) {
    socket.join(pollId);
    socket.emit('newQuestion', data.getQuestion(pollId));
    socket.emit('dataUpdate', data.getAnswers(pollId));
    //HÄR TESTAR JAG. Skapa en socket.emit med getImg här
    socket.emit('description', data.getDescription(pollId));
    socket.emit('name', data.getName(pollId));
    socket.emit('imageAddress', data.getImage(pollId));
    socket.emit('musicSelection', data.getMusic(pollId));

  });

  socket.on('runQuestion', function(d) {
    io.to(d.pollId).emit('newQuestion', data.getQuestion(d.pollId, d.questionNumber));
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('submitAnswer', function(d) {
    data.submitAnswer(d.pollId, d.answer);
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('resetAll', () => {
    data = new Data();
    data.initializeData();
  })

}

module.exports = sockets;
