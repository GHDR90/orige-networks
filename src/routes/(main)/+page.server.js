import { graph, facets, nodeIDs } from "$lib/server/app.js";

export function load() {
    return {
        exportedGraph: graph.export(),
        facets,
        nodeIDs
    };
}