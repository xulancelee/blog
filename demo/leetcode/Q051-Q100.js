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

/**
 * 60
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getPermutation = function (n, k) {
    function order(k) {
        if (k === 1) return true;
        let i = 1;
        let ni = 1;
        while (ni < k) {
            i++;
            ni = ni * i;
        }
        site[i - 1]++;
        order(k - (ni / i));
    }

    let site = new Array(n).fill(0);
    let cache = [];
    for (let i = 1; i <= n; i++) {
        cache.push(i);
    }
    order(k); //做一次排序，选出要插队的数字
    site.reverse(); //反序，后面的先排
    for (let i = 0; i < n; i++) {
        if(site[i] > 0) {
            let sw = cache.splice(i + site[i], 1);
            cache.splice(i, 0, sw);
        }
    }

    return cache.join('');
};

/**
 * 77 组合
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    //回溯 动态分配
    if(!n || !k) return [];
    function dp(min, max, num) {
        let remain = max - num + 1;
        for (; min <= remain; min++) {
            cache.push(min);
            if(num > 1) {
                dp(min + 1, max, num - 1);
            } else {
                result.push(cache.slice(0));
            }
            cache.pop();
        }
    }

    let cache = [];
    let result = [];
    dp(1, n, k);
    return result;
};

