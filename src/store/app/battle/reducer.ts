import { BattleState } from "./state";
import { BattleAction } from "store/app/battle/state.service";

export function battleReducer(state: BattleState, action: BattleAction): BattleState {
    switch (action.type) {
        case 'Battle.Move': {
            const ship = state.ships.find(x => x.id == action.payload.shipId);
            if (!ship) {
                console.log('ship does not exist. id: ', action.payload.shipId)
                return state;
            }

            let directions: any = {};
            if (action.payload.stop) {
                if (action.payload.direction == ship.directions.horizontal) {
                    directions = { ...ship.directions, horizontal: undefined };
                }
                if (action.payload.direction == ship.directions.vertical) {
                    directions = { ...ship.directions, vertical: undefined };
                }
            }
            else {
                if (action.payload.direction == ship.directions.horizontal) {
                    directions = { ...ship.directions, horizontal: action.payload.direction };
                }
                if (action.payload.direction == ship.directions.vertical) {
                    directions = { ...ship.directions, vertical: action.payload.direction };
                }
            }

            const updatedShip = { ...ship, directions };

            return { ...state, ships: state.ships.filter(x => x != ship).concat(updatedShip) };
        }
        default:
            return state;
    }
}