/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { POSITION_STATE } from './constants';
import { Position } from './position.model';

export class CellBoard {
  private _position: Position;
  private _state: POSITION_STATE;
  private _isShip: boolean;

  constructor(position: Position) {
    this._position = position;
    this._state = POSITION_STATE.CLEAN;
    this._isShip = false;
  }

  public get isShip(): boolean {
    return this._isShip;
  }

  public get state(): POSITION_STATE {
    return this._state;
  }

  public get position(): Position {
    return this._position;
  }

  public setState(newState: POSITION_STATE): void {
    this._state = newState;
  }

  public setShip(): void {
    this._isShip = true;
  }

  public static createCellBoard(position: Position): CellBoard {
    return new CellBoard(position);
  }

}
