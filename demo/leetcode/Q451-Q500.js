/**
 * 454. 四数相加 II
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @param {number[]} D
 * @return {number}
 * 当不需要用到下标的情况 for of 比 for 更快
 * map的判断逻辑比Object更快
 */
var fourSumCount = function(A, B, C, D, h = new Map(), r = 0) {
    for(var a of A)
        for(var b of B)
            h.set(0 - a - b, (h.get(0 - a - b) || 0) + 1)
    for(var c of C)
        for(var d of D)
            h.has(c + d) && (r += h.get(c + d))
    return r
};

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
