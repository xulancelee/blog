import mysql from 'mysql2';
import security from "./security.js";
import config from '../app.config.js';

const sqlConf = decryptSqlConf(config.database);
const pool = mysql.createPool(sqlConf);

function dataFilter(res) {
    let [data, row, effect] = res;
}

function sql(sql) {
    return new Promise(((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) reject(err);
            else connection.query(sql, (err, result, fields) => {
                if (err) reject();
                else resolve(result);
            });
        });
    }));
}

function runProc(proc, params) {
    params = (params || []).map(function (value) {
        switch (typeof value) {
            case "string":
                return `'${value}'`;
            case "number":
                return value;
            case "object":
                return `'${JSON.stringify(value)}'`;
            case "boolean":
                return value ? 'true' : 'false';
            default:
                return 'null';
        }
    });
    return new Promise(((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) reject(err);
            else {
                let sql = 'call ' + proc + '(' + params.join(',') + ')';
                connection.query(sql, (err, result, fields) => {

                    if (err) {
                        reject();
                    }
                    else {
                        resolve(result);
                    }
                });
            }
        });
    })).catch((err) => {
        console.log(err);
    });
}

async function query(proc, params) {
    let result = await runProc(proc, params);
    if (result) return result[0];
    else return null;
}

async function execute(proc, params) {
    let result = await runProc(proc, params);
    return !!result['affectedRows'];
}

async function result(proc, params) {
    let result = await runProc(proc, params);
    if(result && result[0] && result[0][0]) return result[0][0]['result'];
    else return null;
}

function encryptSqlConf(conf) {
    let keygen = security.createCryStr();
    let confStr = JSON.stringify(conf);
    return keygen + security.encrypt(keygen, confStr);
}

function decryptSqlConf(cryptStr) {
    let keygen = cryptStr.slice(0, 65);
    let confStr = cryptStr.slice(65);
    try {
        return JSON.parse(security.decrypt(keygen, confStr));
    } catch (e) {
        throw new Error('Database Config crypt String Error!');
    }
}

export default {
    sql,
    query,
    execute,
    result,
    encryptSqlConf,
    decryptSqlConf
}