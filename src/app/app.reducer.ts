import { Action } from "@ngrx/store";
import { User } from "app/account/user";
import { Ship } from "app/battle/ship";
import { Projectile } from 'app/battle/projectile';

export interface AccountState {
    user: User;
}

export interface BattleState {
    playerShip: Ship;
    projectiles: Projectile[];
    monsterShips: Ship[];
}

export interface AppState {
    account: AccountState,
    battle: BattleState
}

export const initialAppState: AppState = <AppState>{
    account: { user: { id: 1, name: 'Bob' } },
    battle: { playerShip: { id: 1, userId: 1, position: { x: 1, y: 1 }, angle: 0 }, projectiles: [], monsterShips: [] }
}


export function accountReducer(state: AccountState, action: Action): AccountState {
    switch (action.type) {
        default:
            return state;
    }
}

export function battleReducer(state: BattleState, action: Action): BattleState {
    switch (action.type) {
        default:
            return state;
    }
}