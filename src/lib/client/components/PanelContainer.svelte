<script>
    import Panel from "$lib/client/components/Panel.svelte";
    import FilterList from "$lib/client/components/FilterList.svelte";
    import { getContext } from "svelte";
    import { CONTEXT } from "$lib/utils/constants.js";

    let facets = getContext(CONTEXT.FACETS);
    let graphState = getContext(CONTEXT.GRAPH_STATE);

    let queryStr = graphState.query.queryStr;
    
</script>
<div class="panel-container">
    <Panel header="Search" startCollapsed={false}>
        <input type="text" bind:value={queryStr}>
        <button onclick={() => graphState.query.queryStr = queryStr}>Search</button>
    </Panel>

    <Panel header="Works">
        <FilterList facetOptions={facets.works}/>
    </Panel>

    <Panel header="Doctrines">
        <FilterList facetOptions={facets.doctrines}/>
    </Panel>

    <Panel header="Referenced works">
        <p>Dummy text</p>
    </Panel>

</div>

<style>
    .panel-container {
        position: absolute;
        bottom: 0;
        right: 0;
        margin: 15px;
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
</style>