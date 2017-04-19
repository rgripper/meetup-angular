import { AccountState } from "./account/state";
import { BattleState } from "./battle/state";

export interface AppState {
    account: AccountState,
    battle: BattleState
}

export const initialAppState: AppState = {
    account: {
        player: { id: 1, name: 'Bob' }
    },
    battle: {
        fieldSize: { width: 640, height: 480 },
        projectiles: [],
        ships: [
            {
                id: 1,
                playerId: 1,
                position: { x: 1, y: 1 },
                size: { width: 50, height: 50 },
                speed: 4,
                directions: { }
            }
        ]
    }
}