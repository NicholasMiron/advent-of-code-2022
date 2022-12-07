const sample1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/sample1.txt'), 'utf8');
const input1 = require('fs').readFileSync(require('path').resolve(__dirname, './inputs/input1.txt'), 'utf8');


const isCd = (line) => line.includes('$ cd ');
const isCdOut = (line) => isCd(line) && line.slice(-2) === '..';
const isFile = (line) => /\d+ .+/.test(line);
const isDir = (line) => /dir .+/.test(line);
const getNewDir = (name) => {
  return {
    name,
    childDirs: new Map(),
    parentDir: null,
    files: new Set(),
    size: 0,
  };
};

const addSizes = (dir) => {
  let totalSize = dir.size;
  dir.childDirs.forEach((child) => totalSize += addSizes(child));

  dir.totalSize = totalSize;
  return dir.totalSize;
};

const getSmallDirsSum = (dir, max) => {
  let total = 0;
  if (dir.totalSize < max) total += dir.totalSize;
  dir.childDirs.forEach((child) => total += getSmallDirsSum(child, max));

  return total;
};

const solution = (input) => {
  const lines = input.split('\n');
  let curDirectory = getNewDir('/');
  const root = curDirectory;

  lines.slice(1).forEach((line) => {
    if (isDir(line)) {
      const dirName = line.match(/dir\s(.+)/)[1];
      if (!curDirectory.childDirs.has(dirName)) {
        const newDir = getNewDir(dirName);
        curDirectory.childDirs.set(dirName, newDir);
        newDir.parentDir = curDirectory;
      }
    }
    else if (isFile(line)) {
      const [_, size, name] = line.match(/(\d+) (.+)/);
      curDirectory.files.add(name);
      curDirectory.size += Number(size);
    }
    else if (isCdOut(line)) {
      curDirectory = curDirectory.parentDir;
    }
    else if (isCd(line)) {
      const dirName = line.match(/cd (.+)/)[1];
      if (!curDirectory.childDirs.has(dirName)) {
        const newDir = getNewDir(dirName);
        curDirectory.childDirs.set(dirName, newDir);
        newDir.parentDir = curDirectory;
      }
      curDirectory = curDirectory.childDirs.get(dirName);
    }
  });

  addSizes(root);
  return getSmallDirsSum(root, 100000);
};

console.log('sample:', solution(sample1));
console.log('solution:', solution(input1));