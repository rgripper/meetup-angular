import { BattleAction } from './action';
import { AppState } from '../state';
import { Direction } from "./direction";
import { Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Time } from "store/app/battle/time";

@Injectable()
export class BattleStateService {
    constructor(private store: Store<AppState>) {
    }

    startMoving(shipId: number, direction: Direction) {
        console.log('moving!');
        this.dispatch({ type: 'Battle.Move', payload: { shipId, direction } });
    }

    stopMoving(shipId: number, direction: Direction) {
        console.log('stopped moving!');
        this.dispatch({ type: 'Battle.Move', payload: { shipId, stop: true, direction } });
    }

    startShooting(shipId: number) {
        this.dispatch({ type: 'Battle.Shoot', payload: { shipId } });
    }

    stopShooting(shipId: number) {
        this.dispatch({ type: 'Battle.Shoot', payload: { shipId, stop: true } });
    }

    runCycle(interval: Time) {
        this.dispatch({ type: 'Battle.Cycle', payload: { interval } });
    }

    private dispatch(action: BattleAction) {
        this.store.dispatch(action);
    }
}