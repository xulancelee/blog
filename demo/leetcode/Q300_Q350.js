/**
 * 332
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary = function (tickets) {
    //欧拉路径问题
    let map = {};
    for (let i = 0; i < tickets.length; i++) {
        if (!map[tickets[i][0]]) map[tickets[i][0]] = [];
        map[tickets[i][0]].push(tickets[i][1]);
    }
    Object.getOwnPropertyNames(map).forEach(val => {
        if (map[val].length > 1) map[val].sort();
    });
    let result = [];

    const dfs = (node) => {
        const next = map[node];
        while (next && next.length) {
            const nextNode = next.shift();
            dfs(nextNode);
        }
        result.unshift(node);
    };

    dfs('JFK', 0);
    return result;
};

/**
 * 347 前 K 个高频元素
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {

};