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

    let selectedNodeDetails = $derived.by(() => {
        let nodeID = graphState.selectedNodeID;
        if (nodeID === null) {
            return null;
        }
        return graph.getNodeAttributes(nodeID).data;
    });

    $inspect(selectedNodeDetails)

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

        // Gode eksempler her på brug af reducers til hhv. highlight og mattering
        // https://github.com/jacomyal/sigma.js/blob/main/packages/storybook/stories/1-core-features/4-use-reducers/index.ts

        sigma.scheduleRender(); // (https://www.sigmajs.org/docs/advanced/lifecycle#manual-rendering-triggers)
    }

    /**
     * A handler for click events
     */
    function nodeClickedHandler(event) {
        let nodeID = event.node;
        graphState.selectedNodeID = graph.getNodeAttribute(nodeID, 'data') === null ? null : nodeID;
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

{#if graphState.selectedNodeID !== null && selectedNodeDetails !== null}
    <div id="details-panel">
        <Panel
                header={selectedNodeDetails.reference}
                isCollapsible={false}
        >
            <div>
                <p class="details-key">Work</p>
                <p class="details-value">{selectedNodeDetails?.work ?? ''}</p>
            </div>
            <div>
                <p class="details-key">Reference</p>
                <p class="details-value">{selectedNodeDetails.reference}</p>
            </div>
            <div>
                <p class="details-key">ID</p>
                <p class="details-value">{graphState.selectedNodeID}</p>
            </div>
            <div>
                <p class="details-key">Doctrines</p>
                <p class="details-value">{selectedNodeDetails.doctrines.join(', ')}</p>
            </div>
            <div>
                <p class="details-key">Quotations</p>
                <p class="details-value">{selectedNodeDetails.quotations.join(', ')}</p>
            </div>
            <div>
                <p class="details-key">Related quotations</p>
                <p class="details-value">{selectedNodeDetails.relatedQuotations.length > 0 ? selectedNodeDetails.relatedQuotations.join(', ') : 'None'}</p>
            </div>
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

    #details-panel {
        position: absolute;
        top: 0;
        right: 0;
        margin: 15px;
        max-width: 30vw;
    }

    .details-key {
        font-stretch: semi-expanded;
        font-weight: bold;
        margin-bottom: 0;
    }

    .details-value {
        font-size: 0.8em;
        margin-top: 0;
    }
</style>