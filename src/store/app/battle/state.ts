import { Ship } from "./ship";
import { Projectile } from "./projectile";

export interface BattleState {
    projectiles: Projectile[];
    ships: Ship[];
}
