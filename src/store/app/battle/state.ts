import { Ship } from "./ship";
import { Projectile } from "./projectile";
import { Size } from "store/app/battle/size";
import { Time } from "store/app/battle/time";

export interface BattleState {
    elapsedTime: Time,
    fieldSize: Size,
    projectiles: Projectile[],
    ships: Ship[],
}
