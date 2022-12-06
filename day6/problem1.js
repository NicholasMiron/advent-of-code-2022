const sample1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/sample1.txt'), 'utf8');
const input1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/input1.txt'), 'utf8');

const solution = (input) => {
  const distinctSize = 4;
  for (let i = 0; i <= input.length - distinctSize; i++) {
    const set = new Set(input.slice(i, i + distinctSize));
    if (set.size === distinctSize) {
      return i + distinctSize;
    }
  }
};

console.log('sample:', solution(sample1));
console.log('solution:', solution(input1));