import path from "path";
import fs from "fs";
import BusBoy from 'busboy';
import sql from '../utils/sql.js';
import config from '../app.config.js';

const storageDir = path.resolve(config.staticDir);
const resourceDir = path.join(storageDir, '/resource');
const journalDir = path.join(storageDir, '/journal');
const resourceUrl = '/resource';
const journalUrl = '/journal';

function fix(num) {
    if (num < 10) return '0' + num;
    else return '' + num;
}

function saveDir(type) {
    if (type === 'journal') return '/journal';
    let now = new Date();
    let timeDir = '/' + fix(now.getFullYear()) + fix(now.getMonth() + 1);
    return path.join('/resource', timeDir);
}

function listSource(dir) {
    try {
        dir = dir || '';
        let dirPath = path.join(resourceDir, dir);
        let dirState = fs.statSync(dirPath);
        let dirPathInfo = path.parse(dirPath);
        let list = [];

        let info = {
            isDir: dirState.isDirectory(),
            path: dir.replace(/\\/g, '/'),
            url: dirPath.replace(/\\/g, '/'),
            size: dirState.size,
            name: dirPathInfo.name,
            base: dirPathInfo.base,
            ext: dirPathInfo.ext
        };

        if (dirState.isDirectory()) {
            fs.readdirSync(dirPath).map((value => {
                let sourcePath = path.join(dirPath, value);
                let stat = fs.statSync(sourcePath);
                let pathInfo = path.parse(sourcePath);
                list.push({
                    isDir: stat.isDirectory(),
                    path: path.join(dir, value).replace(/\\/g, '/'),
                    url: path.join(resourceUrl, dir, value).replace(/\\/g, '/'),
                    size: stat.size,
                    name: pathInfo.name,
                    base: pathInfo.base,
                    ext: pathInfo.ext
                });
            }));
        }
        return {info, list};
    } catch (e) {
        console.log(e);
    }
    return {info: {}, list: []};
}

function mkdir(dir) {
    let dirPath = path.join(resourceDir, dir);
    try {
        fs.mkdirSync(dirPath);
        return true;
    } catch (e) {
        console.log(e);
    }
    return false;
}

function multiParse(request, save, rename, field) {
    let {headers} = request;
    let bus = new BusBoy({headers});
    return new Promise(((resolve, reject) => {
        let files = [];
        let form = {};
        let saveDir = path.join(storageDir, save);
        bus.on('file', (field, file, fileName, encoding, mimeType) => {
            let fileParse = path.parse(fileName);
            let ext = fileParse.ext || '.md';
            let savePath = path.join(saveDir, fileName);
            let info = {
                field,
                fileName,
                savePath,
                ext,
                url: path.join(save, fileName).replace(/\\/g, '/'),
                success: false
            };
            files.push(info);
            file.pipe(fs.createWriteStream(savePath));
            file.on('end', () => {
                info.success = true;
            });
        });

        bus.on('field', (field, value) => {
            form[field] = value;
        });

        bus.on('finish', () => {
            rename && files.forEach((item) => {
                let rename = form[field];
                if (!rename) return false;
                rename = rename + item.ext;
                let cachePath = item.savePath;
                let redirectPath = path.join(saveDir, rename);
                fs.renameSync(cachePath, redirectPath);
                item.fileName = rename;
                item.savePath = redirectPath;
                item.url = path.join(save, rename).replace(/\\/g, '/');
            });

            form['files'] = files;
            resolve(form);
        });

        bus.on('error', (err) => {
            reject(err);
        });

        request.pipe(bus);
    })).catch(err => {
        console.log(err);
    });
}

async function publish(params) {
    return await sql.execute('article_add', params);
}

export default {
    listSource,
    multiParse,
    saveDir,
    mkdir,
    publish
}