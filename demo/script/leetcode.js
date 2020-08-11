/**
 * 1
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let map = new Map();
    for (let i = 0; i < nums.length; i++) {
        let sub = target - nums[i];
        if(map.has(sub)) return [map.get(sub), i];
        else map.set(nums[i], i);
    }
};

