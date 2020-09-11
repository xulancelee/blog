/**
 * 216 组合总和 III
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function(k, n) {
    const dp = function (cur, sum) {
        if(cache.length === k) {
            if(sum === n) {
                result.push(cache.slice(0));
            }
            return false;
        }

        for (let i = cur; i < 10; i++) {
            cache.push(i);
            dp(i + 1, sum + i);
            cache.pop();
        }
    }
    const cache = [];
    const result = [];

    dp(1, 0);
    return result;
};