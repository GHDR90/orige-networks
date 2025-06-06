/**
 * @typedef Filter
 * @prop {string} type
 * @prop {string} value
 */

/**
 * @typedef GraphState
 * @prop {?string} selectedNodeID
 * @prop {object} query
 * @prop {string} query.queryStr
 * @prop {Filter[]} query.filters
 */

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