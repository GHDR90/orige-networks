<script>
    let {
        header,
        isCollapsible = true,
        startCollapsed = true,
        children
    } = $props();

    let isCollapsed = $state(startCollapsed);

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
        padding: 5px;
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

    .panel-header > h2 {
        margin: 0.5em;
    }

    .panel-content.collapsed {
        display: none;
    }
</style>