import { Ship } from "./ship";
import { Projectile } from "./projectile";

export interface BattleState {
    playerShip: Ship;
    projectiles: Projectile[];
    monsterShips: Ship[];
}
