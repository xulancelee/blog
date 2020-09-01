//二维数组
function DecArray(x, y) {
    let vector = [];
    for (let i = 0; i < x; i++)
        vector[i] = new Array(y);
    return vector;
}