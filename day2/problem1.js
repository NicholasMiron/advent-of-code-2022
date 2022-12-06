const sample1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/sample1.txt'), 'utf8');
const input1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/input1.txt'), 'utf8');

const solution = (input) => {
  // A/X: Rock - B/Y: Paper - C/Z: Scissors
  const points = {
    'AX': 4, 'AY': 8, 'AZ': 3,
    'BX': 1, 'BY': 5, 'BZ': 9,
    'CX': 7, 'CY': 2, 'CZ': 6,
  };

  return input
    .split('\n')
    .reduce((acc, cur) => acc + points[cur[0] + cur[2]], 0);
};

console.log('sample:', solution(sample1));
console.log('solution:', solution(input1));
