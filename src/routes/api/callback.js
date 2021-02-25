const fetch = require('node-fetch');

import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_REDIRECT_URI } from '../../discord';

export async function get(req, res) {
  let accessCode = await req.query.code;

  const data = {
    client_id: DISCORD_CLIENT_ID,
    client_secret: DISCORD_CLIENT_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: DISCORD_REDIRECT_URI,
    code: accessCode,
    scope: 'identify email guilds'
  };

  const request = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    body: new URLSearchParams(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  let response =  await request.json();

  if (response.error) {
    res.redirect('/')
    return;
  }

  // store tokens in cookies
  const access_token = response.access_token;
  const refresh_token = response.refresh_token;
  const access_token_expires = new Date(Date.now() + response.expires_in * 1000);
  const refresh_token_expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const cookie_options = { httpOnly: true, secure: false, sameSite: 'strict' };

  res.cookie('discoToken', access_token, { expries: access_token_expires, ...cookie_options });
  res.cookie('discoRefresh', refresh_token, { expries: refresh_token_expires, ...cookie_options });

  // redirect to dashboard
  res.redirect('/dashboard');
}