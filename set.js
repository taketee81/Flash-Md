const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUxic3R5bHRxcmMvY2p0NFJIbFBRMUZ0alNUZGxRa21JMlJRMklQOE1Iaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTXRaZFJiMkNzY1I0VnRKc3Z5R0FoaSt5SE8xTlRjRGRQdWx2cVA5dmkzRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1SzE5Q0QvMVpWSHJaaWdZYWM1Wm9OTkdXUW1ZeGhzZUMvc2xML3luazBRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrWjl0eXlnaHlSbjVVY3ZVMm9tNUFZWVpORys4Si9uR0JqSk9BeDUwS1dzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVGWkdiWFEwQndWZGlSK2lHNnFLWXRydG1mVlVvK0VOOU1PM3N4VmR2MDQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRvY3JvaVN2dmdXYzNaMTRZKzVQWG5BYjN5cXZlK2ZuOHJocXgvdUo3VUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUtoL3NjUmNrRlpFMk5ZbUg0MldsdGlORjFXUDd4cHM4WkxvM2RUQTdGaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQXZOaFcrZDkvTmpuTkVCOHpLcnhNZC9CVG1rMkFYYUE3eTJpSlVGaG95dz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhCUTBTZDU2eU5yRFdHNFBPeXBYSE0yREV3MUhJd0lZbjZGN3g5ZXpreG9FNk1xU2FiN05FcDFzQ1V0Umt2cERpeGg5Mm8zc0ZSdzFJNHFPYTlobWd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjUsImFkdlNlY3JldEtleSI6Ik85TVFjcW1ibTF4Mit3SVhZb3ZFdW1YM1kvTUI5aWs5RmNhbWpTNWZxT1E9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImV5S05tMVRrUi15ajQ5WU10T212ZEEiLCJwaG9uZUlkIjoiYTM5MThmNmQtMWEyNi00MDBiLTg5YjctOTMyNjIxNmIzNDc4IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImcrR21hUzBKei96YzkzZzgzSWJLK1pVcXJhMD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvcDc3UWRMTS8wMkdzU05XcE9PVzEwYnYrK2s9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWUpXUzhCWE0iLCJtZSI6eyJpZCI6IjIzMjc0NDQ4MTMwOjUwQHMud2hhdHNhcHAubmV0IiwibmFtZSI6Ik1yIFRha2UgVGVlIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNdURvZE1ERVAvbW9yMEdHQVlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJPWGovS0RzSE9iUDgyamdESWZiRGxIUXFGMFZxUEpkc1FSOGtPdXpHSVFBPSIsImFjY291bnRTaWduYXR1cmUiOiI5U3hwWkFEeGpuV0VMSityZk5BQW80a2JoNHlmMDdsOGY0dGxUaGtWRUY0SmtTZHA5V05HT25VR013a2hIQ0I4VjJGeUFxdUZFT0dldTFsb3pnRHNDZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiTlppZFdPeGtLZ2pkL0V3d1BWTEpxeXhMUEJyb25TZ01KMitTY0ZVbjFEKzltays0RG5iakI0T2pjbGNmek9lODRFUjd2S1hGR2JBRzRJbXFIaERJaVE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzI3NDQ0ODEzMDo1MEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUbDQveWc3Qnptei9ObzRBeUgydzVSMEtoZEZhanlYYkVFZkpEcnN4aUVBIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM5MTA5MjYwLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQVByUyJ9',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "Take Tee",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "23274448130",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
