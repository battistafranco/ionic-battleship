/* eslint-disable @typescript-eslint/naming-convention */
export enum POSITION_STATE {
  CLEAN = 'clean',
  HIT = 'hit',
  DESTROYED = 'destroyed',
  FAIL = 'fail',
}

export enum DIRECTION {
  RIGHT = 'right',
  LEFT = 'left',
  UP = 'up',
  DOWN = 'down',
}

export const LETTERS = [
  { letter: 'A', value: 1 },
  { letter: 'B', value: 2 },
  { letter: 'C', value: 3 },
  { letter: 'D', value: 4 },
  { letter: 'E', value: 5 },
  { letter: 'F', value: 6 },
  { letter: 'G', value: 7 },
  { letter: 'H', value: 8 },
  { letter: 'I', value: 9 },
  { letter: 'J', value: 10 },
];

export const DEFAULT_DIFFICULTY = [{ name: 'Normal', value: 100 }];

export const DIFFICULTY = [
  { name: 'Easy', value: -1 },
  { name: 'Normal', value: 100 },
  { name: 'Hard', value: 50 },
];

export enum DIFFICULTY_ENUM {
  EASY = 'Easy',
  NORMAL = 'Normal',
  HARD = 'Hard',
  CUSTOM = 'Custom',
}

export const DIMENSION = 10;

export const SHIPS_LENGTH = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
