import { Ship } from "./ship";
import { Moveable } from "./moveable";

export interface Projectile extends Moveable {
    id: number,
    ship: Ship,
    damage: number
}