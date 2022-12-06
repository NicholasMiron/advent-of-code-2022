const sample1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/sample1.txt'), 'utf8');
const input1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/input1.txt'), 'utf8');

const solution = (input) => {

  const points = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  return input
    .split('\n')
    .map((items) => {
      const half = ~~items.length / 2;
      return [items.substr(0, half), items.substr(half)];
    })
    .map(([left, right]) => {
      const leftS = new Set(left);
      return [...right].find((char) => leftS.has(char));
    })
    .reduce((sum, char) => sum + points.indexOf(char), 0);
};

console.log('sample:', solution(sample1));
console.log('solution:', solution(input1));
