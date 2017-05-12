import { BattleState } from 'sim/state';
import { Time } from "./time";
import { StateUpdater, applyUpdaters, performCollisions, performPositioning, performShooting, performWaveGeneration } from "sim/updaters";

const updaters: StateUpdater[] = [
    performCollisions, performPositioning, performShooting, performWaveGeneration
];

export function runCycle(state: BattleState, interval: Time): BattleState {
    return { 
        ...applyUpdaters(state, updaters), 
        elapsedTime: state.elapsedTime + interval 
    };
}