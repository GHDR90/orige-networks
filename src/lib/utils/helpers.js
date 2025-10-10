

export function isNotNullNotEmptyString(str) {
    return str && typeof str === "string" && str.length > 0;
}

/**
 *
 * @param {string} str
 * @param {string} searchStr
 * @return {boolean}
 */
export function stringContainsIgnoreCase(str, searchStr) {
    return str.toLowerCase().includes(searchStr.toLowerCase());
}