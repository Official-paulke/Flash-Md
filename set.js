const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0Q2eE9BRTFuTWFLL0hZUmh4K3RnU2VVajlIWmREeXlhSVV6eTc5d3RVRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0VaN3hkOUtMak0rdEJibG5KWUtJQ2R6RkNPNjhmYlpzM2kyaEcwNFBTOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnSFVrTlJTaHRBRGQyN0JrZ2lvZVpZYkRhMW4ySkxNQ2RaeGxBODBqYmxRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqTDBvQXptNXRtMnU1ZDVHNVRzR2F6Rk9ScTF4dStDeTlqUUhYeURwM0FJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlIdlFVWjdHZUZNdW5CaHF6cW5sdG1ZcjRVYlo4aHFyTkNoWUY0S3VsRms9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdTNUUrajdVbytxYUtsMVFyQWlsOU1kRkU5SE5jYm1NYUZ0Q2VwR0gyMmc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUJ0alptSzQ2aWJKb2llNFJxSkE4SDI2TFpVeHlOQmhHbjhubXBEditGbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZnBpTFp0bE1iZTFldi9BU0Vha0lnMlRNTlRHcndKZ0liak1QblZDcDFFMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkkrMTFhd1NBYlNXc3Vnalc0dXRTVDU5UUhNcTlLc1pWV0lIQ1pyYTJoRGhqMDJ0bkJxMzBlY3JieFBaeTJjK25oZlhacmFLY0hxSGVCMCtQRTg4bGdBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTkzLCJhZHZTZWNyZXRLZXkiOiJnc3RSNFdjODN3cktVYlBtOEt4cGdSTlZDVWx1b29YZEg4a0xJa1VZc3RzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDczNjUwODk1MkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI1N0YyNzY3MUMyRkNBMTNBRUY4QTUzODk1NDlFRUY1OSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIzNjI3MjI3fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3MzY1MDg5NTJAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRkRGMzQwNzRBMjUxQ0U5M0ZCNUVDNTk0RUYxQjFCRDIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMzYyNzIyOH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiclJfd3U5cEpRZlc4UXpvVEVndmp4QSIsInBob25lSWQiOiI2ZjQ2MzBhNy02Nzk1LTQxZDUtYjg5Ni0wYmM5ZjJkZjZjZTIiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYTg5dm9jcWRmS2ZmbEpiQ3U5SlRuS20yd2wwPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5sWmtNWmlPalJtTEE1VzRyc2hKTmFLNC9kWT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJHM0VOMzlHSyIsIm1lIjp7ImlkIjoiMjU0NzM2NTA4OTUyOjRAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiaXRzcGF1bEtlMjU0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNUGdoYWNFRU1ydDhiVUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJkR3luSjQ0NHVUM2xRU3NFTUhmRGh3SHZUdG5CY0Q0WEJpRS8wanAyWDNFPSIsImFjY291bnRTaWduYXR1cmUiOiJHVHNPWi92T1RLelJ2bnNUUC8wejNzUlc5SW1oRnlBRGZYb24rNFREWU5OV0dheFNMR2tyb1BDL2dzKzlQQjc5YVdyRmNRZjNkYkM2ZWhpUzVTdzRBdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiRHhMQ0Z3bEpWTFU2SVRZWEZlRS9URFZ5S2pTVVVqNWNoYm1xWXBMd1prZkRaalkxdVBBV28zQTFiVUdzSkw1UzVBRzVsZWJhOGlvMmltcXhWQTVoaEE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3MzY1MDg5NTI6NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYUnNweWVPT0xrOTVVRXJCREIzdzRjQjcwN1p3WEErRndZaFA5STZkbDl4In19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIzNjI3MjI0LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUNheiJ9',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "its_paul.ke",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "254729572565", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || 'recording',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
