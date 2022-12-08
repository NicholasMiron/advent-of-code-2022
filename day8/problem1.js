const sample1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/sample1.txt'), 'utf8');
const input1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/input1.txt'), 'utf8');

const isVisible = (grid, i, j) => {
  // Must be on the edge
  if (i === 0 || j === 0 || i === grid.length - 1 || j === grid[0].length - 1) return true;

  const left = grid[i].slice(0, j);
  const right = grid[i].slice(j + 1);
  const top = grid.slice(0, i).map((row) => row[j]);
  const bottom = grid.slice(i + 1).map((row) => row[j]);

  return (
    Math.max(...left) < grid[i][j]
    || Math.max(...right) < grid[i][j]
    || Math.max(...top) < grid[i][j]
    || Math.max(...bottom) < grid[i][j]
  );
};

const solution = (input) => {
  const grid = input.split('\n').map((line) => line.split('').map(Number));
  let countVisible = 0;

  grid.forEach((row, i) => {
    row.forEach((_, j) => {
      if(isVisible(grid, i, j)) {
        countVisible++;
      }
    });
  });

  return countVisible;
};

console.log('sample:', solution(sample1));
console.log('solution:', solution(input1));
