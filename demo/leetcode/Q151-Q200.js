/**
 * 164. 最大间距
 * @param {number[]} nums
 * @return {number}
 */
const maximumGap = function (nums) {
  if (nums.length < 2) return 0
  nums.sort((a, b) => a - b)
  let max = 0
  for (let i = 0, l = nums.length - 1; i < l; i++) {
    if (nums[i + 1] - nums[i] > max) max = nums[i + 1] - nums[i]
  }
  return max
};
