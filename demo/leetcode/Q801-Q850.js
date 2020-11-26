/**
 * 841
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function(rooms) {
    let visited = new Set();
    let visit = key => {
        if(visited[key]) return ;
        visited.add(key);
        for (let i = 0; i < rooms[key].length; i++) {
            visit(rooms[key][i]);
        }
    };
    visit(0);

    return visited.size >= rooms.length;
};