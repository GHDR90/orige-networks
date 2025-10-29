<script>
    import { getContext } from "svelte";
    import { CONTEXT } from "$lib/utils/constants.js";

    let {
        header,
        isCollapsible = true,
        startCollapsed = true,
        isFilterPanel = false,
        filterOptions = {},
        children
    } = $props();

    let queryState = getContext(CONTEXT.QUERY_STATE);

    let isCollapsed = $state(isCollapsible && startCollapsed);

    function toggleCollapse() {
        isCollapsed = !isCollapsed;
    }

    function getIDForPanel(str) {
        return str.split(" ")[0].toLowerCase();
    }

    const titleTextAny = "Match any of the selected filters in the list";
    const titleTextAll = "Match all selected filters in the list";

</script>

<div class="panel">
    <div class="panel-header">
        {#if header.length > 0}
        <h2>{header}</h2>
        {/if}
        {#if isFilterPanel && filterOptions.filterModes.length > 0}
            <div class="radio-mode-container">
            {#each filterOptions.filterModes as mode}
                <div>
                    <label for="radio-{mode}-{filterOptions.filterType}">{mode}</label>
                    <input
                            disabled={!filterOptions.filterModes.some(m => m === mode)}
                            title={mode === 'any' ? titleTextAny : titleTextAll}
                            value={mode}
                            bind:group={queryState.filterModes[filterOptions.filterType]}
                            type="radio"
                            id="radio-{mode}-{filterOptions.filterType}"
                            name="any-all-{filterOptions.filterType}"
                    />
                </div>
            {/each}
            </div>
        {/if}
        {#if isCollapsible}
            <button
                    class="fancy-button"
                    onclick={toggleCollapse}>{isCollapsed ? 'Show' : 'Hide'}
            </button>
        {/if}
    </div>
    <div class="panel-content">
        {#if !isCollapsed}
            {@render children()}
        {/if}

    </div>
</div>