<script lang="ts">
	import UserBanner from '$lib/components/app/UserBanner.svelte';
	import CustomTabs from '$lib/components/common/CustomTabs.svelte';
	import {
		getFriends,
		friendsApproved,
		friendsWaiting,
		friendsRequested
	} from '$lib/stores/tasks/getFriends';
	import type { FriendlyUserMatch } from 'src/declarations/backend/backend.did';
	import { onMount } from 'svelte';

	const handleFindFriends = async () => {
		await getFriends().catch((error) => {
			console.log('error while getting friends', error);
		});
	};

	let lists: Array<{ arr: Array<any>; title: String }> = [
		{
			arr: $friendsApproved,
			title: 'My Friends'
		},
		{
			arr: $friendsWaiting,
			title: 'Requests'
		},
		{
			arr: $friendsRequested,
			title: 'Send'
		}
	];

	onMount(() => {
		handleFindFriends();
	});
</script>

<CustomTabs {lists}>
	<svelte:fragment slot="item" let:item>
		<UserBanner match={item} />
	</svelte:fragment>
</CustomTabs>
