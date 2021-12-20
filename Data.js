'use strict';

const languages = ["en", "se"];

// Store data in an object to keep the global namespace clean
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
//Lägg till en poll.img = pollImg
Data.prototype.createPoll = function(pollId, lang="en", pollDesc, pollImg, SONG) {
  if (typeof this.polls[pollId] === "undefined") {
    let poll = {};
    poll.lang = lang;
    poll.questions = [];
    poll.answers = [];
    //poll.pollName=pollName;
    poll.pollDesc=pollDesc;
    poll.pollImg=pollImg;
    poll.SONG=SONG;
    poll.currentQuestion = 0;
    //poll.questionNumber = 0;
    //poll.pollDes = [];
    this.polls[pollId] = poll;
    console.log("poll created", pollId, poll);
  }
  return this.polls[pollId];

}

Data.prototype.addQuestion = function(pollId, q, qId) {
  const poll = this.polls[pollId];
  console.log("question added to", pollId, q, qId);
  if (typeof poll !== 'undefined') {
    poll.questions.push(q);
    poll.questions.push(qId);
  }
}
//här testar jag

Data.prototype.getDescription = function(pollId) {
  const poll = this.polls[pollId];
  console.log("description requested for", pollId);
  if (typeof poll !== 'undefined') {

    return poll.pollDesc;
  }
  return ""
}
/*Data.prototype.getName = function(pollId) {
  const poll = this.polls[pollId];
  console.log("Name requested for", pollId);
  if (typeof poll !== 'undefined') {

    return poll.myName;
  }
  return ""
}
*/
//här slutar jag . Här lägger jag in en ny funktion

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


Data.prototype.getQuestion = function(pollId, questionNumber) {
  const poll = this.polls[pollId];
  console.log("question requested for ", pollId, questionNumber);
  if (typeof poll !== 'undefined') {
    if (questionNumber !== null) {
      console.log("qnr " + questionNumber)
      poll.currentQuestion = questionNumber;
      console.log("cQ " + poll.currentQuestion)
    }
    return poll.questions[poll.currentQuestion];
  }
  return []
}

Data.prototype.submitAnswer = function(pollId, answer) {
  const poll = this.polls[pollId];
  console.log("answer submitted for ", pollId, answer);
  if (typeof poll !== 'undefined') {
    let answers = poll.answers[poll.currentQuestion];
    if (typeof answers !== 'object') {
      answers = {};
      answers[answer] = 1;
      poll.answers.push(answers);
    }
    else if (typeof answers[answer] === 'undefined')
      answers[answer] = 1;
    else
      answers[answer] += 1
    console.log("answers looks like ", answers, typeof answers);
  }
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

module.exports = Data;
