/**
 * Function for adding filters to an array
 * @param {Filter[]} arr
 * @param {Filter} filter
 */
export function addFilter(arr, filter) {
    if (!hasFilter(arr, filter)) {
        arr.push(filter);
    }
}

/**
 * Function for removing filters from an array
 * @param {Filter[]} arr
 * @param {Filter} filter
 */
export function removeFilter(arr, filter) {
    if (hasFilter(arr, filter)) {
        let index = arr.findIndex(el => el.type === filter.type && el.value === filter.value);
        arr.splice(index, 1);
    }
}

/**
 * Whether the filter is in the array
 * @param {Filter[]} arr
 * @param {Filter} filter
 * @return {*}
 */
function hasFilter(arr, filter) {
    return arr.some(el => {
        return el.type === filter.type && el.value === filter.value;
    });
}

export function isNotNullNotEmptyString(str) {
    return str && typeof str === "string" && str.length > 0;
}