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
  let lines = input
    .split('\n')
    .filter((line) => !!line)
    .map(JSON.parse);
  lines.push([[2]], [[6]]);

  lines.sort((a, b) => {
    const res = isCorrect(a, b);
    if (res === 0) return res;
    return res === 1 ? -1 : 1;
  });

  lines = lines.map(JSON.stringify);

  return (lines.findIndex((line) => line === '[[2]]') + 1) * (lines.findIndex((line) => line === '[[6]]') + 1);

};

console.log('sample:', solution(sample1));
console.log('solution:', solution(input1));