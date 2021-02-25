import { DISCORD_ENDPOINT } from '../../discord';

export async function get(req, res) {
  // redirect to our discord URL endpoint
  res.redirect(DISCORD_ENDPOINT)
}