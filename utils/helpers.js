const sha1 = require('sha1');

const hashPwd = (pwd) => sha1(pwd);

const btoa = (string) => Buffer.from(string).toString('base64');

const atob = (string) => Buffer.from(string, 'base64').toString('utf-8');

module.exports = { hashPwd, btoa, atob };
