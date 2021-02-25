const fetch = require('node-fetch');
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_REDIRECT_URI } from '../../discord';

export async function post(req, res) {
	if (req.method == 'POST' && req.cookies['discoToken']) {
		let refresh_token = req.cookies['discoRefresh'];

    const data = {
      client_id: DISCORD_CLIENT_ID,
      client_secret: DISCORD_CLIENT_SECRET,
      grant_type: 'refresh_token',
      redirect_uri: DISCORD_REDIRECT_URI,
      refresh_token: refresh_token,
      scope: 'identify email guilds'
    };

	  const request = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      body: new URLSearchParams(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    let response = await request.json();

		if (response.error) {
			console.log('Error refreshing token: ', response.error);

      res.clearCookie('discoToken');
      res.clearCookie('discoRefresh');
      
			return res.end(JSON.stringify({ discoToken: false }));
		}

		if (response) {
			const access_token_expires = new Date(Date.now() + response.expires_in);
			const refresh_token_expires = new Date(Date.now() + response.expires_in);
			const cookie_options = { httpOnly: true, secure: false, sameSite: 'strict' };

			res.cookie('discoToken', response.access_token, { expires: access_token_expires, ...cookie_options });
			res.cookie('discoRefresh', response.refresh_token, { expires: refresh_token_expires, path: '/api/refresh', ...cookie_options });

			return res.end(JSON.stringify({ discoToken: response.access_token }));
		}

		return res.end(JSON.stringify({ discoToken: false }));
	}
}
