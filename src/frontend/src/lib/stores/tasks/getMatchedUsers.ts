import { actor } from '$lib/stores';
import type { MatchingFilter, UserMatch } from 'src/declarations/backend/backend.did';
import { get, writable } from 'svelte/store';

//export const matchedUsers = writable<Array<[User, BigInt]>>();
export const matchedUsers = writable<Array<UserMatch>>();

export async function getMatchedUsers(filter: MatchingFilter) {
	const localActor = get(actor);

	return await localActor.findMatches(filter).then((res) => {
		console.log('matched users: ', res.ok);
		console.log(res);
		if (res.ok) {
			matchedUsers.set(res.ok);
		}
	});
}
