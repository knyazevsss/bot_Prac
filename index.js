const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')
const token = '5494091853:AAE6NMMNNeLMWmbHp8z14VCvZa58UmOcqz8'

const bot = new TelegramApi(token, {polling: true})

const chats = {}

}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId,`Сейчас я загадаю цифру от 0 до 9, а ты должен ее отгадать!`);
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадывай',gameOptions);
}


bot.setMyCommands([
    {command: '/start', description: 'Приветствие'},
    {command: '/info', description: 'Информация о пользователе'},
    {command: '/game', description: 'Игра угадай цифру'},
])

bot.on('message', async msg =>{
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === '/start') {
        await bot.sendSticker(chatId,`https://tlgrm.ru/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/1.webp`);
        return bot.sendMessage(chatId,`welcome`);
    }
    if (text === '/info') {
        return bot.sendMessage(chatId,`your name ${msg.from.username}`);
    }
    if (text === `/game`) {
        return startGame(chatId);
    }
    return bot.sendMessage(chatId,`???`);
})
bot.on(`callback_query`,msg =>{
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === '/again') {
        return startGame(chatId);
    }
    if (data == chats[chatId]) {
        return bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}`,againOptions);
    }
    else {
        return bot.sendMessage(chatId, `Увы, бот загадал цифру ${chats[chatId]}`,againOptions);
    }
})







