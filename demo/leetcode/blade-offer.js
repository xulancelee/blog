/**
 * 20
 * @param {string} s
 * @return {boolean}
 */
var isNumber = function(s) {
    s = s.trim();
    if(!s) return false;
    return !isNaN(Number(s));
};