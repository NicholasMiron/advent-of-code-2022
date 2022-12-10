const sample1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/sample1.txt'), 'utf8');
const input1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/input1.txt'), 'utf8');

const solution = (input) => {
  const commands = input.split('\n').map((line) => line.split(' '));
  const cycleChecks = new Set([20, 60, 100, 140, 180, 220]);
  let totalSignalStrength = 0;
  let register = 1;
  let cycleCount = 1;

  commands.forEach(([command, value]) => {
    if (cycleChecks.has(cycleCount)) totalSignalStrength += cycleCount * register;
    cycleCount++;

    if (command === 'addx') {
      if (cycleChecks.has(cycleCount)) totalSignalStrength += cycleCount * register;
      cycleCount++;
      register += Number(value);
    }
  });

  return totalSignalStrength;
};

console.log('sample:', solution(sample1));
console.log('solution:', solution(input1));