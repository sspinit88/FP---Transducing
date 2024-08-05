import { transduce } from './transduce.ts';

const testOdd = (x: number): boolean => x % 2 === 1;
const testUnderFifty = (x: number): boolean => x < 50;
const duplicate = (x: number): number => x + x;
const addThree = (x: number): number => x + 3;

const mapTR =
  <V, W>(fn: (x: V) => W) =>
  <A>(reducer: (am: A, wm: W) => A) =>
  (accum: A, value: V): A =>
    reducer(accum, fn(value));
const filterTR =
  <V>(fn: (x: V) => boolean) =>
  <A>(reducer: (af: A, wf: V) => A) =>
  (accum: A, value: V): A =>
    fn(value) ? reducer(accum, value) : accum;

const testOddR = filterTR(testOdd);
const testUnderFiftyR = filterTR(testUnderFifty);
const duplicateR = mapTR(duplicate);
const addThreeR = mapTR(addThree);

const addToArray = (a: any[], v: any): any[] => {
  a.push(v);
  return a;
};

const myArray = [22, 9, 60, 24, 11, 63];

console.log(
  'transduce:',
  transduce(
    myArray,
    [testOddR, duplicateR, testUnderFiftyR, addThreeR],
    addToArray
  )
); // [ 21, 25 ]
