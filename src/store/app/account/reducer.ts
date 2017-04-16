import { Action } from '@ngrx/store';
import { AccountState } from "./state";

export function accountReducer(state: AccountState, action: Action): AccountState {
    switch (action.type) {
        default:
            return state;
    }
}