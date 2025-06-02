import fs from 'node:fs';
import forceAtlas2 from 'graphology-layout-forceatlas2'
import random from 'graphology-layout/random';
import Graph from "graphology";

/**
 * @typedef Entry
 * @prop {string} work
 * @prop {string} reference
 * @prop {string[]} quotations
 * @prop {string[]} doctrines
 * @prop {string[]} relatedQuotations
 * @prop {{ created: number, edited: number }} _meta
 * @prop {number} id
 */

/**
 * @typedef GraphNode
 * @prop {string|number} id
 * @prop {"main"|"reference"} type
 * @prop {string} color
 * @prop {object?} data
 */

/**
 * @typedef GraphEdge
 * @prop {string|number} fromID
 * @prop {string|number} toID
 * @prop {"quotation"|"relatedQuotation"} type
 */

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
 * @return {{ nodes: object[], edges: object[], data: object }}
 */
export function transformDataToGraph(entries) {
    let nodes = [];
    let edges = [];
    let data = {
        works: new Map(),
        doctrines: new Map(),
        referencedWorks: new Map()
    };

    let referenceNodes = new Set();

    for (let entry of entries) {
        let mainNode = createNode(entry.id, entry, 'main');
        nodes.push(mainNode);

        incrementMapByKey(data.works, entry.work)

        for (let doctrine of entry.doctrines) {
            incrementMapByKey(data.doctrines, doctrine);
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
        data: {
            works: transformMapToSortedArray(data.works),
            doctrines: transformMapToSortedArray(data.doctrines)
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