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

    const isTouching = Math.abs(lead.x - trail.x) <= 1 && Math.abs(lead.y - trail.y) <= 1;

    let xMove = 0;
    let yMove = 0;

    // Too far from x axis
    if (lead.y === trail.y) {
      if (lead.x - trail.x > 1) xMove = 1;
      if (trail.x - lead.x > 1) xMove = -1;
    }
    // Too far from y axis
    else if (lead.x === trail.x) {
      if (lead.y - trail.y > 1) yMove = 1;
      if (trail.y - lead.y > 1) yMove = -1;
    }
    // Too far in quadrant 1
    else if (lead.x > trail.x && lead.y > trail.y && !isTouching) {
      xMove = 1;
      yMove = 1;
    }
    // Too far in quadrant 2
    else if (lead.x > trail.x && trail.y > lead.y && !isTouching) {
      xMove = 1;
      yMove = -1;
    }
    // Too far in quadrant 3
    else if (trail.x > lead.x && trail.y > lead.y && !isTouching) {
      xMove = -1;
      yMove = -1;
    }
    // Too far in quadrant 4
    else if (trail.x > lead.x && lead.y > trail.y && !isTouching) {
      xMove = -1;
      yMove = 1;
    }

    this.movePiece(trailI, xMove, yMove);
  }

  movePiece(pieceI, x, y) {
    const curSection = this.sections[pieceI];
    this.sections[pieceI] = { x: curSection.x + x, y: curSection.y + y };
    if (this.sections.length - 1 === pieceI) {
      this.tailVisitedPos.add(`${this.sections[pieceI].x},${this.sections[pieceI].y}`);
    }
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
}

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
