const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new AssistantV2({
    version: process.env.ASSISTANT_VERSION,
    authenticator: new IamAuthenticator({ apikey: process.env.ASSISTANT_API_KEY }),
    url: process.env.ASSISTANT_URL,
    disableSslVerification: true,
    headers: {
      'X-Watson-Learning-Opt-Out' : true
    }
});



function createSession() {
  return new Promise((resolve, reject) => {
    assistant.createSession({
      assistantId: process.env.ASSISTANT_ID
    }, (err, response) => {
      if(err) return reject(err)
      else {
        resolve(response.result.session_id)
      }
    })
  })
}

createSession()


// assistant.createSession({
//     assistantId: process.env.ASSISTANT_ID
//   }, function(err, response) {
//       if(err) console.log('error', err);
//       else {
//         console.log(response.result.session_id)
//         return  sessionId = response.result.session_id
//       }
//   });
   

module.exports = {
  assistant,
  createSession }