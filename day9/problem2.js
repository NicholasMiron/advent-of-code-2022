const sample1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/sample1.txt'), 'utf8');
const input1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/input1.txt'), 'utf8');


class Rope {
  constructor(ropeLen) {
    this.sections = new Array(ropeLen).fill(null).map(() => ({ x: 1000, y: 1000 }));
    this.head = { x: 1000, y: 1000 };
    this.tail = { x: 1000, y: 1000 };
    this.tailVisitedPos = new Set(['1000,1000']);
  }

  trailSectionMove(leadI, trailI) {
    const lead = this.sections[leadI];
    const trail = this.sections[trailI];

    const xDiff = lead.x - trail.x;
    const yDiff = lead.y - trail.y;

    const toFar = {
      up: yDiff === 2 && xDiff === 0,
      down: yDiff === -2 && xDiff === 0,
      left: yDiff === 0 && xDiff === -2,
      right: yDiff === 0 && xDiff === 2,
      quad1: (xDiff === 1 && yDiff === 2) || (xDiff === 2 && yDiff === 1) || (xDiff === 2 && yDiff === 2),
      quad2: (xDiff === 2 && yDiff === -1) || (xDiff === 1 && yDiff === -2) || (xDiff === 2 && yDiff === -2),
      quad3: (xDiff === -1 && yDiff === -2) || (xDiff === -2 && yDiff === -1) || (xDiff === -2 && yDiff === -2),
      quad4: (xDiff === -2 && yDiff === 1) || (xDiff === -1 && yDiff === 2) || (xDiff === -2 && yDiff === 2),
    };

    if (toFar.right) this.movePiece(trailI, 1, 0);
    else if (toFar.left) this.movePiece(trailI, -1, 0);
    else if (toFar.up) this.movePiece(trailI, 0, 1);
    else if (toFar.down) this.movePiece(trailI, 0, -1);
    else if (toFar.quad1) this.movePiece(trailI, 1, 1);
    else if (toFar.quad2) this.movePiece(trailI, 1, -1);
    else if (toFar.quad3) this.movePiece(trailI, -1, -1);
    else if (toFar.quad4) this.movePiece(trailI, -1, 1);
  }

  movePiece(pieceI, x, y) {
    const curSection = this.sections[pieceI];
    this.sections[pieceI] = { x: curSection.x + x, y: curSection.y + y };
    if (this.sections.length - 1 === pieceI) this.tailVisitedPos.add(`${curSection.x},${curSection.y}`);
  }

  move(direction) {
    const headMoves = { 'L': [-1, 0], 'R': [1, 0], 'U': [0, 1], 'D': [0, -1] };
    this.movePiece(0, ...headMoves[direction]);

    for (let i = 1; i < this.sections.length; i++) {
      this.trailSectionMove(i - 1, i);
    }
  }

  print() {
    const board = new Array(this.sections.length * 2)
      .fill(null)
      .map(() => (new Array(this.sections.length * 2).fill('.')))

    const baseX = Number(this.sections[0].x);
    const baseY = Number(this.sections[0].y);

    this.sections.forEach((section, i) => {
      board[section.y - baseY + this.sections.length][Number(section.x- baseX + this.sections.length)] = i + '';
    });

    console.log(board.map((line) => line.join('')).reverse().join('\n'));
    console.log('----------');
  }
}

function range (rng, cb) {
  for (let i = 0; i < rng; i++) {
    cb()
  }
};

const solution = (input) => {
  const commands = input
    .split('\n')
    .map((command) => {
      const [move, dist] = command.split(' ');
      return [move, Number(dist)];
    });

  const rope = new Rope(10);

  commands.forEach(([move, distance]) => {
    range(distance, () => rope.move(move));
  });

  return rope.tailVisitedPos.size;
};

console.log('sample:', solution(sample1));
console.log('solution:', solution(input1));
