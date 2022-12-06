const sample1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/sample1.txt'), 'utf8');
const input1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/input1.txt'), 'utf8');

const solution = (input) => {
  // A: Rock - B: Paper - C: Scissors
  // X: lose - Y: Tie - Z: win
  const points = {
    'X': {'A': 3, 'B': 1, 'C': 2,},
    'Y': {'A': 4, 'B': 5, 'C': 6,},
    'Z': {'A': 8, 'B': 9, 'C': 7,},
  };

  return input
    .split('\n')
    .reduce((total, [oppMove, _, roundResult]) => {
      return total + points[roundResult][oppMove]
    }, 0);
};

console.log('sample:', solution(sample1));
console.log('solution:', solution(input1));
