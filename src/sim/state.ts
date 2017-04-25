import { Rectangle } from 'sim/rectangle';
import { Ship } from "sim/ship";
import { Projectile } from "sim/projectile";
import { Time } from "sim/time";

export interface BattleState {
    elapsedTime: Time,
    field: Rectangle,
    projectiles: Projectile[],
    ships: Ship[],
}
