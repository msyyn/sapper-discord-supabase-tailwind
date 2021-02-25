<script context="module">
	export async function preload(page, session) {
		let { userToken, discordUser } = session;
		if (!userToken) return this.redirect(302, '/api/auth'); // force user to auth if they have no access token.
    return { discordUser };
	}
</script>

<script>
  import { getAvatarURL } from '../discord';
  export let discordUser;
  console.log(discordUser)


  async function signOut() {
    const authAPI = await fetch('/api/signout', {
      method: 'POST',
      credentials: 'same-origin',
    });
    const { success } = await authAPI.json();
    if (success) {
      window.location.href = '/';
    }
  }
</script>

<img alt="{discordUser.userName}#{discordUser.discriminator} avatar" src="{getAvatarURL(discordUser.id, discordUser.avatar)}">
<h1>{discordUser.username}#{discordUser.discriminator}</h1>
<h2>{discordUser.email}</h2>
<button on:click={signOut}>Sign out</button>

<style>
	* {
		margin: 0 auto;
	}

	h1 {
		margin-top: 0.5em;
		font-size: 2.8em;
		font-weight: 700;
		text-align: center;
		text-transform: uppercase;
	}

  h2 {
    text-align: center;
    font-size: 2em;
    margin-bottom: 0.5em;
  }

	button {
		width: 100%;
		margin-top: 1em;
		padding: 0.5em;
		border-radius: 0.25em;
		border: 2px rgb(255,62,0) solid;
		background-color: rgba(255,62,0,0.1);
		color: rgb(255,62,0);
		font-size: medium;
		transition: background-color 0.1s ease-in-out;
	}

	button:hover {
		background-color: rgba(255,62,0,0.2);
		cursor: pointer;
	}
</style>