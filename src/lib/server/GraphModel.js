import Graph from "graphology";
import { GraphView } from "$lib/client/GraphView.js";

class GraphModel {
    /** @type {Graph} */
    graph;

    /** @type {GraphView} */
    #graphView;

    /** @type {FacetListObject} */
    #facets;

    /**
     * Creates a new graph model instance
     * @param {NodeObject[]} nodes
     * @param {EdgeObject[]} edges
     * @param {FacetListObject} facets
     */
    constructor(nodes, edges, facets) {
        this.graph = new Graph({ multi: true, type: "directed" });
        this.#graphView = new GraphView(this.graph);

        for (let node of nodes) {
            this.graph.addNode(node.id, {
                label: node.reference ?? node.id,
                x: this.#graphView.getDefaultXPos(),
                y: this.#graphView.getDefaultYPos(),
                color: this.#graphView.getNodeColorFromType(node.type),
                size: GraphView.SIZE.MIN,
                data: node
            });
        }

        for (let edge of edges) {
            this.graph.addEdge(edge.fromId, edge.toId, {
                data: edge
            });
        }

        this.#facets = facets;
    }

    /**
     * Inits the model by applying transformations based on final graph properties
     */
    init() {
        this.graph.forEachNode((key, attr) => {
            attr.size = this.#graphView.getNodeSizeFromType(key, attr.data.type)
        });

        this.#graphView.init();
    }

    /**
     * Returns available facets
     * @return {FacetListObject}
     */
    getFacets() {
        return this.#facets;
    }
}

export { GraphModel }