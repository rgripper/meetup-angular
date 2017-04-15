import { Position } from './position';
import { Ship } from "app/game/ship";

export interface Projectile {
    ship: Ship;
    poition: Position;
}