var express = require('express');
var router = express.Router();
const uuidV4 = require('uuid/v4');
const Wit = require('node-wit').Wit;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});


/**
 * Interactive action with chat bot
 */
const actions = {
  send(request, response) { 
    return Promise.resolve();
  },
  // You should implement your custom actions here
  // See https://wit.ai/docs/quickstart
};

/**
 * Chat bot object
 */
const WIT_KEY = process.env.WIT_KEY;
const wit = new Wit({
  accessToken: WIT_KEY,
  actions
});


// ------------------------------------------------------------
// Manage Context

const _store = {};

function getContext(sessionId) {
  return _store[sessionId] || {};
};

function setContext(sessionId, ctx) {
  _store[sessionId] = ctx;
};

/**
 * Ask question to chat bot
 */
router.post('/', function (req, res, next) {
  let sessionId = uuidV4();
  let text = req.body.ask;
  let sessionId = uuidV4();

  if (text) {
    wit.converse(sessionId,text, {})
    .then((data) => {
      return res.status(200).json({msg:data.msg, richMedia: data.entities.intent});
    })
    .catch((err) => {
        return res.status(500).send('Oops! Got an error from Wit: ' + err.stack || err);
      })

  } else {
    return res.send('Ask me something');
  }
});

module.exports = router;