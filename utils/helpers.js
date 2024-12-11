const fs = require('fs');

const sha1 = require('sha1');

const hashPwd = (pwd) => sha1(pwd);

const btoa = (string) => Buffer.from(string).toString('base64');

const atob = (string) => Buffer.from(string, 'base64').toString('utf-8');

const createFile = (type, id, data) => {
  const parent = process.env.FOLDER_PATH || '/tmp/files_manager';
  if (!fs.existsSync(parent)) {
    fs.mkdirSync('/tmp/files_manager', { recursive: true });
  }
  const path = `${parent}/${id}`;
  if (type !== 'folder') {
    fs.writeFileSync(path, data, 'utf-8');
  }
};

module.exports = {
  atob, btoa, hashPwd, createFile,
};
