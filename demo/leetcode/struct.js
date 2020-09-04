//二维数组
function DecArray(x, y) {
    let vector = [];
    for (let i = 0; i < x; i++)
        vector[i] = new Array(y);
    return vector;
}

//树结构
function TreeNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}