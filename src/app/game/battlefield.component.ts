import { Projectile } from './projectile';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { Observable } from "rxjs";
import { Ship } from "app/game/ship";
import { Position } from './position';

@Component({})
export class BattlefieldComponent {

    ships$: Observable<Ship[]>;

    projectiles$: Observable<Projectile[]>;

    constructor(private sanitizer: DomSanitizer) {
        this.ships$ = Observable
            .interval(50)
            .map(n => [
                {
                    id: 1,
                    userId: 1,
                    position: { x: 10, y: 10 }
                },
                {
                    id: 2,
                    userId: 2,
                    position: { x: n * 5, y: n * 5 }
                }
            ])
            .scan((acc, value) => value.map(x2 => ({
                ...x2,
                angle: acc.length ? this.getAngle(x2.position, acc.find(x1 => x1.id == x2.id)!.position) : 0
            })), []);

        this.projectiles$ = <any>Observable
            .interval(50)
            .map(n => [
                {
                    id: 1,
                    position: { x: 110, y: 110 }
                },
                {
                    id: 2,
                    position: { x: n * 15, y: n * 15 }
                }
            ]);
            // .scan((acc, value) => value.map(x2 => ({
            //     ...x2,
            //     angle: acc.length ? this.getAngle(x2.position, acc.find(x1 => x1.id == x2.id)!.position) : 0
            // })), []);
    }

    private getAngle(position1: Position, position2: Position) {
        return Math.atan2(position2.y - position1.y, position2.x - position1.x) * 180 / Math.PI - 90;
    }

    trackById(_index: number, item: { id: number }) {
        return item.id;
    }

    getTransform(ship: Ship) {
        return this.sanitizer.bypassSecurityTrustStyle(`rotate(${ship.angle}deg) translate(${ship.position.x}px,${ship.position.y}px)`);
    }
}