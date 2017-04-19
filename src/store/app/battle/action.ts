import { Direction } from "store/app/battle/direction";

export type BattleAction =
    | {
        type: 'Battle.Move',
        payload: { shipId: number, stop?: boolean, direction: Direction }
    }
    | {
        type: 'Battle.Shoot',
        payload: { shipId: number, stop?: boolean }
    }
    | {
        type: 'Battle.Cycle',
        payload: undefined
    };