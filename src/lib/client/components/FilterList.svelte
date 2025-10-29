<script>
    import { getContext } from "svelte";
    import { CONTEXT } from "$lib/utils/constants.js";
    import { stringContainsIgnoreCase } from "$lib/utils/helpers.js";
    import { slide } from "svelte/transition";

    let {
        facetOptions,
        type
    } = $props();

    /**
     * @typedef Filter
     * @prop {"work"|"doctrine"|"reference"} type
     * @prop {string} value
     */

    let filterSearchValue = $state('');
    let filterSearchActive = $derived(filterSearchValue !== '');

    /**
     * @type {{ key: string, count: number, isApplied: boolean }[]}
     */
    let displayOptions = $derived.by(() => {
        let res = [];
        let options;

        if (filterSearchActive) {
            options = facetOptions.filter(f => stringContainsIgnoreCase(f.key, filterSearchValue));
        } else {
            options = facetOptions;
        }

        for (let i = 0; i < options.length; i++) {
            options[i].isApplied = queryState.filters.some(f => f.type === type && f.value === options[i].key);
            res.push(options[i]);
        }
        return res;
    });

    let queryState = getContext(CONTEXT.QUERY_STATE);

    /**
     * Helper function that toggles filters
     * @param {string} key
     */
    function toggleFilter(key) {
        /** @type Filter */ let filter = {
            type,
            value: key
        }

        if (hasFilter(queryState.filters, filter)) {
            removeFilter(queryState.filters, filter);
        } else {
            addFilter(queryState.filters, filter);
        }
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
     * @return {boolean}
     */
    function hasFilter(arr, filter) {
        return arr.some(el => {
            return el.type === filter.type && el.value === filter.value;
        });
    }
</script>

<div transition:slide={{ axis: "y", duration: 150, delay: 0 }}>
    <input class="fill" type="text" id={`filter-${type}-text`} placeholder="Search..." bind:value={filterSearchValue}>
    <label for={`filter-${type}-text`} aria-hidden="true" class="support">Search</label>

    <div class="filter-options">
    {#each displayOptions as opt (opt.key)}
        <div class="filter-element">
            <input
                    type="checkbox"
                    id={`${type}-${opt.key}`}
                    checked={opt.isApplied}
                    onchange={() => {toggleFilter(opt.key)}}
            />
            <label for={`${type}-${opt.key}`}>{opt.key}</label>
            <span class="text-count small">{opt.count}</span>
        </div>
    {/each}
        <!--
    {#if facetOptions.length > limit && !filterSearchActive}
        <button class="fancy-button" onclick={() => {limit += 5}}>Show more options</button>
    {/if}
    -->
    </div>
</div>

<style>
    .filter-options {
        max-height: 10em;
        overflow: scroll;
    }

    .filter-element {
        display: flex;
        align-items: baseline;
        gap: 10px;
    }

    .filter-element > label {
        max-width: 80%;
    }

    .text-count {
        margin-left: auto;
        font-style: oblique;
    }

    label.support {
        display: none;
    }
</style>