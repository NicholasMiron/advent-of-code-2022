const sample1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/sample1.txt'), 'utf8');
const input1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/input1.txt'), 'utf8');

const solution = (input) => {

  return input
    .split('\n')
    .map(Number)
    .reduce((acc, cur) => {
      if (cur) {
        return [...acc.slice(0, -1), acc.at(-1) + cur];
      } else {
        return [...acc, 0];
      }
    }, [])
    .sort((a, b) => a < b ? 1 : -1)
    .slice(0, 3)
    .reduce((acc, cur) => acc + cur);
};


console.log('sample:', solution(sample1));
console.log('solution:', solution(input1));
