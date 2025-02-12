'use strict';

const languages = ["en", "se"];

function Data() {
  this.polls = {};
}

/***********************************************
 For performance reasons, methods are added to the
 prototype of the Data object/class
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
 ***********************************************/

Data.prototype.getUILabels = function (lang = "en") {
  const ui = require("./data/labels-" + lang + ".json");
  return ui;
}
Data.prototype.createPoll = function(pollId, lang="en", pollDesc, pollImg, SONG) {
  if (typeof this.polls[pollId] === "undefined") {
    let poll = {};
    poll.lang = lang;
    poll.questions = [];
    poll.answers = [];
    poll.pollDesc=pollDesc;
    poll.pollImg=pollImg;
    poll.SONG=SONG;
    poll.currentQuestion = 0;
    poll.participants=[];
    this.polls[pollId] = poll;
    console.log("poll created", pollId, poll);
  }
  return this.polls[pollId];
}
Data.prototype.addQuestion = function(pollId, q) {
  const poll = this.polls[pollId];
  console.log("question added to", pollId, q);
  if (typeof poll !== 'undefined') {
    poll.questions.push(q);
  }
}
Data.prototype.getDescription = function(pollId) {
  const poll = this.polls[pollId];
  console.log("description requested for", pollId);
  if (typeof poll !== 'undefined') {
    return poll.pollDesc;
  }
  return ""
}
Data.prototype.getName = function(pollId) {
  const poll = this.polls[pollId];
  console.log("participants requested for", pollId,);
  if (typeof poll !== 'undefined') {
    console.log("The participants: "+poll.participants)
    return poll.participants
  }
  return []
}
Data.prototype.addName=function(pollId,myName){
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.participants.push(myName)
    console.log("participant added to ",pollId,myName)
  }
}
Data.prototype.clearName=function(pollId){
  const poll = this.polls[pollId];
    poll.participants = [];
}
Data.prototype.getImage = function(pollId) {
  const poll = this.polls[pollId];
  console.log("image requested for", pollId);
  if (typeof poll !== 'undefined') {
    return poll.pollImg;
  }
  return ""
}
Data.prototype.getMusic = function(pollId) {
  const poll = this.polls[pollId];
  console.log("music requested for", pollId);
  if (typeof poll !== 'undefined') {
    return poll.SONG;
  }
  return ""
}
Data.prototype.getQuestion = function(pollId, questionNumber=null) {
  const poll = this.polls[pollId];
  console.log("question requested for ", pollId, questionNumber);
  if (typeof poll !== 'undefined') {
    if (questionNumber !== null) {
      poll.currentQuestion = questionNumber;
    }
    return poll.questions[poll.currentQuestion];
  }
  return []
}
Data.prototype.submitAnswer = function(pollId, myPoints, myName) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    let answers = poll.answers[poll.currentQuestion];
    if (typeof answers !== 'object') {
      answers = {};
      answers[myName] = myPoints;
      poll.answers.push(answers);
    }
    else if (typeof answers[myName] === 'undefined')
      answers[myName] = myPoints;
  }
}
Data.prototype.clearAnswers = function(pollId) {
  const poll = this.polls[pollId];
  poll.answers = [];
}
Data.prototype.getAnswers = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    const answers = poll.answers[poll.currentQuestion];
    if (typeof poll.questions[poll.currentQuestion] !== 'undefined') {
      return {q: poll.questions[poll.currentQuestion].q, a: answers};
    }
  }
  return {}
}
Data.prototype.getPolls=function(){
  return Object.keys(this.polls)
}
module.exports = Data;
