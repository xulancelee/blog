/**
 * 486
 * @param {number[]} nums
 * @return {boolean}
 */
var PredictTheWinner = function(nums) {
    let len = nums.length;
    if(len === 1 || len % 2 === 0) return true;

    let cache = DecArray(len, len);

    function pick(i, j) {
        if(cache[i][j]) return cache[i][j];
        if(i === j) return cache[i][j] = nums[i];
        cache[i][j] = Math.max(nums[j] - pick(i, j - 1), nums[i] - pick(i + 1, j));
        return cache[i][j];
    }

    let half = (len - 1) / 2;
    for (let i = 0; i <= half; i++) {
        pick(half - i, half + i);
    }

    return cache[0][len - 1] >= 0;
};