/**
 * 1
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    let map = new Map();
    for (let i = 0; i < nums.length; i++) {
        let sub = target - nums[i];
        if (map.has(sub)) return [map.get(sub), i];
        else map.set(nums[i], i);
    }
};

/**
 * 2
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    let ln = new ListNode('');
    let lt = ln;
    let c = 0;
    let s = 0;

    while (l1 || l2) {
        s = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + c;
        lt.next = new ListNode(s % 10);
        lt = lt.next;
        c = s > 10 ? 1 : 0;
        l1 && (l1 = l1.next);
        l2 && (l2 = l2.next);
    }

    c && (lt.next = new ListNode(c));

    return ln.next;
};

/**
 * 3
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let l = s.length;
    let _i = new Array(128).fill(-1);
    let m = 0;
    for (let i = 0, j = 0; j < l; j++) {
        i = Math.max(_i[s.charCodeAt(j)] , i);
        m = Math.max(m, j - i + 1);
        if(i + m > l) break;
        _i[s.charCodeAt(j)] = j + 1;
    }
    return m;
};

/**
 * 4
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
    let len1 = nums1.length, len2 = nums2.length;
    if (len1 > len2) return findMedianSortedArrays(nums2, nums1);
    let iMin = 0, iMax = len1;

    while (iMin <= iMax) {
        let i = Math.floor((iMin + iMax) / 2);
        let j = Math.floor((len1 + len2 + 1) / 2 - i);

        if (j !== 0 && i !== len1 && nums2[j - 1] > nums1[i]) {
            iMin = i + 1;
        } else if (i !== 0 && j !== len2 && nums1[i - 1] > nums2[j]) {
            iMax = i - 1;
        } else {
            let left = 0;
            if (i === 0) left = nums2[j - 1];
            else if (j === 0) left = nums1[i - 1];
            else left = Math.max(nums1[i - 1], nums2[j - 1]);
            if((len1 + len2) % 2) return left;

            let right = 0;
            if(i === len1) right = nums2[j];
            else if(j === len2) right = nums1[i];
            else right = Math.min(nums1[i], nums2[j]);
            return (left + right) / 2;
        }
    }
};

/**
 * 5
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    let str1 = s;
    let str2 = Array.prototype.reverse.call(s);
    console.log(str1);
    console.log(str2);
};


/**
 * 37
 * @param {char[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(board) {
    console.log(board);
};

/**
 * 39 组合总和
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum = function(candidates, target) {
    //回溯
    if(!candidates.length || !target) return [];
    function dp(remain, cur) {
        for (let i = cur; i < candidates.length; i++) {

            if(candidates[i] < remain) {
                cache.push(candidates[i]);
                dp(remain - candidates[i], i);
                cache.pop();
            }
            if(candidates[i] === remain) {
                cache.push(candidates[i]);
                result.push(cache.slice(0));
                cache.pop();
            }
        }
    }

    let cache = [];
    let result = [];

    dp(target, 0);

    return result;
};
const combinationSum_2 = (candidates, target) => {
    const res = [];
    const cache = [];
    const dfs = (sum, start) => {
        if (sum >= target) {
            if (sum === target) {
                res.push(cache.slice());
            }
            return;
        }
        for (let i = start; i < candidates.length; i++) {
            cache.push(candidates[i]);
            dfs(sum + candidates[i], i);
            cache.pop();
        }
    };
    dfs(0, 0);
    return res;
};

/**
 * 40 组合总和 II
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum2 = (candidates, target) => {
    candidates.sort();
    const res = [];
    const cache = [];
    const dfs = (sum, start) => {
        if (sum >= target) {
            if (sum === target) {
                res.push(cache.slice());
            }
            return;
        }
        for (let i = start; i < candidates.length; i++) {
            if (candidates[i - 1] === candidates[i] && i - 1 >= start) {
                continue;
            }
            cache.push(candidates[i]);
            dfs(sum + candidates[i], i + 1);
            cache.pop();
        }
    };

    dfs(0, 0);
    return res;
};
