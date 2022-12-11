const sample1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/sample1.txt'), 'utf8');
const input1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/input1.txt'), 'utf8');


class Monkey {
  constructor(info) {
    this.id = info.id;
    this.items = info.items;
    this.worryLevel = this.items[0] || 0;
    this.operation = info.operation;
    this.testVal = info.testVal;
    this.test = () => !(this.worryLevel % this.testVal);
    this.pass = info.pass;
    this.fail = info.fail;
    this.numInspections = 0;
  }

  inspect(modulo) {
    const distribute = {};

    while(this.items.length) {
      this.numInspections += 1;
      const itemWorryLevel = this.items.shift();
      this.worryLevel = this.operation(itemWorryLevel) % modulo;


      let passTo = this.test() ? this.pass : this.fail;
      if (!distribute[passTo]) distribute[passTo] = [];
      distribute[passTo].push(this.worryLevel);
    }

    return distribute;
  }

  receive(items) {
    this.items.push(...items);
  }

  static parseMonkeyInfo(infoStr) {
    const [monkeyS, itemsS, operationS, testS, passS, failS] = infoStr.split('\n');

    const id = monkeyS.match(/\d+/)[0];
    const items = itemsS.match(/\d+/g)?.map(Number) || [];
    const pass = Number(passS.match(/\d+/)[0]);
    const fail = Number(failS.match(/\d+/)[0]);
    const testVal = Number(testS.match(/\d+/)[0]);
    let [_, operator, operationVal] = operationS.match(/old ([\+\*]) (\d+|old)/);

    const operation = operator === '+'
      ? (curLevel) => curLevel + (operationVal === 'old' ? curLevel : Number(operationVal))
      : (curLevel) => curLevel * (operationVal === 'old' ? curLevel : Number(operationVal));

    return { id, items, testVal, pass, fail, operation };
  }
}
const solution = (input) => {
  const monkeys = input
    .split("\n\n")
    .map((infoStr) => {
      return new Monkey(Monkey.parseMonkeyInfo(infoStr));
    });

  const monkeysMap = new Map();
  monkeys.forEach((monkey) => monkeysMap.set(monkey.id, monkey));

  const modulo = monkeys.reduce((mod, monkey) => mod * monkey.testVal, 1);

  for (let i = 0; i < 10000; i++) {
    monkeys.forEach((monkey) => {
      const distribution = monkey.inspect(modulo);
      Object.entries(distribution).forEach(([id, items]) => {
        monkeysMap.get(id).receive(items);
      });
    });
  }

  const operations = monkeys.map((monkey) => monkey.numInspections).sort((a, b) => a > b ? 1 : -1);
  return operations.pop() * operations.pop();

};

console.log('sample:', solution(sample1));
console.log('solution:', solution(input1));