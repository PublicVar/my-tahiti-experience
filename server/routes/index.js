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
    let ctx = request.context;
    setContext(sessionId, ctx);
   
    return Promise.resolve();
  },
  // You should implement your custom actions here
  // See https://wit.ai/docs/quickstart
  getLocation(request){

    console.log('getLocation')
  }
};

/**
 * Chat bot object
 */
const WIT_KEY = process.env.WIT_KEY;
const wit = new Wit({
  accessToken: WIT_KEY,
  actions
});
let sessionId = uuidV4();

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
  let text = req.body.ask;
  let sessionId = new Date().getTime() + uuidV4();

  if (text) {
    wit.converse(sessionId,text, {}, true)
    .then((data) => {
      return res.status(200).json({message: data.msg, richMedia: data.entities.intent.value});
    })
    .catch((err) => {
        return res.status(500).json({message: 'Oops! Got an error from Wit: ' + err.stack || err});
      })

  } else {
    return res.json({message: 'Sorry, I did\'nt understand your question'});
  }
});

module.exports = router;