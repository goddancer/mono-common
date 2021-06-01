const fs = require('fs');
const os = require('os');
const path = require('path');
const { exit } = require('process');
const inquirer = require('inquirer');
const childProcess = require('child_process');
const pkg = require('../package.json');
const changeLogPath = path.resolve(__dirname, '../ChangeLog.md');

const questionList = [
  {
    type: 'input',
    message: '输入本次 changeLog 标题(默认为最后一次提交 commit-msg)',
    name: 'title',
    validate: function (title) {
      if (!title) {
        return getLastCommitMsg();
      }
      return true;
    },
  },
  {
    type: 'editor',
    message: '输入本次 changeLog 内容',
    name: 'detail',
    validate: function (detail) {
      if (!detail) {
        return '内容不能为空';
      }
      return true;
    },
  },
];

const getLastCommitId = () =>
  childProcess.execSync('git rev-parse --short HEAD').toString().replace(/\s+/, '');

const getLastCommitMsg = () =>
  childProcess.execSync(`git log --pretty=format:“%s” ${getLastCommitId()} -1`).toString('utf8');

const getBranch = () =>
  childProcess.execSync('git rev-parse --abbrev-ref HEAD').toString().replace(/\s+/, '');

const getCurrentUser = () => childProcess.execSync('git show -s --format=%an').toString();

const getTime = () => {
  return new Date(+new Date() + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ');
};

const appendFile = str => {
  fs.appendFile(changeLogPath, str, (err, data) => {
    if (err) {
      exit(1);
    }
    exit(0);
  });
};

const testFileState = () => {
  return new Promise((resolve, reject) => {
    fs.stat(changeLogPath, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

inquirer.prompt(questionList).then(result => {
  const { title, detail } = result;
  if (require.main === module) {
    let str = `- ${getTime()}  version: ${pkg.version} branch: ${getBranch()} ${
      os.EOL
    }editor: ${getCurrentUser()}标题: ${title}${os.EOL}内容: ${detail}${os.EOL}`;
    testFileState()
      .then(state => {
        appendFile(str);
      })
      .catch(err => {
        fs.writeFile(changeLogPath, str, (err, state) => {
          if (err) {
            exit(1);
          }
          exit(0);
        });
      });
  } else {
    exit(1);
  }
});
