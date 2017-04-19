import { Ship } from "./ship";
import { Projectile } from "./projectile";
import { Size } from "store/app/battle/size";

export interface BattleState {
    fieldSize: Size,
    projectiles: Projectile[],
    ships: Ship[],
}
