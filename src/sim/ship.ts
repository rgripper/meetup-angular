import { Direction } from "./direction";
import { Moveable } from "./moveable";
import { Weapon } from "./weapon";

export interface WeaponMount {
    direction: Direction.Left | Direction.Right,
    weapon: Weapon
}

export interface Ship extends Moveable {
    id: number,
    playerId: number,
    health: { maximum: number, current: number },
    emergence: number,
    isShooting: boolean,
    scoreOnDestruction: number,
    weaponMount: WeaponMount
}