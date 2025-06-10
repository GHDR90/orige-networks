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
        <h2>{header}</h2>
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