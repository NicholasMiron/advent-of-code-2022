const sample1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/sample1.txt'), 'utf8');
const input1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/input1.txt'), 'utf8');


const intersection = (...args) => {
  const intersects = new Set(args[0]);

  args.slice(1).forEach((arg) => {
    const argS = new Set(arg);
    intersects.forEach((char) => {
      if (!argS.has(char)) intersects.delete(char);
    });
  })

  return [...intersects.values()];
};

const solution = (input) => {
  const points = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  return input
    .split('\n')
    .reduce((acc, cur, i, initial) => i % 3 === 0 ? [...acc, initial.slice(i, i + 3)] : acc, [])
    .map((arr) => intersection(...arr)[0])
    .reduce((total, cur) => total + points.indexOf(cur), 0);
};

console.log('sample:', solution(sample1));
console.log('solution:', solution(input1));
