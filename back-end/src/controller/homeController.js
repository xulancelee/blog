import sql from '../utils/sql.js';

async function listRecent() {
    return await sql.query('article_list_recent');
}

async function listByTag() {

}

export default {
    listRecent,
    listByTag
}