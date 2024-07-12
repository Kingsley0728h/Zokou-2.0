const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID ||'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUxEaExQUWNLclBSZlA1MFF6QnppTmxVTTBnZmliUWhhRDNUVjFkR0cybz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMTgweklvYTkzTkR1ZzdNUi9LMVlxclBwdldUYU82Nk9RcnU0RllhZGZqUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrQVVmazdYbE1ZK1NvWlM4aS90eFNzUEJ0TFN1TWV5dWJSbU4zQXZLREZFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwNkJWb3cyZXAxR1dRaFMzUkZrNXFDS2p6ZnZkY1dFSmdvUnRudFJ6NVJRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlJc2hYdGg3SmVEQjE2ZDRONkltdzlEMlhWRzZDRkNCVHg3YzEwb1ZvMnc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllVWGYwbEZmZThDMUxXYlBTQlRHdjNuK0dlVkpCNEIxS2xScmo1bURnbEU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0ZsTUpEaHVMS1FoTnMvTVpJRDJYN00zNklrVzU0MEdXM2Q2R3ZVamtFST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSEZoK0pBMkpsZElGL0VkNGxoNFRmU2NTc3YzUUU4emFqQWR0ZjZ3bkJDST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkF3cGRiUERNMUY0WUp1bURSbGtETGxYM3hWaFY3NTczWE9pcCs3Q0k5Q0tycm45ZVNvUXVIa3BTVU94dlJ3M2pQVGEwdTg3Q1VLMFczbUxKdm5WSkNRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjA5LCJhZHZTZWNyZXRLZXkiOiJpNWl3K0F4TWJqeWE0TjlBS3R6OGxHOVprcllpdnowRWpleTk5OWNWNVZ3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJmd1ZIeDc3V1M0Q3Y3ZjNjbzh1SFpRIiwicGhvbmVJZCI6ImM5Yzk0YmNlLTJhODQtNDhmMy1iYTEzLWMxOTc1ZGRhNzlkNCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhTHYzdVdHYmRuV2JJcGRDWDFGNmVEbWVtUlE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid043M0Z2Ukg2aFYzbm5Qck9hOWZuZE5kY2dJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlJOSFMxQ0syIiwibGFzdFByb3BIYXNoIjoiMXloSVJBIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQTBJQWc9PSJ9LCJtZSI6eyJpZCI6IjI0MTA0NTUyNjUzOjQxQHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTEyMzk5ODE0MjkxNzAzOjQxQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSVBLN1pnR0VQQ0d4YlFHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoibC80d0NxUFdvcFBBT0RoTzdIcXFZZ3JzaFI1dnQxVU0xZkxaMGt1S21Rbz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiMEVZMFMxeXp2cEFRWTYyT2lVQksxV2dCcG5FZXR5cmpZWVA4bEYySmVwRXd1MWFiS0JDQVJaL2RIelZPWUUxc1V0Nk1nUU5ZZGtPc3FHaWdQd3NSRFE9PSIsImRldmljZVNpZ25hdHVyZSI6IkdtMW1iTjc1RFRFRkorT3VXNXBkZjVRYTBBdWFOL3Zyd3dmT1NtUWF1NHhJdkx3SHRsTElsN1NSNGhXb285OE8vMkQ4dUFCQnBicXpDQnEwQm1BTkFBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjQxMDQ1NTI2NTM6NDFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWmYrTUFxajFxS1R3RGc0VHV4NnFtSUs3SVVlYjdkVkROWHkyZEpMaXBrSyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMDc5NjAyMCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFEV0YifQ==',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "Zokou-Md",
    NUMERO_OWNER : process.env.NUMERO_OWNER,              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "oui",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'oui',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'Zokou_MD',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
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
