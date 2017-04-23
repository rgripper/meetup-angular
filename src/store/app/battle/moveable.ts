import { Size } from "store/app/battle/size";
import { Direction } from "store/app/battle/direction";
import { Position } from "store/app/battle/position";

export interface Moveable {
    position: Position,
    size: Size,
    speed: number,
    directions: { vertical?: Direction.Up | Direction.Down, horizontal?: Direction.Left | Direction.Right }
}
