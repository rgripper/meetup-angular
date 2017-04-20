import { Direction } from "store/app/battle/direction";
import { Moveable } from "store/app/battle/moveable";

export interface Ship extends Moveable {
    id: number,
    playerId: number,

    isShooting: boolean
    weaponMount: {
        direction: Direction.Left | Direction.Right
    }
}