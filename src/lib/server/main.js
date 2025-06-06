import fs from 'node:fs';
import forceAtlas2 from 'graphology-layout-forceatlas2'
import random from 'graphology-layout/random';
import Graph from "graphology";

/**
 * Main data loader function
 * @param {string} filePath
 * @return {Entry[]}
 */
export function loadData(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf-8');
        let data = JSON.parse(content);

        return data.entries;
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

/**
 * Transforms the original data into nodes and edges for the graph
 * @param {Entry[]} entries
 * @return {{ nodes: GraphNode[], edges: GraphEdge[], facets: { works: object[] } }}
 */
export function transformDataToGraph(entries) {
    let nodes = [];
    let edges = [];
    let facets = {
        works: new Map(),
        doctrines: new Map(),
        referencedWorks: new Map()
    };

    let referenceNodes = new Set();

    for (let entry of entries) {
        let mainNode = createNode(entry.id, entry, 'main');
        nodes.push(mainNode);

        incrementMapByKey(facets.works, entry.work)

        for (let doctrine of entry.doctrines) {
            incrementMapByKey(facets.doctrines, doctrine);
        }

        for (let quotation of entry.quotations) {
            let referenceNode = createNode(quotation, null, 'reference');
            if (!referenceNodes.has(referenceNode.id)) {
                nodes.push(referenceNode);
                referenceNodes.add(referenceNode.id);
            }

            let quotationEdge = createEdge(mainNode.id, referenceNode.id, 'quotation');
            edges.push(quotationEdge);
        }

        for (let quotation of entry.relatedQuotations) {
            let referenceNode = createNode(quotation, null, 'reference');
            if (!referenceNodes.has(referenceNode.id)) {
                nodes.push(referenceNode);
                referenceNodes.add(referenceNode.id);
            }

            let quotationEdge = createEdge(mainNode.id, referenceNode.id, 'relatedQuotation');
            edges.push(quotationEdge);
        }

    }

    return {
        nodes,
        edges,
        facets: {
            works: transformMapToSortedArray(facets.works),
            doctrines: transformMapToSortedArray(facets.doctrines)
        }
    };
}

function incrementMapByKey(map, key) {
    let prevCount = map.get(key);
    if (!prevCount) {
        prevCount = 0;
    }
    map.set(key, prevCount + 1);
    return map;
}

function transformMapToSortedArray(map) {
    let res = [];
    for (let [key, value] of map) {
        res.push({
            key,
            count: value
        })
    }
    return res.sort((a, b) => b.count - a.count);
}

/**
 * Creates a new node
 * @param {string|number} id
 * @param {object?} data
 * @param {"main"|"reference"} type
 * @return {GraphNode}
 */
function createNode(id, data, type) {
    return {
        id,
        type,
        color: getColorFromNodeType(type),
        data
    }
}

/**
 * Creates a new edge
 * @param {string|number} fromID
 * @param {string|number} toID
 * @param {string} type
 * @return {GraphEdge}
 */
function createEdge(fromID, toID, type) {
    return {
        fromID,
        toID,
        type
    }
}

function getColorFromNodeType(type) {
    if (type === 'main') {
        return '#76b5c5';
    }
    if (type === 'reference') {
        return '#eab676';
    }
    return '#21130d';
}

/**
 *
 * @param {GraphNode[]} nodes
 * @param {GraphEdge[]} edges
 * @return {Graph}
 */
export function prepareGraphModelForRendering(nodes, edges) {
    const graph = new Graph({ multi: true });

    for (let node of nodes) {
        graph.addNode(node.id, {
            label: node.data?.reference ?? node.id,
            x: Math.random(),
            y: Math.random(),
            // size: node.type === "main" ? 10 : 5,
            color: node.color,
            data: node.data
        });
    }

    for (let edge of edges) {
        graph.addEdge(edge.fromID, edge.toID)
    }

    graph.forEachNode((key, attr) => {
        attr.size = clamp(graph.degree(key), 5, 15);
    })

    random.assign(graph);

    forceAtlas2.assign(graph, {
        iterations: 500,
        settings: {
            gravity: 10
        }
    });

    return graph;
}

function clamp(num, min, max) {
    if (num <= min) {
        return min;
    }
    if (num >= max) {
        return max;
    }
    return num;
}