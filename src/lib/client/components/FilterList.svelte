<script>
    import { getContext } from "svelte";
    import { CONTEXT } from "$lib/utils/constants.js";
    import { addFilter, removeFilter } from "$lib/utils/helpers.js";

    let {
        facetOptions,
        type
    } = $props();

    let limit = $state(10);

    let displayOptions = $derived.by(() => {
        let res = [];
        for (let i = 0; i < Math.min(facetOptions.length, limit); i++) {
            res.push(facetOptions[i]);
        }
        return res;
    });

    let queryState = getContext(CONTEXT.QUERY_STATE);

    function toggleFilter(key) {
        /** @type Filter */ let filter = {
            type,
            value: key
        }
        // console.log('adding filter: ' + filter.value)

        addFilter(queryState.filters, filter);

        // console.log($state.snapshot(queryState.filters));
    }
</script>

<div>
        {#each displayOptions as opt}
            <div class="filter-element">
                <input type="checkbox" onchange={() => toggleFilter(opt.key)} />
                <span>{opt.key}</span>
                <span class="text-count small">{opt.count}</span>
            </div>
        {/each}
    {#if facetOptions.length > limit}
        <button onclick={() => {limit += 5}}>Show more options</button>
    {/if}
</div>

<style>
    .filter-element {
        display: flex;
        gap: 10px;
    }

    .text-count {
        margin-left: auto;
        font-style: oblique;
    }
</style>