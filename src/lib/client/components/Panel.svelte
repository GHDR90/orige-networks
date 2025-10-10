<script>
    let {
        header,
        isCollapsible = true,
        startCollapsed = true,
        children
    } = $props();

    let isCollapsed = $state(isCollapsible && startCollapsed);

    function toggleCollapse() {
        isCollapsed = !isCollapsed;
    }
</script>

<div class="panel">
    <div class="panel-header">
        {#if header.length > 0}
        <h2>{header}</h2>
        {/if}
        {#if isCollapsible}
            <button onclick={toggleCollapse}>{isCollapsed ? 'Show' : 'Hide'}</button>
        {/if}
    </div>
    <div
            class="panel-content"
            class:collapsed={isCollapsed}
    >
        {@render children()}
    </div>
</div>

<style>
    .panel {
        background-color: #eeeee4dd;
        border-radius: 5px;
        padding: 0.5em;
        border: 1px solid #21130d;
    }

    .panel-header {
        display: flex;
        align-items: baseline;
        gap: 1em;
    }

    .panel-header > * {
        margin-block: 0;
    }

    .panel-header > h2 {
        font-weight: normal;
        /* font-size: 0.8em; */
    }

    .panel-header > button {
        height: fit-content;
        justify-self: end;
        margin-left: auto;
    }

    .panel-content.collapsed {
        display: none;
    }
</style>