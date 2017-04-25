import { runCycle } from 'sim/run-cycle';
import { BattleState } from "sim/state";
import { BattleAction } from "./action";
import { Direction } from "sim/direction";

export function battleReducer(state: BattleState, action: BattleAction): BattleState {
    switch (action.type) {
        case 'Battle.Move': {
            const ship = state.ships.find(x => x.id == action.payload.shipId);
            if (!ship) {
                console.warn('ship does not exist. id: ', action.payload.shipId)
                return state;
            }

            let directions = {} as any;

            if (action.payload.stop) {
                if (action.payload.direction == ship.directions.horizontal) {
                    directions = { horizontal: undefined };
                }
                else if (action.payload.direction == ship.directions.vertical) {
                    directions = { vertical: undefined };
                }
            }
            else {
                if (action.payload.direction == Direction.Left || action.payload.direction == Direction.Right) {
                    directions = { ...ship.directions, horizontal: action.payload.stop ? undefined : action.payload.direction };
                }
                else if (action.payload.direction == Direction.Down || action.payload.direction == Direction.Up) {
                    directions = { ...ship.directions, vertical: action.payload.stop ? undefined : action.payload.direction };
                }
            }

            const updatedShip = { ...ship, directions: { ...ship.directions, ...directions } };
            return { ...state, ships: state.ships.filter(x => x != ship).concat(updatedShip) };
        }
        case 'Battle.Shoot': {
            const ship = state.ships.find(x => x.id == action.payload.shipId);
            if (!ship) {
                console.warn('ship does not exist. id: ', action.payload.shipId)
                return state;
            }

            const updatedShip = { ...ship, isShooting: !action.payload.stop };

            return { ...state, ships: state.ships.filter(x => x != ship).concat(updatedShip) }
        }
        case 'Battle.Cycle': {
            return runCycle(state, action.payload.interval);
        }
        default:
            return state;
    }
}