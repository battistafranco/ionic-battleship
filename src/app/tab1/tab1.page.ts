/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { DIFFICULTY, DIFFICULTY_ENUM } from '../core/models/constants';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Tab1Page implements OnInit {
  DIFFICULTY_ENUM = DIFFICULTY_ENUM;
  constructor(
    private readonly gameService: GameService,
    private readonly router: Router,
  ) {}

  public shots = new FormControl(100, [Validators.required, Validators.min(21)]);

  ngOnInit(): void {}

  play(): void {
    const shotsRaw: string = this.shots.value;

    const shots = Number(shotsRaw);

    if (this.shots.valid && shots > 0) {
      return this.playGame(shotsRaw.toString());
    }

    this.shots.setErrors({});
  }

  selectDifficulty(value: DIFFICULTY_ENUM): void {
    const selectedDifficulty = DIFFICULTY.find(
      (difficulty) => difficulty.name === value,
    );
    this.gameService.setDifficulty(value);
    this.playGame(selectedDifficulty?.value.toString());
  }

  private playGame(shotsRaw: string = '100'): void {
    this.saveShots(shotsRaw);
    this.goToGameboard();
  }

  private saveShots(shots: string): void {
    this.gameService.setShots(Number(shots));
  }

  private goToGameboard(): void {
    this.router.navigate(['tabs/tab2']);
  }
}
