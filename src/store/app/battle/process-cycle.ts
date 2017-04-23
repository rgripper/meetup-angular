import { Moveable } from './moveable';
import { Projectile } from './projectile';
import { BattleState } from './state';
import { Position } from "./position";
import { Ship } from "store/app/battle/ship";
import { Direction } from "store/app/battle/direction";
import { Size } from "store/app/battle/size";
import { Time } from "store/app/battle/time";


function getNextPosition<T extends Moveable>(moveable: T): Position {
    let x = moveable.position.x;
    if (moveable.directions.horizontal == Direction.Left) {
        x -= moveable.speed;
    }
    else if (moveable.directions.horizontal == Direction.Right) {
        x += moveable.speed;
    }

    let y = moveable.position.y;
    if (moveable.directions.vertical == Direction.Up) {
        y -= moveable.speed;
    }
    else if (moveable.directions.vertical == Direction.Down) {
        y += moveable.speed;
    }

    return {x, y};
}

function updatePosition<T extends Moveable>(moveable: T, fieldSize: Size): T {
    const nextPosition = getNextPosition(moveable);

    return Object.assign(moveable, { 
            position: { 
                x: Math.min(fieldSize.width - moveable.size.width, Math.max(0, nextPosition.x)),
                y: Math.min(fieldSize.height - moveable.size.height, Math.max(0, nextPosition.y)) 
            } 
        });
}

function isOutOfBorder<T extends Moveable>(moveable: T, fieldSize: Size): boolean {
    const nextPosition = getNextPosition(moveable);

    const width = moveable.size.width;
    const overflowByX: boolean = nextPosition.x < width || nextPosition.x > fieldSize.width - width;

    const height = moveable.size.height;
    const overflowByY: boolean = nextPosition.y < height || nextPosition.y > fieldSize.height - height;

    return overflowByX || overflowByY;
}


function updateShip(ship: Ship, fieldSize: Size): Ship {
    return updatePosition(ship, fieldSize);
}

let newProjectileId = 1;

function createProjectile(ship: Ship): Projectile {
    // TODO: add id
    const size = { width: 5, height: 5 };
    return {
        id: newProjectileId++,
        ship,
        position: { 
            x: ship.position.x + (ship.weaponMount.direction == Direction.Left ? -size.width : ship.size.width), 
            y: ship.position.y + Math.round((ship.size.height / 2) - (size.height / 2))
        },
        size,
        speed: 5,
        directions: { horizontal: ship.weaponMount.direction }
    }
}

function updateProjectile(projectile: Projectile, fieldSize: Size): Projectile {
    return updatePosition(projectile, fieldSize);
}

export function runCycle(state: BattleState, interval: Time): BattleState {
    const ships = state.ships.map(x => updateShip(x, state.fieldSize));
    const newProjectiles = ships.filter(ship => ship.isShooting).map(createProjectile);
    const updatedProjectiles = state.projectiles.filter(x => !isOutOfBorder(x, state.fieldSize)).map(x => updateProjectile(x, state.fieldSize));
    return { ...state, elapsedTime: state.elapsedTime + interval, ships, projectiles: updatedProjectiles.concat(newProjectiles) };
}