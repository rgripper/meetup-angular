import { AccountState } from "./account/state";
import { BattleState } from "./battle/state";

export interface AppState {
    account: AccountState,
    battle: BattleState
}

export const initialAppState: AppState = <AppState>{
    account: { user: { id: 1, name: 'Bob' } },
    battle: { playerShip: { id: 1, userId: 1, position: { x: 1, y: 1 }, angle: 90 }, projectiles: [], monsterShips: [] }
}