import { Component, Input } from "@angular/core";
import { Ship } from "app/battle/ship";

@Component({})
export class ShipComponent {
    
    @Input()
    ship: Ship;
}