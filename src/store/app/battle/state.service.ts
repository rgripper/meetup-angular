import { AppState } from '../reducer';
import { Direction } from "./direction";
import { Store } from "@ngrx/store";
import { Injectable } from "@angular/core";

export type BattleAction =
    | {
        type: 'Battle.Move',
        payload: { shipId: number, stop?: boolean, direction: Direction }
    }
    | {
        type: 'Battle.Shoot',
        payload: { shipId: number, stop?: boolean }
    };

@Injectable()
export class BattleStateService {
    constructor(private store: Store<AppState>) {
    }

    startMoving(shipId: number, direction: Direction) {
        console.log('moving!');
        this.store.dispatch({ type: 'Battle.Move', payload: { shipId, direction } });
    }

    stopMoving(shipId: number, direction: Direction) {
        console.log('stopped moving!');
        this.store.dispatch({ type: 'Battle.Move', payload: { shipId, stop: true, direction } });
    }

    startShooting(shipId: number) {
        this.store.dispatch({ type: 'Battle.Shoot', payload: { shipId } });
    }

    stopShooting(shipId: number) {
        this.store.dispatch({ type: 'Battle.Shoot', payload: { shipId, stop: true } });
    }
}