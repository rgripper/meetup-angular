import { Moveable } from './moveable';
import { Projectile } from './projectile';
import { BattleState } from 'sim/state';
import { Position } from "./position";
import { Ship, WeaponMount } from "./ship";
import { Direction } from "./direction";
import { Time } from "./time";
import { Rectangle } from "./rectangle";
import { Director } from "sim/director";

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
    const ship = ships.find(ship => ship.health.current > 0 && Rectangle.intersect(projectile, ship));
    if (ship == undefined) return { unaffectedShips: ships };
    const affectedShip = inflictDamage(projectile, ship);
    return { affectedShip, unaffectedShips: ships.filter(x => x != ship) };
}

function collideProjectilesWithShips(projectiles: Projectile[], ships: Ship[]): { unaffectedProjectiles: Projectile[], unaffectedShips: Ship[], affectedShips: Ship[] } {
    let unaffectedShips = ships;
    const affectedShips: Ship[] = [];
    const unaffectedProjectiles = projectiles.filter(proj => {
        const result = collideProjectileWithAnyShip(proj, unaffectedShips);
        if (result.affectedShip) affectedShips.push(result.affectedShip);
        unaffectedShips = result.unaffectedShips;
        const projectileIsUnaffected = result.affectedShip == undefined;
        return projectileIsUnaffected;
    });

    return { unaffectedProjectiles, unaffectedShips, affectedShips };
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
    
    const collisionResults = collideProjectilesWithShips(state.projectiles, movedShips);
    const updatedProjectiles = collisionResults.unaffectedProjectiles.map(x => updatePosition(x)).filter(x => Rectangle.within(x, state.field));
    const allProjectiles = updatedProjectiles.concat(newProjectiles);

    const waveResult = Director.tryCreateNextWave(state.field, state.latestWave, state.elapsedTime);
    //console.log('waveResult', waveResult);
    

    if (collisionResults.unaffectedShips.length != movedShips.length) console.log(collisionResults);
    const remainedShips = collisionResults.unaffectedShips.concat(collisionResults.affectedShips.filter(x => x.health.current > 0));
    const ships = waveResult ? remainedShips.concat(waveResult.ships) : remainedShips;
    //console.log('new state', ships);
    return {
        ...state,
        latestWave: waveResult ? waveResult.wave : state.latestWave,
        elapsedTime: state.elapsedTime + interval,
        ships,
        projectiles: allProjectiles
    };
}