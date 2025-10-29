import { graphModel } from "$lib/server/app.js";

/** @type {import('./$types').PageLoad} */
export function load() {
    return {
        serializedGraph: graphModel.graph.export(),
        allFacets: graphModel.getFacets()
    };
}