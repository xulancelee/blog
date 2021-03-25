import path from "path";
import fs from "fs";
import sql from '../utils/sql.js';
import config from "../app.config.js";

const staticDir = path.resolve(config.staticDir);

async function listRecent() {
    return await sql.query('article_list_recent');
}

async function listByTag() {

}

async function resumeContent(type) {
    let file = type === '.dg' ? 'resume.dg.md' : 'resume.md';
    let resumePath = path.join(staticDir, file);
    if(fs.existsSync(resumePath)) {
        return fs.readFileSync(resumePath, 'utf-8');
    }
    return null;
}

async function markdown() {
    let file = 'agreement.md'
    let path = path.join(staticDir, file);
    if(fs.existsSync(path)) {
        return fs.readFileSync(path, 'utf-8');
    }
    return null
}

async function previewContent(type) {
    let file = type.slice(1);
    let previewPath = path.join(staticDir, file);
    if(fs.existsSync(previewPath)) {
        return fs.readFileSync(previewPath, 'utf-8');
    }
    return null;
}

export default {
    listRecent,
    listByTag,
    resumeContent,
    previewContent,
    markdown
}
