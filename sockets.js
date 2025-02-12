function sockets(io, socket, data) {
  socket.emit('init', data.getUILabels());

  socket.on('pageLoaded', function (lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('switchLanguage', function(lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('createPoll', function(d) {
    socket.emit('pollCreated', data.createPoll(d.pollId, d.lang, d.pollDesc, d.pollImg, d.SONG));
  });

  socket.on('addQuestion', function(d) {
    data.addQuestion(d.pollId, {q: d.q, a: d.a, t: d.t, questionNumber: d.questionNumber, questionImg: d.questionImg, isCorrect: d.isCorrect, allQuestions: d.allQuestions});
    socket.emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('joinPoll', function(pollId) {
    socket.join(pollId);
    socket.emit('newQuestion', data.getQuestion(pollId));
    socket.emit('dataUpdate', data.getAnswers(pollId));
    socket.emit('description', data.getDescription(pollId));
    socket.emit('imageAddress', data.getImage(pollId));
    socket.emit('musicSelection', data.getMusic(pollId));
  });

  socket.on('runQuestion', function(d) {
    io.to(d.pollId).emit('newQuestion', data.getQuestion(d.pollId, d.questionNumber));
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('startQuiz', function(d) {
    io.to(d.pollId).emit('sendToPoll')
  });

  socket.on('showCorrectAnswer', function(d) {
    io.to(d.pollId).emit('showCorrect')
  });

  socket.on('goToResult', function(d) {
    io.to(d.pollId).emit('sendToResult')
  });

  socket.on('goBackToQues', function(d) {
    io.to(d.pollId).emit('sendToQues')
  });

  socket.on('goToStart', function(d) {
    io.to(d.pollId).emit('sendToStart')
  });

  socket.on('sendNickname', function(d) {
    io.to(d.pollId).emit('sendName',data.addName(d.pollId,d.myName));
  });

  socket.on('clearNickname', function(d) {
    io.to(d.pollId).emit('sendName2',data.clearName(d.pollId));
  });

  socket.on('getNickname', function(d) {
    io.to(d.pollId).emit('getName',data.getName(d.pollId));
  });

  socket.on('submitAnswer', function(d) {
    data.submitAnswer(d.pollId, d.myPoints, d.myName);
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('clearAnswer', function(d) {
    io.to(d.pollId).emit('sendName3', data.clearAnswers(d.pollId));
  });
  
  socket.on('getPolls',function(){
    socket.emit('polls', data.getPolls());
  });

  socket.on('resetAll', () => {
    data = new Data();
    data.initializeData();
  })
}

module.exports = sockets;
