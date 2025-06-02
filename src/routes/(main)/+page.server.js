import { graph, data } from "$lib/server/app.js";

export function load() {
    return {
        exportedGraph: graph.export(),
        availableData: data
    };
}