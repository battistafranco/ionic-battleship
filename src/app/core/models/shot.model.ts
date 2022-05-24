/* eslint-disable no-underscore-dangle */
import { Position } from './position.model';

export class Shot {
  private _position: Position;

  constructor(position: Position) {
    this._position = position;
  }

  public get position(): Position {
    return this._position;
  }

  public static createShot(position: Position): Shot {
    return new Shot(position);
  }
}
