import { Position } from './position';
import { Ship } from "./ship";

export interface Projectile {
    id: number,
    ship: Ship,
    poition: Position
}