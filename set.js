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
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUZwQ25adU5hSWdPd0hRS2lUMVZHVzBiZmNXRFllR3lSbXdaU3QzQ1lrcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL2xrRXhSVkRqdmNMZHBad2cxTEc5T0xLRHByekw0Z3kydGZESTErdDBIcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyTGFZZXpuUnk3ZDJuRkVJeVBBRHpjbkxubWRPSHAza3pmWVlRQUZQbTBVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLaFVsSmh5L092RzVoRi94K2tSNDRQSThXUnJ1TUJkdUMyZ1lXaTB2TlhVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdDQkE0VitNRFNFeWY4cHgvQXg0TVJ3QndyQ2E2UzhCYUVhSW52Q29wbGc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlcrU3ZrZGlqZENRUGVaejNzbEtzUUYxS0Qvd2ZONHJDMmhJemFSQVdkbjA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWURhK21wQ3V2RE5BQUhiN3JDNTh2UGFMdnN2eHQrQXhycjVtank0WnEzOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSXZKRFIwdW4xcW9aaFlacTNkdVhuUi81bWxtWFhheXdyU2lXbjc4dmZ4Zz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImQ1T2UwNHVEbUhVSHhTS1d5Vk91ZmFmb3pjL2k1ZThodkRtdk1TVVE3NjNxelFEdlVNdlZONlE3d1pwZ3J5N0h0dnErVEp5Q2dXYWkxc1FkVk5PSmh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQzLCJhZHZTZWNyZXRLZXkiOiI0a0VSakxsV0JQd1ZKY0RzaVpLWC9aR1QxNUlySGtFcFNBMUNPOUNLNkhNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJkZXFfWWFhMlN5YUFZRUI3VFF3ZkVRIiwicGhvbmVJZCI6IjBhNzVkMDdlLTUzZjAtNGRkOS1hM2VjLTkzZTYyZjQzZGRkOCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4V3pPOEFTNG96UXdPMWFvaXdTN1pFbDYxcVk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicjJ3YTBWd2FHcFNyRm9CaEd5TkVmQkdnZzVJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkxCRk1BOTI2IiwibWUiOnsiaWQiOiIyMzI3NDQ0ODEzMDozMUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJNciBUYWtlIFRlZSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTWVEb2RNREVPV3psN29HR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiT1hqL0tEc0hPYlA4MmpnRElmYkRsSFFxRjBWcVBKZHNRUjhrT3V6R0lRQT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiYmlQcFN4cDRDbERtQnplYlc3SnZDdzd1Vk9uUXY4MHRJU1gwWDR3dEt5T3h1UmtjampPcUJrUExJMWZCZCtrL09LY1ZEVGxpbi9CcVl5TE43ZDlKQ1E9PSIsImRldmljZVNpZ25hdHVyZSI6IjhTejFYSmE1ck1vZm5OZHRvTEMybVFDbUwrSFo0M0xUZ0VDcmZ5b2Z6SnpSU0VpWkJRZHdOVkEyalBjZEdWT2wwSDRKc3JieXA2NHVMbGUrWjNVdWdBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjMyNzQ0NDgxMzA6MzFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVGw0L3lnN0J6bXovTm80QXlIMnc1UjBLaGRGYWp5WGJFRWZKRHJzeGlFQSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMjYzMTAyNn0=',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || " Mr Take Tee",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "23274448130",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "on",
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
