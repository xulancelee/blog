/**
 * 257
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
    if(!root || !root.val) return [];
    function dfs(node) {
        cache.push(node.val);
        if(node.left) dfs(node.left);
        if(node.right) dfs(node.right);
        if(!node.left && !node.right) result.push(cache.join('->'));
        return cache.pop();
    }

    let cache = [];
    let result = [];

    dfs(root);

    return result;
};