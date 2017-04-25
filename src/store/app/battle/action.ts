import { Time } from 'sim/time';
import { Direction } from "sim/direction";

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
        payload: { interval: Time }
    };