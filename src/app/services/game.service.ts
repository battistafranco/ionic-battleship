/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import {
  DIFFICULTY_ENUM,
  DIMENSION,
  SHIPS_LENGTH,
} from './../core/models/constants';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { GameBoard } from 'src/app/core/models/game-board.model';
import { Ship } from 'src/app/core/models/ship.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private _gameboard: BehaviorSubject<GameBoard> = new BehaviorSubject(
    GameBoard.createGameBoard(DIMENSION, []),
  );

  private _shots: BehaviorSubject<number> = new BehaviorSubject(100);
  shots$ = this._shots.asObservable();
  inital_shots = 100;
  private _difficulty: BehaviorSubject<DIFFICULTY_ENUM> = new BehaviorSubject<
    DIFFICULTY_ENUM
  >(DIFFICULTY_ENUM.NORMAL);
  difficulty$ = this._difficulty.asObservable();

  private _restart: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );
  restart$ = this._restart.asObservable();

  constructor() {}

  public restart(): void {
    this.buildGame();
    this._restart.next(true);
  }

  public getShots(): Observable<number> {
    return this.shots$;
  }

  public setShots(shots: number): void {
    this.inital_shots = shots;
    this._shots.next(shots);
  }

  public setDifficulty(value: DIFFICULTY_ENUM | undefined): void {
    if (value) {
      this._difficulty.next(value);
    } else {
      this._difficulty.next(DIFFICULTY_ENUM.CUSTOM);
    }
  }

  public getGameboard(): Observable<GameBoard> {
    return this._gameboard;
  }

  createGameboard(dimension: number, ships: Ship[]): GameBoard {
    return GameBoard.createGameBoard(dimension, ships);
  }

  loadGameboard(gameboard: GameBoard): void {
    this._gameboard.next(gameboard);
  }

  createShip(size?: number): Ship {
    return Ship.createShip(size);
  }

  buildGame(): void {
    const ships = this.createShips();
    const gameboard = this.createGameboard(DIMENSION, ships);
    this.setShots(this.inital_shots);
    this.loadGameboard(gameboard);
  }

  private createShips(): Ship[] {
    const ship_lenghts = SHIPS_LENGTH;
    return ship_lenghts.map((ship) => this.createShip(ship));
  }
}
