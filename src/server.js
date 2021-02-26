import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';

import cookieParser from 'cookie-parser';
import { json } from 'body-parser';

import { DISCORD_API_URL } from './discord';

const fetch = require('node-fetch');
const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

express()
	.use(cookieParser())
	.use(json())
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: async (req, res) => {
				// If there's a JWT, check if it's valid
        const request = await fetch(`${DISCORD_API_URL}/users/@me`, {
          headers: { 'Authorization': `Bearer ${req.cookies['discoToken']}` }
        });

        // returns a discord user if JWT was valid
        let results = await request.json();

				if (results.id) {
					return { 
            userToken: req.cookies['discoToken'], // user token get's saved to session
            discordUser: results // discord user get's saved to session
         };
				}
				return { userToken: false, discordUser: {} };
			}
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
