const sample1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/sample1.txt'), 'utf8');
const input1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/input1.txt'), 'utf8');

const solution = (input) => {
  return input
    .split('\n')
    .map((pair) => pair.split(','))
    .map((ranges) => ranges.map((range) => range.split('-').map(Number)))
    .filter(([one, two]) => {
      const [start1, end1] = one;
      const [start2, end2] = two;
      return ((end1 >= start2 && end2 >= end1) || (end2 >= start1 && end1 >= end2))
    }).length;
};

console.log('sample:', solution(sample1));
console.log('solution:', solution(input1));
