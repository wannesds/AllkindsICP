<script lang="ts">
	import { toNullableGender } from '$lib/utilities';
	import Spinner from '$lib/components/common/Spinner.svelte';
	import type {
		MatchingFilter,
		FriendlyUserMatch,
		Result
	} from 'src/declarations/backend/backend.did';
	import UserCard from '$lib/components/app/UserCard.svelte';
	import { getMatchedUser, matchedUser } from '$lib/stores/tasks/getMatchedUser';
	import ArrowLeft from '$lib/assets/icons/arrowLeft.svg?component';
	import Heart from '$lib/assets/icons/heart.svg?component';
	import Slider from '@bulatdashiev/svelte-slider';

	let pending: boolean = false;
	let resultWindow: Boolean = false;
	//age + cohes based on Slider plugin, see for more info

	let cohesionValue = [100, 100];
	let ageValue = [1, 120];
	let genderValue = 'Everyone';
	//let matches: Array<[User, BigInt]>;
	let match: FriendlyUserMatch;

	//this could be moved to some declaration/constant somewhere else
	let genders = ['Everyone', 'Male', 'Female', 'Other', 'Queer'];

	//TODO : DE-COMPONENT-IALIZE (only what cant be fixed with css classes), and extract the re-occuring CSS

	const handleFindMatches = async () => {
		resultWindow = false;
		pending = true;
		let filter: MatchingFilter = {
			cohesion: BigInt(cohesionValue[0]),
			ageRange: [BigInt(ageValue[0]), BigInt(ageValue[1])],
			gender: toNullableGender(genderValue == 'Everyone' ? '' : genderValue)
		};
		console.log('filter obj ready: ', filter);

		await getMatchedUser(filter).catch((err: Result) => {
			console.log('error while getting matchedUsers', err);
		});
		match = $matchedUser;
		console.log($matchedUser, match);
		pending = false;
		resultWindow = true;
	};
</script>

<div class="flex flex-col gap-4">
	<!-- border-main bg-sub30 -->
	{#if !resultWindow}
		<div class="w-[300px] md:w-[600px] py-4 mx-auto flex flex-col md:flex-row gap-2 justify-center">
			<div class="filter-box">
				<span class="filter-name">Age</span>
				<span class="mx-auto">{ageValue[0]} - {ageValue[1]}</span>
				<Slider max="120" step="1" bind:value={ageValue} range order />
			</div>

			<div class="filter-box">
				<span class="filter-name">Cohesion</span>
				<span class="mx-auto">{cohesionValue[0]}%</span>
				<Slider bind:value={cohesionValue} />
			</div>

			<div class="filter-box">
				<span class="filter-name">Gender</span>
				<div class="grid grid-cols-2 gap-2">
					{#each genders as gender}
						<button
							class="hover:bg-zinc-500 border-main first:col-span-2 "
							class:active={genderValue === gender}
							on:click={() => (genderValue = gender)}
						>
							{gender}
						</button>
					{/each}
				</div>
			</div>
		</div>

		<div class="fancy-btn-border mx-auto my-0">
			<button on:click={handleFindMatches} class="fancy-btn flex">
				{#if pending}
					<Spinner />
				{:else}
					Find a new connection
					<span class="flex ml-1">-10 <Heart class="w-4 h-4 mt-1" /></span>
				{/if}
			</button>
		</div>
	{:else}
		<div class="w-full sm:w-[600px] rounded-md flex flex-col gap-2 mx-auto">
			<button on:click={() => (resultWindow = false)}>
				<ArrowLeft class="w-12 hover-circle hover-color" />
			</button>

			{#if match}
				<UserCard {match} />
			{:else}
				<span class="text-slate-700 mx-auto">Oops, Something went wrong!</span>
			{/if}
		</div>
	{/if}
</div>
