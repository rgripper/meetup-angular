import { Action } from "@ngrx/store";
import { BattleState } from "./state";

export function battleReducer(state: BattleState, action: Action): BattleState {
    switch (action.type) {
        default:
            return state;
    }
}