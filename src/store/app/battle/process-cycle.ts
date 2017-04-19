import { Projectile } from './projectile';
import { BattleState } from './state';
import { Ship } from "store/app/battle/ship";
import { Direction } from "store/app/battle/direction";
import { Size } from "store/app/battle/size";

function updatePosition(ship: Ship, fieldSize: Size): Ship {
    let x = ship.position.x;
    if (ship.directions.horizontal == Direction.Left) {
        x -= ship.speed;
    }
    else if (ship.directions.horizontal == Direction.Right) {
        x += ship.speed;
    }

    let y = ship.position.y;
    if (ship.directions.vertical == Direction.Up) {
        y -= ship.speed;
    }
    else if (ship.directions.vertical == Direction.Down) {
        y += ship.speed;
    }

    return { ...ship, position: { x: Math.min(fieldSize.width, Math.max(0, x)), y: Math.min(fieldSize.height, Math.max(0, y)) } };
}


function updateShip(ship: Ship, fieldSize: Size): Ship {
    return updatePosition(ship, fieldSize);
}

let newProjectileId = 1;

function createProjectile(ship: Ship): Projectile {
    // TODO: add id
    return {
        id: newProjectileId++,
        ship,
        position: ship.position,
        size: { width: 5, height: 5 }
    }
}

function updateProjectile(projectile: Projectile): Projectile {
    return projectile;
}

export function runCycle(state: BattleState): BattleState {
    const ships = state.ships.map(x => updateShip(x, state.fieldSize));
    const newProjectiles = ships.filter(ship => ship.isShooting).map(createProjectile);
    const updatedProjectiles = state.projectiles.map(updateProjectile);
    return { ...state, ships, projectiles: updatedProjectiles.concat(newProjectiles) };
}