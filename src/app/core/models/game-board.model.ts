/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { DIRECTION } from './constants';
import { CellBoard } from './cell-board.model';

import { Position } from './position.model';
import { Ship } from './ship.model';

type CellMatrix = CellBoard[][];

const getRandomInt = (limit: number) => {
  const random = Math.floor(Math.random() * limit) - 1;

  return random >= 0 ? random : 0;
};

const senses = [DIRECTION.RIGHT, DIRECTION.LEFT, DIRECTION.DOWN, DIRECTION.UP];

const MAX_RETRY = 1000;

export class GameBoard {
  private _board: CellMatrix;
  private _dimension: number;
  private _unBuildedShips: Ship[];
  private _ships: Ship[];

  constructor(dimension: number, ships: Ship[]) {
    this._dimension = dimension;
    this._unBuildedShips = ships;
    this._board = [];
    this._ships = [];

    this.build();
  }

  public get dimension(): number {
    return this._dimension;
  }

  public get board(): CellMatrix {
    return this._board;
  }

  public get ships(): Ship[] {
    return this._ships;
  }

  private build(): void {
    this._board = this.createGameBoard();
    this.buildShips(this._board);
  }

  private createGameBoard(): CellMatrix {
    let row: CellBoard[];
    const matrix: Array<CellBoard[]> = [];

    for (let x = 0; x < this._dimension; x++) {
      row = [];

      for (let y = 0; y < this._dimension; y++) {
        const position = Position.createPosition(x, y);
        const cellBoard = CellBoard.createCellBoard(position);

        row.push(cellBoard);
      }

      matrix.push(row);
    }

    return matrix;
  }

  private buildShips(board: CellMatrix): void {
    const build = (ship: Ship) => {
      const positions = this.createShipPositions(ship.size, board);

      ship.build(positions);

      board = this.insertShipOnBoard(ship, board);

      return ship;
    };
    this._ships = this._unBuildedShips.map((ship) => build(ship));
  }

  private createShipPositions(size: number, board: CellMatrix): Position[] {
    if (size === 1) {
      return [this.createEmptyPosition(board)];
    }

    const positions: Position[] = this.findPositions(size, board);

    return positions;
  }

  private findPositions(
    size: number,
    board: CellMatrix,
    retry = 0,
  ): Position[] {
    if (retry === MAX_RETRY) {
      alert('cant create position for this ship.');
    }

    retry++;
    const startPosition = this.createEmptyPosition(board);
    let positions: Position[] = [startPosition];

    let prevPosition = startPosition;
    const sizeThreshold = size;
    const senseThreshold = senses.length;
    let senseChanges = 0;
    let senseRandom = getRandomInt(senses.length);
    let vectorPosition = 1;
    let done = false;
    let fail = false;
    let sense: DIRECTION;
    let newPosition: Position;

    while (!done) {
      let isEmpty = false;
      sense = senses[senseRandom];
      newPosition = Position.addPosition(prevPosition, sense);

      if (prevPosition.x !== newPosition.x || prevPosition.y !== newPosition.y) {
        isEmpty = this.isEmptyPosition(newPosition, board);
      }

      if (isEmpty) {
        prevPosition = newPosition;
        positions.push(newPosition);

        vectorPosition++;
      } else {
        positions = [startPosition];
        prevPosition = startPosition;
        vectorPosition = 1;
        senseChanges++;
        senseRandom++;
      }

      if (senseRandom > senseThreshold) {
        senseRandom = 0;
      }

      if (senseChanges === senseThreshold) {
        fail = true;
        done = true;
      }

      if (vectorPosition === sizeThreshold) {
        done = true;
      }
    }

    if (fail) {
      return this.findPositions(size, board, retry);
    }

    return positions;
  }

  private createEmptyPosition(board: CellMatrix): Position {
    const newPosition = this.createRandomPosition();

    if (this.isEmptyPosition(newPosition, board)) {return newPosition;};

    return this.createEmptyPosition(board);
  }

  private createRandomPosition(): Position {
    const x = getRandomInt(this._dimension);
    const y = getRandomInt(this._dimension);

    return Position.createPosition(x, y);
  }

  private isEmptyPosition(position: Position, board: CellMatrix): boolean {
    try {
      const cell = board[position.x][position.y];

      const { isShip } = cell;

      return !isShip;
    } catch (error) {
      return false;
    }
  }

  private insertShipOnBoard(ship: Ship, board: CellMatrix): CellMatrix {
    ship.positions.forEach((position) => {
      const cellBoard = board[position.x][position.y];

      cellBoard.setShip();

      board[position.x][position.y] = cellBoard;
    });

    return board;
  }

  public static createGameBoard(dimension: number, ships: Ship[]): GameBoard {
    return new GameBoard(dimension, ships);
  }
}
