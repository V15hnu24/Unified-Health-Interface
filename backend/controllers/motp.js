var springedge = require('springedge');

var params = {
  'apikey': '6on957rb36978j0rl148a6j226v03jmr', // API Key 
  'sender': 'Vishnu from data management services', // Sender Name 
  'to': [
    '917995305622'  //Moblie Number 
  ],
  'message': 'test+message'
};

springedge.messages.send(params, 5000, function (err, response) {
  if (err) {
    return console.log(err);
  }
  console.log(response);
});