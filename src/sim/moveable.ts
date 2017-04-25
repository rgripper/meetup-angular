import { Rectangle } from './rectangle';
import { Direction } from "./direction";

export interface Moveable extends Rectangle {
    speed: number,
    directions: { vertical?: Direction.Up | Direction.Down, horizontal?: Direction.Left | Direction.Right }
}
