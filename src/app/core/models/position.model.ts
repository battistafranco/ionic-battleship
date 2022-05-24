import { DIRECTION } from './constants';

export class Position {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public static addPosition(refPos: Position, sense: DIRECTION): Position {
    let newPos: Position;

    switch (sense) {
      case DIRECTION.RIGHT:
        newPos = this.createPosition(refPos.x + 1, refPos.y);
        break;

      case DIRECTION.LEFT:
        newPos = this.createPosition(refPos.x - 1, refPos.y);
        break;

      case DIRECTION.UP:
        newPos = this.createPosition(refPos.x, refPos.y + 1);
        break;

      case DIRECTION.DOWN:
        newPos = this.createPosition(refPos.x, refPos.y - 1);
        break;

      default:
        newPos = refPos;
        break;
    }

    return newPos;
  }
  public static createPosition(x: number, y: number): Position {
    return new Position(x, y);
  }
}
