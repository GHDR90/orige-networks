import appRootPath from "app-root-path";
import path from 'node:path';
import fs from 'node:fs';
import { loadData, prepareGraphModelForRendering, transformDataToGraph } from "$lib/server/main.js";
import { env as privateEnvVars } from '$env/dynamic/private';
import Graph from "graphology";

const DEVELOPMENT_MODE = privateEnvVars.NODE_ENV === 'development' || privateEnvVars.DEV_MODE === 'true';

const APP_ROOT_PATH = appRootPath.toString();

const APP_DATA_DIR = path.join(APP_ROOT_PATH, 'data');
const JSON_FILE_PATH = path.join(APP_DATA_DIR, 'references.json');

let entries = loadData(JSON_FILE_PATH);

let { nodes, edges, data } = transformDataToGraph(entries);

let graph;

const GRAPH_FILE_PATH = "/Users/au335497/Temp/orige-net/graph.json";

if (DEVELOPMENT_MODE) {
    try {
        if (fs.existsSync(GRAPH_FILE_PATH)) {
            let fileContent = fs.readFileSync(GRAPH_FILE_PATH, 'utf-8');
            graph = Graph.from(JSON.parse(fileContent));
        } else {
            graph = prepareGraphModelForRendering(nodes, edges);
            fs.writeFileSync(GRAPH_FILE_PATH, JSON.stringify(graph.export()))
        }
    } catch (err) {
        console.error('Something went wrong. Creating new graph.')
    }
} else {
    graph = prepareGraphModelForRendering(nodes, edges);
}


export { graph, data }