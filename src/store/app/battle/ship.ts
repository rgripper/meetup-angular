import { Position } from './position';
import { Size } from "store/app/battle/size";
import { Direction } from "store/app/battle/direction";

export interface Ship {
    id: number,
    playerId: number,
    position: Position,
    size: Size,
    speed: number,
    directions: { vertical?: Direction.Up | Direction.Down, horizontal?: Direction.Left | Direction.Right }
}