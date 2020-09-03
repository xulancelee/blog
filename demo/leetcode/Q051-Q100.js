/**
 * 51
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    function build(ans) {
        let len = ans.length;
        let si = [];
        for (let i = 0; i < ans.length; i++) {
            let row = new Array(len).fill('.');
            row[ans[i]] = 'Q';
            si.push(row.join(''));
        }
        result.push(si);
    }

    function lock(row, col) {
        for (let i = 0; i < row; i++) {
            if(col === cache[i]) return false;
            if(col + row - i === cache[i]) return false;
            if(col - row + i === cache[i]) return false;
        }
        return true;
    }

    function search(row) {
        for (let i = 0; i < n; i++) {
            if(lock(row, i)) {
                cache[row] = i;
                if(row === n - 1) {
                    build(cache);
                } else search(row + 1);
            }
        }
        return false;
    }

    if(n === 1) return [["Q"]];
    if(n <= 3) return [];

    let result = [];
    let cache = new Array(n);

    search(0);

    return result;
};