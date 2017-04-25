import { Moveable } from './moveable';
import { Projectile } from './projectile';
import { BattleState } from 'sim/state';
import { Position } from "./position";
import { Ship } from "./ship";
import { Direction } from "./direction";
import { Time } from "./time";
import { Rectangle } from "./rectangle";

function getNextPosition(moveable: Moveable): Position {
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

    return { x, y };
}

function updatePositionWithinBox<T extends Moveable>(moveable: T, nextPosition: Position, boundingBox: Rectangle): T {
    const overflowsX = nextPosition.x < boundingBox.position.x || nextPosition.x + moveable.size.width > (boundingBox.position.x + boundingBox.size.width);
    const overflowsY = nextPosition.y < boundingBox.position.y || nextPosition.y + moveable.size.height > (boundingBox.position.y + boundingBox.size.height);
    return Object.assign(moveable, {
        position: {
            x: overflowsX ? moveable.position.x : nextPosition.x,
            y: overflowsY ? moveable.position.y : nextPosition.y,
        }
    });
}

function updatePosition<T extends Moveable>(moveable: T): T {
    return Object.assign(moveable, { position: getNextPosition(moveable) });
}

function updateShip(ship: Ship, field: Rectangle): Ship {
    return updatePositionWithinBox(ship, getNextPosition(ship), field);
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

export function runCycle(state: BattleState, interval: Time): BattleState {
    const ships = state.ships.map(x => updateShip(x, state.field));
    const newProjectiles = ships.filter(ship => ship.isShooting).map(createProjectile).filter(x => Rectangle.within(x, state.field));
    const updatedProjectiles = state.projectiles.map(x => updatePosition(x)).filter(x => Rectangle.within(x, state.field));

    return { ...state, elapsedTime: state.elapsedTime + interval, ships, projectiles: updatedProjectiles.concat(newProjectiles) };
}