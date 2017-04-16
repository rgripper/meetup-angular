import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { AppState } from 'store/app/reducer';
import { BattleState } from "store/app/battle/state";

@Component({})
export class BattlefieldComponent {

    battle$: Observable<BattleState>;

    constructor(store: Store<AppState>) {
        this.battle$ = store.select(x => x.battle);

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

}