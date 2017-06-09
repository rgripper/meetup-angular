import { Rectangle } from 'sim/rectangle';
import { Ship } from "sim/ship";
import { Projectile } from "sim/projectile";
import { Time } from "sim/time";
import { Wave } from "sim/director";

export interface BattleState {
    readonly maxNumberOfWaves: number,
    isCompleted: boolean,
    elapsedTime: Time,
    latestWave: Wave | undefined,
    field: Rectangle,
    projectiles: Projectile[],
    ships: Ship[],
    playerScores: { playerId: number, score: number }[],
}
