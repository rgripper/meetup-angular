import { Component, Input } from "@angular/core";
import { Ship } from "app/game/ship";

@Component({})
export class ShipComponent {
    
    @Input()
    ship: Ship;
}