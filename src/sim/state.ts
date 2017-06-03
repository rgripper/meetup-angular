import { Rectangle } from 'sim/rectangle';
import { Ship } from "sim/ship";
import { Projectile } from "sim/projectile";
import { Time } from "sim/time";
import { Wave } from "sim/director";

export interface BattleState {
    elapsedTime: Time,
    latestWave?: Wave,
    field: Rectangle,
    projectiles: Projectile[],
    ships: Ship[],
    playerScores: { playerId: number, score: number }[],
}
