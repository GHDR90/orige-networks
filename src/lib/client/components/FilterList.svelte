<script>
    import { getContext } from "svelte";
    import { CONTEXT } from "$lib/utils/constants.js";
    import { stringContainsIgnoreCase } from "$lib/utils/helpers.js";

    let {
        facetOptions,
        type
    } = $props();

    let limit = $state(10);

    let filterSearchValue = $state('');
    let filterSearchActive = $derived(filterSearchValue !== '');

    let displayOptions = $derived.by(() => {
        let res = [];
        let options;

        if (filterSearchActive) {
            options = facetOptions.filter(f => stringContainsIgnoreCase(f.key, filterSearchValue));
        } else {
            options = facetOptions;
        }

        for (let i = 0; i < Math.min(options.length, limit); i++) {
            res.push(options[i]);
        }
        return res;
    });

    let queryState = getContext(CONTEXT.QUERY_STATE);

    function toggleFilter(key) {
        /** @type Filter */ let filter = {
            type,
            value: key
        }

        if (hasFilter(queryState.filters, filter)) {
            removeFilter(queryState.filters, filter);
            console.log('removing filter: ' + filter.value);
        } else {
            addFilter(queryState.filters, filter);
            console.log('adding filter: ' + filter.value);
        }


        // console.log($state.snapshot(queryState.filters));
    }

    /**
     * Function for adding filters to an array
     * @param {Filter[]} filters
     * @param {Filter} filter
     */
     function addFilter(filters, filter) {
        filters.push(filter);
    }

    /**
     * Function for removing filters from an array
     * @param {Filter[]} arr
     * @param {Filter} filter
     */
    function removeFilter(arr, filter) {
        if (hasFilter(arr, filter)) {
            let index = arr.findIndex(el => el.type === filter.type && el.value === filter.value);
            arr.splice(index, 1);
        }
    }

    /**
     * Whether the filter is in the array
     * @param {Filter[]} arr
     * @param {Filter} filter
     * @return {*}
     */
    function hasFilter(arr, filter) {
        return arr.some(el => {
            return el.type === filter.type && el.value === filter.value;
        });
    }

</script>

<div>
    <input type="text" id={`filter-${type}-text`} placeholder="Search..." bind:value={filterSearchValue}>
    <label for={`filter-${type}-text`} aria-hidden="true" class="support">Search</label>

    {#each displayOptions as opt (opt.key)}
        <div class="filter-element">
            <input
                    type="checkbox"
                    id={`${type}-${opt.key}`}
                    checked={queryState.filters.some(f => f.type === type && f.value === opt.key)}
                    onchange={() => {toggleFilter(opt.key)}}
            />
            <label for={`${type}-${opt.key}`}>{opt.key}</label>
            <span class="text-count small">{opt.count}</span>
        </div>
    {/each}
    {#if facetOptions.length > limit && !filterSearchActive}
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

    label.support {
        display: none;
    }
</style>