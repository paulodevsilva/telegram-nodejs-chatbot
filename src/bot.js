const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_TOKEN;
const telegram = new TelegramBot(token, {polling: true});

const { assistant, createSession } = require('./watson');

telegram.on('polling_error', function(err) {
    console.log(err)
});

telegram.on('message', async (msg) => {
    var chatId = msg.chat.id;
    let sessionId = null
    let endConversation = false
    let context = {}
    
    // var nameUser = msg.from.first_name;
    console.log('message:', msg.text);
    console.log(msg)

     await createSession().then(session => sessionId = session)
    
    if(msg.photo)
        telegram.sendMessage(chatId, 'Não recebo imagens, ainda')
    

    assistant.message({
        assistantId: process.env.ASSISTANT_ID,
        sessionId: sessionId,
        input: {'text': msg.text,
            options: {
                return_context: true,
                debug: true
            }
        },
        context: {
            skills: {
                'main skill': {
                    user_defined: {
                        ...msg
                    }
                }
            }
        },
    }, function(err, response) {
        if(err) console.log('error', err);
        else {

            if(response.result.output.generic.length > 1){
                var labels = response.result.output.generic[1].options.map(e => e.label)       
                var text = response.result.output.generic[0].text
                var desc = response.result.output.generic[1].description
                
                output = `${text}\n\n${desc}\n\n${labels}`

                telegram.sendMessage(chatId, output)
                .catch(err => {
                  console.log(err)
                  telegram.onText(chatId, 'Não entendi')
                })

            } else {

            output = response.result.output.generic[0].text

            telegram.sendMessage(chatId, output)
            .catch(err => {
              console.log(err)
              telegram.onText(chatId, 'Não entendi')
            })

            }


        }
    })
  
  
});


// (err, res) => {
//     if(err) {
//         console.log('error:', err);
//     } else {
//         console.log('oi')
//         context = res.context;
//         telegram.sendMessage(chatId, );
//     }
    

// }

// telegram.onText(/\qual seu nome/, function(msg) {
//     var chatId = msg.chat.id;
//     var nameUser = msg.from.first_name;

//     telegram.sendMessage(chatId, `Bem vindo ao bot da Flux ${nameUser}`);
// });

