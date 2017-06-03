import { AccountState } from "./account/state";
import { BattleState } from "sim/state";
import { Direction } from "sim/direction";

export interface AppState {
    account: AccountState,
    battle: BattleState
}

export const initialAppState: AppState = {
    account: {
        player: { id: 1, name: 'Bob' }
    },
    battle: {
        elapsedTime: 0,
        field: { position: { x: 0, y: 0 }, size: { width: 640, height: 480 } },
        projectiles: [],
        playerScores: [{ playerId: 1, score: 0 }, { playerId: 2, score: 0 }],
        ships: [
            {
                id: 0,
                playerId: 1,
                health: { maximum: 200, current: 200 },
                position: { x: 1, y: 1 },
                size: { width: 50, height: 50 },
                speed: 4,
                directions: { },
                emergence: 0,
                scoreOnDestruction: 10,
                isShooting: false,
                weaponMount: {
                    direction: Direction.Right,
                    weapon: { id: 1, damage: 3 }
                }
            }
        ]
    }
}