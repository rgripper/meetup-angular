import { Moveable } from './moveable';
import { Projectile } from './projectile';
import { BattleState } from 'sim/state';
import { Position } from "./position";
import { Ship } from "./ship";
import { Direction } from "./direction";
import { Rectangle } from "./rectangle";
import { Director } from "sim/director";

type StateUpdater = (state: BattleState) => BattleState;
export function applyUpdaters(state: BattleState, updaters: StateUpdater[]): BattleState {
    let updatedState = state;
    updaters.forEach(updater => updater(updatedState));
    return updatedState;
}

export function performWaveGeneration(state: BattleState): BattleState {
    const nextWaveResult = Director.tryCreateNextWave(state.field, state.latestWave, state.elapsedTime);
    if (nextWaveResult != undefined) {
        return {
            ...state,
            latestWave: nextWaveResult.wave,
            ships: state.ships.concat(nextWaveResult.ships)
        };
    }
    else {
        const waveIsNotCompleted = (s: BattleState) => s.latestWave && s.latestWave.completionTime != undefined;
        const waveHasShips = (s: BattleState) => s.ships.filter(x => x.playerId == 2).length > 0;
        const waveRequiresCompletion = waveIsNotCompleted(state) || waveHasShips(state);
        if (waveRequiresCompletion) {
            return {
                ...state,
                latestWave: { ...state.latestWave, completionTime: state.elapsedTime }
            };
        }
        else {
            return state;
        }
    }
}

export function performPositioning(state: BattleState): BattleState {
    const ships = state.ships.map(x => updatePositionWithinBox(x, getNextPosition(x), state.field));
    const projectiles = state.projectiles.map(x => updatePosition(x)).filter(x => Rectangle.within(x, state.field));
    return { ...state, ships, projectiles };
}

export function performShooting(state: BattleState): BattleState {
    const collisionResults = collideWith(state.projectiles, state.ships, hit);
    const remainedShips = collisionResults.unaffectedShips.concat(collisionResults.affectedShips.filter(x => x.health.current > 0));
    return { ...state, ships: remainedShips, projectiles: collisionResults.unaffectedProjectiles };
}

export function performCollisions(state: BattleState): BattleState {
    const collisionResults = collideWith(state.projectiles, state.ships, hit);
    const remainedShips = collisionResults.unaffectedShips.concat(collisionResults.affectedShips.filter(x => x.health.current > 0));
    return { ...state, ships: remainedShips, projectiles: collisionResults.unaffectedProjectiles };
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

function hit(ship: Ship, projectile: Projectile): Ship {
    return {
        ...ship,
        health: {
            maximum: ship.health.maximum,
            current: Math.max(0, ship.health.current - projectile.damage)
        }
    }
}

function collideWith(projectiles: Projectile[], ships: Ship[], hit: (ship: Ship, projectile: Projectile) => Ship): { unaffectedProjectiles: Projectile[], unaffectedShips: Ship[], affectedShips: Ship[] } {
    const affectedShips: Ship[] = [];
    let unaffectedShips = ships;
    const unaffectedProjectiles = projectiles.filter(projectile => {
        const collisionShip = findCollisionShip(projectile, unaffectedShips);
        if (collisionShip) {
            affectedShips.push(hit(collisionShip, projectile));
            unaffectedShips = unaffectedShips.filter(x => x.id != collisionShip.id);
        }
        return collisionShip == undefined;
    });

    return {
        unaffectedProjectiles,
        unaffectedShips,
        affectedShips
    };
}

function findCollisionShip(projectile: Projectile, ships: Ship[]): Ship | undefined {
    return ships.find(ship => ship.health.current > 0 && Rectangle.intersect(projectile, ship));
}

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