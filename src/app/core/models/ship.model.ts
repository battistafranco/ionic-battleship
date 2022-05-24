/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { Position } from './position.model';

export class Ship {
  private _hits: number;
  private _positions: Position[];
  private _size: number;

  constructor(size = 0) {
    this._positions = [];
    this._size = size;
    this._hits = 0;
  }

  public get size(): number {
    return this._size ? this._size : this._positions.length;
  }

  public get positions(): Position[] {
    return this._positions;
  }

  public get hits(): number {
    return this._hits;
  }

  public get isDestroyed(): boolean {
    return this._hits === this.size;
  }

  public build(positions: Position[]) {
    if (positions.length === 0) {
      alert('positions can not be empty.');
    }

    if (this._size > 0 && this._size !== positions.length) {
      alert(
        `positions length should be ${this._size} instead ${positions.length}`,
      );
    }

    if (this._positions.length > 0) {
      alert('this ship is already builded.');
    }

    this._positions = positions;
  }

  public hit(): void {
    this._hits++;
  }

  public static createShip(size?: number): Ship {
    return new Ship(size);
  }

}
