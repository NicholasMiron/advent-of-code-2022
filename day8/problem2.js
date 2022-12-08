const sample1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/sample1.txt'), 'utf8');
const input1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/input1.txt'), 'utf8');

const computeScenicScore = (grid, i, j) => {
  let scenicScore = 1;

  const left = grid[i].slice(0, j).reverse();
  const right = grid[i].slice(j + 1);
  const top = grid.slice(0, i).map((row) => row[j]).reverse();
  const bottom = grid.slice(i + 1).map((row) => row[j]);

  for (let arr of [left, right, top, bottom]) {
    let lineScore = 0
    if (!arr.length) return 0;

    for (let height of arr) {
      lineScore++;
      if (height >= grid[i][j]) break;
    }

    scenicScore *= lineScore;
  }

  return scenicScore;
};

const solution = (input) => {
  const grid = input.split('\n').map((line) => line.split('').map(Number));
  let maxScenicScore = 0;

  grid.forEach((row, i) => {
    row.forEach((_, j) => {
      maxScenicScore = Math.max(maxScenicScore, computeScenicScore(grid, i, j));
    });
  });

  return maxScenicScore;
};

console.log('sample:', solution(sample1));
console.log('solution:', solution(input1));
