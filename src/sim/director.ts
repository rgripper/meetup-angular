import { Rectangle } from './rectangle';
import { ShipCreator } from './ship-factory';
import { Time } from "sim/time";
import { Ship } from "sim/ship";
import { Size } from "sim/size";
import { Position } from "sim/position";

export interface Wave {
    order: number,
    completionTime?: Time
}

type WaveAndShips = { wave: Wave, ships: Ship[] };

export class Director {

    private static enemyPlayerId = 2;

    private static gracePeriod = 5000;

    static tryCreateNextWave(field: Rectangle, lastWave: Wave | undefined, currentTime: Time): WaveAndShips | undefined {
        //console.log('last wave', lastWave);
        if (lastWave != undefined) {
            if (lastWave.completionTime == undefined) return;
            if (currentTime - lastWave.completionTime < this.gracePeriod) {
                console.log('grace period', currentTime, lastWave.completionTime, this.gracePeriod);
                return;
            }
        }
//console.log('new wave');
        const newOrder = (lastWave ? lastWave.order : 0) + 1;
        return { wave: { order: newOrder }, ships: this.createShipsForComplexity(newOrder, field) };
    }

    private static createShipsForComplexity(order: number, field: Rectangle): Ship[] {
        const maxSize = { width: 40, height: 40 };
        return this.createPositions(order, field, maxSize).map(position => {
            const size = maxSize;
            return ShipCreator.create(20 + order, order, this.enemyPlayerId, position, size);
        });
    }

    private static createPositions(shipCount: number, field: Rectangle, shipSize: Size): Position[] {
        const offset = (field.size.height - shipCount * shipSize.height) / (shipCount + 1);
        return new Array(shipCount).fill(null).map((_x, i) => ({
            x: field.position.x + field.size.width - shipSize.width,
            y: offset * (i + 1) + shipSize.height * i,
        } as Position));
    }
}