import { Rectangle } from './rectangle';
import { ShipCreator } from './ship-factory';
import { Time } from "sim/time";
import { Ship } from "sim/ship";

export interface Wave {
    order: number,
    completionTime?: Time
}

type WaveAndShips = { wave: Wave, ships: Ship[] };

export class Director {

    private static enemyPlayerId = 2;

    private static gracePeriod = 5000;

    static tryCreateNextWave(field: Rectangle, lastWave: Wave | undefined, currentTime: Time): WaveAndShips | undefined {
        if (lastWave != undefined && (lastWave.completionTime == undefined || lastWave.completionTime - currentTime > this.gracePeriod)) {
            return;
        }

        const newOrder = (lastWave ? lastWave.order : 0) + 1;
        return { wave: { order: newOrder }, ships: this.createShipsForComplexity(newOrder, field) };
    }

    private static createShipsForComplexity(order: number, field: Rectangle): Ship[] {
        return new Array(order).fill(null).map(() => {
            const position = { x: field.size.width - 20, y: Math.ceil(field.size.height / 2) };
            return ShipCreator.create (20 + order, order, this.enemyPlayerId, position);
        });
    }
}