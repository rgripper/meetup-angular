import { Component, Input } from "@angular/core";
import { Ship } from "store/app/battle/ship";

@Component({})
export class ShipComponent {
    
    @Input()
    ship: Ship;
}