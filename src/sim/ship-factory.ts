import { Direction } from './direction';
import { Ship } from "sim/ship";
import { Position } from "sim/position";
import { Size } from "sim/size";

export class ShipCreator {
    private static latestShipId = 0;

    static create(health: number, damage: number, playerId: number, position: Position, size: Size): Ship {
        this.latestShipId++;
        return {
            id: this.latestShipId,
            directions: {},
            health: { current: health, maximum: health },
            isShooting: false,
            playerId,
            position,
            size,
            speed: 4,
            emergence: 0,
            weaponMount: {
                direction: Direction.Right,
                weapon: { id: 1, damage }
            }
        }
    }
}