const sample1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/sample1.txt'), 'utf8');
const input1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/input1.txt'), 'utf8');

const solution = (input) => {
  const commands = input.split('\n').map((line) => line.split(' '));
  const cycleChecks = new Set([20, 60, 100, 140, 180, 220]);

  let cycleCount = 1;
  let output = '';
  let register = 1;

  const cycle = () => {
    if (register - 1 === (cycleCount - 1) % 40 || register === (cycleCount - 1) % 40 || register + 1 === (cycleCount - 1) % 40) {
      output += '#';
    } else {
      output += '.';
    }
    cycleCount += 1;
  }

  commands.forEach(([command, value]) => {
    cycle();

    if (command === 'addx') {
      cycle();
      register += Number(value);
    }
  })

  return output.match(/.{40}/g);
};

console.log('sample:', solution(sample1));
console.log('solution:', solution(input1));