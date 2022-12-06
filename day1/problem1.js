const sample1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/sample1.txt'), 'utf8');
const input1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/input1.txt'), 'utf8');

const solution = (input) => {
  let maxCalories = 0;

  input
    .split('\n')
    .map(Number)
    .reduce((elfSum, cal) => {
      maxCalories = Math.max(maxCalories, elfSum + cal);
      return cal ? elfSum + cal : 0;
    }, 0);

  return maxCalories;
};

console.log('sample:', solution(sample1));
console.log('solution:', solution(input1));
