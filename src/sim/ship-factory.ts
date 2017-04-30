import { Direction } from './direction';
import { Ship } from "sim/ship";
import { Position } from "sim/position";

export class ShipCreator {
    private static latestShipId = 0;

    static create(health: number, damage: number, playerId: number, position: Position): Ship {
        this.latestShipId++;
        return {
            id: this.latestShipId,
            directions: {},
            health: { current: health, maximum: health },
            isShooting: false,
            playerId,
            position,
            size: { width: 60, height: 60 },
            speed: 4,
            weaponMount: {
                direction: Direction.Right,
                weapon: { id: 1, damage }
            }
        }
    }
}