import { Weapon } from './weapon';
import { Moveable } from './moveable';
import { Projectile } from './projectile';
import { BattleState } from 'sim/state';
import { Position } from "./position";
import { Ship, WeaponMount } from "./ship";
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

function inflictDamage(projectile: Projectile, ship: Ship): Ship {
    return {
        ...ship,
        health: {
            maximum: ship.health.maximum,
            current: Math.max(0, ship.health.current - projectile.damage)
        }
    }
}

function collideProjectileWithAnyShip(projectile: Projectile, ships: Ship[]): { affectedShip?: Ship, unaffectedShips: Ship[] } {
    const index = ships.findIndex(ship => ship.health.current > 0 && Rectangle.intersect(projectile, ship));
    if (index < 0) return { unaffectedShips: ships };
    const affectedShip = inflictDamage(projectile, ships[index]);
    return { affectedShip, unaffectedShips: ships.splice(index, 1) };
}

function collideProjectilesWithShips(projectiles: Projectile[], ships: Ship[]): { unaffectedProjectiles: Projectile[], unaffectedShips: Ship[] } {
    let unaffectedShips = ships;
    const unaffectedProjectiles = projectiles.filter(proj => {
        const result = collideProjectileWithAnyShip(proj, unaffectedShips);
        unaffectedShips = result.unaffectedShips;
        const unaffected = result.affectedShip == undefined;
        return unaffected;
    });

    return { unaffectedProjectiles, unaffectedShips };
}

function updatePosition<T extends Moveable>(moveable: T): T {
    return Object.assign(moveable, { position: getNextPosition(moveable) });
}

function updateShipPosition(ship: Ship, field: Rectangle): Ship {
    return updatePositionWithinBox(ship, getNextPosition(ship), field);
}

let newProjectileId = 1;

function createProjectile(ship: Ship, weaponMount: WeaponMount): Projectile {
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
        directions: { horizontal: ship.weaponMount.direction },
        damage: weaponMount.weapon.damage
    }
}

export function runCycle(state: BattleState, interval: Time): BattleState {
    const movedShips = state.ships.map(x => updateShipPosition(x, state.field));
    const newProjectiles = movedShips.filter(ship => ship.isShooting).map(ship => createProjectile(ship, ship.weaponMount)).filter(x => Rectangle.within(x, state.field));
    const updatedProjectiles = state.projectiles.map(x => updatePosition(x)).filter(x => Rectangle.within(x, state.field));
    const allProjectiles = updatedProjectiles.concat(newProjectiles);

    const collisionResults = collideProjectilesWithShips(allProjectiles, movedShips);

    return { 
        ...state, 
        elapsedTime: state.elapsedTime + interval, 
        ships: collisionResults.unaffectedShips, 
        projectiles: collisionResults.unaffectedProjectiles 
    };
}