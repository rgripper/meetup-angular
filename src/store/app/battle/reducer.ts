import { runCycle } from './process-cycle';
import { BattleState } from "./state";
import { BattleAction } from "./action";
import { Direction } from "store/app/battle/direction";

export function battleReducer(state: BattleState, action: BattleAction): BattleState {
    switch (action.type) {
        case 'Battle.Move': {
            const ship = state.ships.find(x => x.id == action.payload.shipId);
            if (!ship) {
                console.log('ship does not exist. id: ', action.payload.shipId)
                return state;
            }

            let directions: any = {};

            if (action.payload.direction == Direction.Left || action.payload.direction == Direction.Right) {
                directions = { ...ship.directions, horizontal: action.payload.stop ? undefined : action.payload.direction };
            }
            else if (action.payload.direction == Direction.Down || action.payload.direction == Direction.Up) {
                directions = { ...ship.directions, vertical: action.payload.stop ? undefined : action.payload.direction };
            }

            const updatedShip = { ...ship, directions };
            return { ...state, ships: state.ships.filter(x => x != ship).concat(updatedShip) };
        }
        case 'Battle.Shoot': {
            const ship = state.ships.find(x => x.id == action.payload.shipId);
            if (!ship) {
                console.log('ship does not exist. id: ', action.payload.shipId)
                return state;
            }

            const updatedShip = { ...ship, isShooting: !action.payload.stop };
            console.log(updatedShip);
            return { ...state, ships: state.ships.filter(x => x != ship).concat(updatedShip) }
        }
        case 'Battle.Cycle': {
            return runCycle(state);
        }
        default:
            return state;
    }
}