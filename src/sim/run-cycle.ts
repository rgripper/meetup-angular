import { BattleState } from 'sim/state';
import { Time } from "./time";
import { StateUpdater, applyUpdaters, performCollisions, performPositioning, performShooting, performWaveGeneration, performShipEmergence, performCompletionCheck } from "sim/updaters";

const updaters: StateUpdater[] = [
    performCollisions, performPositioning, performShipEmergence, performShooting, performWaveGeneration, performCompletionCheck
];

export function runCycle(state: BattleState, interval: Time): BattleState {
    if (state.isCompleted) return state;
    return { 
        ...applyUpdaters(state, updaters), 
        elapsedTime: state.elapsedTime + interval 
    };
}