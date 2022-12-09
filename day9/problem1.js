const sample1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/sample1.txt'), 'utf8');
const input1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/input1.txt'), 'utf8');


class Rope {
  constructor() {
    this.head = { x: 1000, y: 1000 };
    this.tail = { x: 1000, y: 1000 };
    this.tailVisitedPos = new Set(['1000,1000']);
  }

  tailMove() {
    if (this.head.y === this.tail.y) {
      if (this.head.x - this.tail.x > 1) this.move('tail', 1, 0);
      if (this.tail.x - this.head.x > 1) this.move('tail', -1, 0);
    }
    else if (this.head.x === this.tail.x) {
      if (this.head.y - this.tail.y > 1) this.move('tail', 0, 1);
      if (this.tail.y - this.head.y > 1) this.move('tail', 0, -1);
    }
    else if ((this.head.x - this.tail.x > 1 && this.head.y - this.tail.y === 1) || this.head.x - this.tail.x === 1 && this.head.y - this.tail.y > 1) {
      this.move('tail', 1, 1);
    }
    else if ((this.head.x - this.tail.x > 1 && this.tail.y - this.head.y === 1) || this.head.x - this.tail.x === 1 && this.tail.y - this.head.y > 1) {
      this.move('tail', 1, -1);
    }
    else if ((this.tail.x - this.head.x > 1 && this.tail.y - this.head.y === 1) || this.tail.x - this.head.x === 1 && this.tail.y - this.head.y > 1) {
      this.move('tail', -1, -1);
    }
    else if ((this.tail.x - this.head.x > 1 && this.head.y - this.tail.y === 1) || this.tail.x - this.head.x === 1 && this.head.y - this.tail.y > 1) {
      this.move('tail', -1, 1);
    }
    // this.print();
  }

  move(piece, x, y) {
    this[piece] = { x: this[piece].x + x, y: this[piece].y + y };
    if (piece === 'tail') this.tailVisitedPos.add(`${this.tail.x},${this.tail.y}`);
  }

  moveL() {
    this.move('head', -1, 0);
    this.tailMove();
  }

  moveR() {
    this.move('head', 1, 0);
    this.tailMove();
  }

  moveU() {
    this.move('head', 0, 1);
    this.tailMove();
  }

  moveD() {
    this.move('head', 0, -1);
    this.tailMove();
  }

  print() {
    const board = [
      ['.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.'],
    ]
    board[this.head.y - 1000][this.head.x - 1000] = 'H';
    board[this.tail.y - 1000][this.tail.x - 1000] = 'T';

    console.log(board.reverse());
  }

}

function range (rng, cb) {
  for (let i = 0; i < rng; i++) {
    cb()
  }
}
const solution = (input) => {
  const commands = input
    .split('\n')
    .map((command) => {
      var [move, dist] = command.split(' ');
      return [move, Number(dist)];
    });

  const rope = new Rope();
  // rope.print();

  commands.forEach(([move, dist]) => {
    range(dist, rope[`move${move}`].bind(rope));
  });



  return rope.tailVisitedPos.size;
};

console.log('sample:', solution(sample1));
console.log('solution:', solution(input1));