const sha1 = require('sha1');

const hashPwd = (pwd) => sha1(pwd);

module.exports = { hashPwd };
