import { Direction } from "./direction";
import { Moveable } from "./moveable";

export interface Ship extends Moveable {
    id: number,
    playerId: number,

    isShooting: boolean
    weaponMount: {
        direction: Direction.Left | Direction.Right
    }
}