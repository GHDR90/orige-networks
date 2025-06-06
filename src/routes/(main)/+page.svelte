<script>
    import Graph from "graphology";

    import { getContext, onMount, setContext } from "svelte";
    import { browser } from "$app/environment";
    import PanelContainer from "$lib/client/components/PanelContainer.svelte";
    import { CONTEXT } from "$lib/utils/constants.js";
    import Panel from "$lib/client/components/Panel.svelte";

    let { data } = $props();

    let exportedGraph = data.exportedGraph;
    let graph = Graph.from(exportedGraph);

    let facets = data.facets;
    let nodeIDS = data.nodeIDs;

    let meta = {
        totalNodes: graph.nodes().length,
        totalEdges: graph.edges().length
    };

    $inspect(facets);

    /** @type {GraphState} */
    let graphState = $state({
        selectedNodeID: null,
        query: {
            queryStr: "",
            filters: []
        },
        renderedNodeIDs: new Set()
    });

    setContext(CONTEXT.GRAPH_STATE, graphState);
    setContext(CONTEXT.FACETS, facets)

    let resolveURL = getContext(CONTEXT.RESOLVE_URL);

    /** @type {HTMLDivElement} */
    let container;

    /** @type {import('sigma').Sigma} */
    let sigma;

    onMount( async () => {
        if (browser) {

            let { Sigma } = await import("sigma");

            // Instantiate sigma.js and render the graph
            sigma = new Sigma(graph, container);

            // Adds handler for node clicks
            sigma.on('clickNode', nodeClickedHandler);

            // Handler for clicking outside the nodes
            sigma.on('clickStage', stageClickHandler)
        }
    })

    $effect(() => {
        graphState;

        // filter by

        render();
    })

    function render() {
        if (!sigma) {
            return;
        }

        sigma.setSetting('nodeReducer', (id, node) => {
            if (!node.data || !node.data.doctrines.includes('Church')) {
                return {
                    ...node,
                    hidden: true
                };
            }
            return node;
        })

        sigma.scheduleRender(); // (https://www.sigmajs.org/docs/advanced/lifecycle#manual-rendering-triggers)
    }

    /**
     * A handler for click events
     */
    function nodeClickedHandler(event) {
        let nodeID = event.node;
        graphState.selectedNodeID = nodeID;

        let nodeData = graph.getNodeAttributes(nodeID)?.data;
        console.log(nodeData);
    }

    function stageClickHandler(event) {
        graphState.selectedNodeID = null;
    }

    function applyFilters(filters) {
        for (let filter of filters) {

        }
    }

    function searchByQueryString(queryStr) {

    }

</script>


<div id="sigma-container" bind:this={container}></div>

{#if graphState.selectedNodeID !== null}
    <div style="position: absolute; top: 0; right: 0;">
        <Panel
                header="Selected node"
                isCollapsible={false}
        >
            <p>{graphState.selectedNodeID}</p>

        </Panel>
    </div>
{/if}

<PanelContainer />

<footer id="footer">
    <p class="italic">Nodes: {meta.totalNodes}. Edges: {meta.totalEdges}.</p>
</footer>

<style>
    #sigma-container {
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: white;
    }

    #footer {
        position: absolute;
        bottom: 0;
        left: 0;
        font-size: 0.8rem;
        margin-inline: 10px;
    }

    .italic {
        font-style: italic;
    }
</style>