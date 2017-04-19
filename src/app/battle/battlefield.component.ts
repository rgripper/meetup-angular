import { Subscription } from 'rxjs/Rx';
import { Direction } from '../../store/app/battle/direction';
import { BattleStateService } from '../../store/app/battle/state.service';
import { Component, OnDestroy } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { AppState } from 'store/app/reducer';
import { BattleState } from "store/app/battle/state";
import { Ship } from "store/app/battle/ship";

type BattleStateAndPlayerShip = BattleState & { playerShip: Ship };

@Component({})
export class BattlefieldComponent implements OnDestroy {

    battle$: Observable<BattleStateAndPlayerShip>;

    private readonly subscription: Subscription;

    private readonly cycleSubscription: Subscription;

    constructor(store: Store<AppState>, battleStateService: BattleStateService) {
        this.battle$ = store.select(x => x).map(x => ({ ...x.battle, playerShip: x.battle.ships.find(s => s.playerId == x.account.player.id)}));

        this.subscription = Observable
            .merge(
                Observable.fromEvent(window, 'keyup').map((event: KeyboardEvent) => ({ key: event.key, down: false })), 
                Observable.fromEvent(window, 'keydown').map((event: KeyboardEvent) => ({ key: event.key, down: true })))
            .subscribe(event => {
                const shipId = 1;
                switch(event.key) {
                    case 'a':
                        event.down ? battleStateService.startMoving(shipId, Direction.Left) : battleStateService.stopMoving(shipId, Direction.Left);
                        return;
                    case 'd':
                        event.down ? battleStateService.startMoving(shipId, Direction.Right) : battleStateService.stopMoving(shipId, Direction.Right);
                        return;
                    case 'w':
                        event.down ? battleStateService.startMoving(shipId, Direction.Up) : battleStateService.stopMoving(shipId, Direction.Up);
                        return;
                    case 's':
                        event.down ? battleStateService.startMoving(shipId, Direction.Down) : battleStateService.stopMoving(shipId, Direction.Down);
                        return;
                }
            });

            this.cycleSubscription = Observable.interval(25).subscribe(() => battleStateService.runCycle());
        // this.projectiles$ = <any>Observable
        //     .interval(50)
        //     .map(n => [
        //         {
        //             id: 1,
        //             position: { x: 110, y: 110 }
        //         },
        //         {
        //             id: 2,
        //             position: { x: n * 15, y: n * 15 }
        //         }
        //     ]);
        // .scan((acc, value) => value.map(x2 => ({
        //     ...x2,
        //     angle: acc.length ? this.getAngle(x2.position, acc.find(x1 => x1.id == x2.id)!.position) : 0
        // })), []);
    }

    // private getAngle(position1: Position, position2: Position) {
    //     return Math.atan2(position2.y - position1.y, position2.x - position1.x) * 180 / Math.PI - 90;
    // }

    trackById(_index: number, item: { id: number }) {
        return item.id;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.cycleSubscription.unsubscribe();
    }
}