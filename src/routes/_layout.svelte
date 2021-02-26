<script>
	import { onMount } from 'svelte';
	import { stores } from '@sapper/app'
	const { session } = stores()
	import Nav from '../components/Nav.svelte';

	export let segment;
  export let userToken;

	onMount(async () => {

		if (!$session.userToken) {
			const refresh = await fetch(`/api/refresh`, {
				method: 'POST',
				credentials: 'same-origin'
			});
			const { discoToken } = await refresh.json();
      userToken = discoToken;
			if (discoToken) {
				return session.set({ userToken: discoToken });
			}
			return;
		}

    userToken = $session.userToken;

		// refreshes token every 55 minutes to also sync with server-side.
		setInterval(async () => {
			const refresh = await fetch(`/api/refresh`, {
				method: 'POST',
				credentials: 'same-origin'
			});
			const { discoToken } = await refresh.json();
      userToken = discoToken;
			if (discoToken) {
				return session.set({ userToken: discoToken });
			}
			console.log('No user, timeout will be killed eventually');
		}, 1000 * 60 * 55);
	});
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>