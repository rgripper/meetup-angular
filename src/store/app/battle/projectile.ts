import { Ship } from "./ship";
import { Moveable } from "store/app/battle/moveable";

export interface Projectile extends Moveable {
    id: number,
    ship: Ship,
}