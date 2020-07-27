import path from "path";
import fs from "fs";
import sql from '../utils/sql.js';
import config from "../app.config.js";

const DEBUG = config.DEBUG;
const articleDir = path.resolve(config.articleDir);
const __article_cache = {};

function formatDate(dateStr) {
    const fix = num => num < 10 ? '0' + num : '' + num;
    let date = new Date(dateStr);
    return [date.getFullYear(), fix(date.getMonth() + 1), fix(date.getDate())].join('-')
}

async function articleDetail(link) {
    let result = await sql.query('article_get', [link]);
    if (result && result.length) {
        let info = result[0];
        info['create_date'] = formatDate(info['create_date']);
        info['modify_date'] = formatDate(info['modify_date']);
        return info;
    }
    return null;
}

async function articleContent(link, ext) {
    if (DEBUG || !__article_cache[link]) {
        let articlePath = path.join(articleDir, link + ext);
        if (fs.existsSync(articlePath)) {
            __article_cache[link] = fs.readFileSync(articlePath, 'utf-8');
        } else {
            console.log(articlePath);
            __article_cache[link] = null;
        }
    }
    return __article_cache[link];
}

export default {
    articleDetail,
    articleContent
}