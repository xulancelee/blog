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