import { Subscription } from 'rxjs/Rx';
import { Direction } from 'sim/direction';
import { BattleStateService } from '../../store/app/battle/state.service';
import { Component, OnDestroy } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { AppState } from 'store/app/state';
import { BattleState } from "sim/state";

@Component({})
export class BattlefieldComponent implements OnDestroy {

    battle$: Observable<BattleState>;

    private readonly subscription: Subscription;

    private readonly cycleSubscription: Subscription;

    private readonly cycleInterval = 50;

    constructor(store: Store<AppState>, battleStateService: BattleStateService) {
        this.battle$ = store.select(x => x.battle);

        this.subscription = Observable
            .merge(
                Observable.fromEvent(window, 'keyup').map((event: KeyboardEvent) => ({ key: event.key, down: false })), 
                Observable.fromEvent(window, 'keydown').map((event: KeyboardEvent) => ({ key: event.key, down: true })))
            .subscribe(event => {
                const shipId = 0;
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
                    case 'Enter':
                        event.down ? battleStateService.startShooting(shipId) : battleStateService.stopShooting(shipId);
                }
            });

            this.cycleSubscription = Observable.interval(this.cycleInterval).subscribe(() => battleStateService.runCycle(this.cycleInterval));
    }

    trackById(_index: number, item: { id: number }) {
        return item.id;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.cycleSubscription.unsubscribe();
    }
}