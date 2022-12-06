const sample1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/sample1.txt'), 'utf8');
const input1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/input1.txt'), 'utf8');

const getStacks = (input) => {
  const lines = input.split('\n');
  const breakI = lines.indexOf('');
  const stackLines = lines.slice(0, breakI);

  const stacks = new Array(Number(stackLines.pop().at(-1))).fill([]).map(() => []);

  stackLines.reverse().forEach((stackStr) => {
    const groups = stackStr.match(/(\s{4}|\[\w\])/g);
    groups.forEach((match, i) => {
      if (match.trim()) {
        stacks[i].push(match);
      }
    });

  });

  return stacks;
};

const getCommands = (input) => {
  const lines = input.split('\n');
  const breakI = lines.indexOf('');
  const commandLines = lines.slice(breakI + 1);

  return commandLines.map((commandStr) => {
    const [qty, from , to] = commandStr.match(/\d+/g).map(Number);
    return { qty, from: from - 1, to: to - 1 };
  });
};

const solution = (input) => {
  const stacks = getStacks(input);
  const commands = getCommands(input);
  commands.forEach((command) => {
    for (let i = 0; i < command.qty; i++) {
      stacks[command.to].push(stacks[command.from].pop());
    }
  });

  return stacks.map((stack) => stack.at(-1)[1]).join('');
};

console.log('sample:', solution(sample1));
console.log('solution:', solution(input1));