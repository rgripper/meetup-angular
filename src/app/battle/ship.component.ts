import { Component, Input } from "@angular/core";
import { Ship } from "sim/ship";

@Component({})
export class ShipComponent {
    
    @Input()
    ship: Ship;
}