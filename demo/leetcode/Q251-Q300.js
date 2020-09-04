/**
 * 257
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
    if(!root || !root.val) return [];
    function dfs(node, tree) {
        tree.push(node.val);
        if(node.left) dfs(node.left, tree);
        if(node.right) dfs(node.right, tree);
        if(!node.left && !node.right) cache.push(tree.join('->'));
        return tree.pop();
    }

    let cache = [];

    dfs(root, []);

    return cache;
};