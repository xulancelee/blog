if (document.currentScript) {
    window.__EstNode = document.currentScript
} else {
    document.querySelectorAll('script').forEach(function (node) {
        if (/est\.(beta|v\d+)\.js/.test(node.src)) {
            window.__EstNode = node;
        }
    });
}

window.EstUnion = window.EstUnion || [];

EstUnion.push({
    est_id: 'ADHAL1923JJSK',
    type: '',
    display: 'banner',
    node: __EstNode
});

(function () {
    try {
        let doc = document,
            h = doc.getElementsByTagName('head')[0],
            s = doc.createElement('script');
        s.async = true;
        s.src = __EstNode.src.replace(/(beta|v\d+)/, sub => 'sim.' + sub);
        h && h.insertBefore(s, h.firstChild);
    } catch (e) {
        console.log('浏览器版本过旧');
    }
})();