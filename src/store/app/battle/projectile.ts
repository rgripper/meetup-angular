import { Position } from './position';
import { Ship } from "./ship";
import { Size } from "store/app/battle/size";

export interface Projectile {
    id: number,
    ship: Ship,
    position: Position,
    size: Size
}