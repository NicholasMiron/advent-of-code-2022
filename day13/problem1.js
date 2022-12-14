const sample1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/sample1.txt'), 'utf8');
const input1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/input1.txt'), 'utf8');

function isNum(val) { return typeof val === 'number'; }
function isUnd(val) { return typeof val === 'undefined'; }

function isCorrect(left, right) {
  let l = left;
  let r = right;

  if (isUnd(l) || isUnd(r)) return isUnd(l) ? 1 : -1;
  if (isNum(l) && isNum(r)) {
    if (l === r) return 0;
    else return l < r ? 1 : -1;
  }

  l = isNum(l) ? [l] : l;
  r = isNum(r) ? [r] : r;

  for (let i = 0; i < l.length; i++) {
    const res = isCorrect(l[i], r[i]);
    if (res !== 0) return res;
  }

  if (l.length < r.length) return 1;
  else if (l.length === r.length) return 0;
  else return -1;
}

const solution = (input) => {
  const groups = input
    .split('\n\n')
    .map((group) => group.split('\n').map(JSON.parse));

  let sumCorrect = 0;

  groups.forEach((group, i) => {
    const res = isCorrect(...group);
    sumCorrect += res === 1 ? i + 1 : 0;
  });

  return sumCorrect;
};

console.log('sample:', solution(sample1));
console.log('solution:', solution(input1));