/**
 * 107. 二叉树的层次遍历 II
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function(root) {
    if(!root || root.val === null) return [];
    function dfs(node, lv) {
        if(!cache[lv]) cache[lv] = [];
        cache[lv].push(node.val);
        if(node.left) dfs(node.left, lv + 1);
        if(node.right) dfs(node.right, lv + 1);
    }

    let cache = [];

    dfs(root, 0);

    return cache.reverse();
};