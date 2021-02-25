// configuration
export const DISCORD_API_URL = 'http://discordapp.com/api';
export const DISCORD_CLIENT_ID = `YOUR_DISCORD_CLIENT_ID`; // client id from discord 
export const DISCORD_CLIENT_SECRET = `YOUR_DISCORD_CLIENT_SECRET`; // client secret token
export const DISCORD_REDIRECT_URI = `http://localhost:3000/api/callback`; // discord should have matching URI

// generate your endpoint url here: https://discord.com/developers/applications/DISCORD_CLIENT_ID/oauth2
// set redirect url as http://localhost:3000/api/callback for testing.
export const DISCORD_ENDPOINT = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(DISCORD_REDIRECT_URI)}&response_type=code&scope=identify%20email%20guilds`;

// utilities
export function getAvatarURL(userId, avatarId) {
  return `https://cdn.discordapp.com/avatars/${userId}/${avatarId}.png`
}