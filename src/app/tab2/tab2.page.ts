/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CellBoard } from '../core/models/cell-board.model';
import { DIFFICULTY_ENUM, POSITION_STATE } from '../core/models/constants';
import { GameBoard } from '../core/models/game-board.model';
import { Ship } from '../core/models/ship.model';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tab2Page implements OnInit, OnDestroy {
  private _gameboard!: GameBoard;
  private _shots = -1;
  private _shipsDestroyed = 0;
  private _difficulty: DIFFICULTY_ENUM = DIFFICULTY_ENUM.NORMAL;
  private subs: Subscription[] = [];
  constructor(
    private readonly gameService: GameService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.gameService.buildGame();
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  public get shipsDestroyed(): number {
    return this._shipsDestroyed;
  }

  public get canPlay(): boolean {
    return this.shots !== 0;
  }

  public get isWinner(): boolean {
    return this._shipsDestroyed === this._gameboard.ships.length;
  }

  public get gameboard(): GameBoard {
    return this._gameboard;
  }

  public get shots(): number {
    return this._shots;
  }

  public get difficulty(): DIFFICULTY_ENUM {
    return this._difficulty;
  }

  public restart(): void {
    this.gameService.restart();
  }

  public back(): void {
    this.router.navigate(['tabs/tab1']);
  }

  private initSubscriptions(): void {
    this.subs.push(
      this.gameService.getShots().subscribe((shots) => {
        this.setShots(shots);
      }),
    );

    this.subs.push(
      this.gameService.getGameboard().subscribe((gameboard) => {
        this.setGameboard(gameboard);
      }),
    );

    this.subs.push(
      this.gameService.difficulty$.subscribe((difficulty: DIFFICULTY_ENUM) => {
        this._difficulty = difficulty;
      }),
    );

    this.subs.push(
      this.gameService.restart$.subscribe(() => {
        console.log('this.restart');
        this._shipsDestroyed = 0;
      }),
    );
  }

  private setShots(shots: number): void {
    this._shots = shots;
  }

  private setGameboard(gameboard: GameBoard): void {
    this._gameboard = gameboard;
  }

  public fireShot(x: number, y: number): void {
    if (!this.canPlay || this.isWinner) {
      return;
    }

    const cellBoard = this.getCell(x, y);

    if (cellBoard.state !== POSITION_STATE.CLEAN) {
      return;
    }

    this.decreaseShot();

    cellBoard.setState(POSITION_STATE.FAIL);

    if (cellBoard.isShip) {
      const ship = this.findShip(x, y);

      if (ship) {
        ship.hit();
      }

      cellBoard.setState(POSITION_STATE.HIT);

      if (ship?.isDestroyed) {
        this.destroyShip(ship);
      }
    }
  }

  private destroyShip(ship: Ship): void {
    ship.positions.forEach(({ x, y }) => {
      const cellboard = this.getCell(x, y);

      cellboard.setState(POSITION_STATE.DESTROYED);
    });
    this._shipsDestroyed++;
  }

  private findShip(x: number, y: number): Ship | undefined {
    const position = JSON.stringify({ x, y });

    return this.getShips().find((ship) => {
      const mapping = ship.positions.map((a) => ({ x: a.x, y: a.y }));
      const shipFound = mapping.find((a) => JSON.stringify(a) === position);
      return shipFound;
    });
  }

  private getCell(x: number, y: number): CellBoard {
    const board = this.getBoard();

    return board[x][y];
  }

  public getBoard(): CellBoard[][] {
    return this._gameboard.board;
  }

  private getShips(): Ship[] {
    return this._gameboard.ships;
  }

  private decreaseShot(): void {
    this._shots--;
  }
}
