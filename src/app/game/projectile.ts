import { Position } from './position';
import { Ship } from "app/game/ship";

export interface Projectile {
    id: number,
    ship: Ship,
    poition: Position
}