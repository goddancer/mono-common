// commit 规范
// <type>: <subject>
// upd: 更新功能逻辑    feat: 新功能
// fix: bugFix     refactor: 重构
// doc: 文档        chore: 项目构建
// style: 样式修改   revert: 回滚
// test: 测试||测试代码  merge: 合并
// rebase: rebase
const commitType = [
  'upd',
  'feat',
  'fix',
  'refactor',
  'doc',
  'chore',
  'style',
  'revert',
  'test',
  'merge',
  'rebase',
];
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', commitType],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
  },
};
