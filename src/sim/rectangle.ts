import { Size } from "./size";
import { Position } from "./position";

export interface Rectangle {
    position: Position,
    size: Size
}

export class Rectangle {
    static intersect(rectangle1: Rectangle, rectangle2: Rectangle): boolean {

        return rectangle2.position.x < rectangle1.position.x + rectangle1.size.width
            && rectangle1.position.x < rectangle2.position.x + rectangle2.size.width
            && rectangle2.position.y < rectangle1.position.y + rectangle1.size.height
            && rectangle1.position.y < rectangle2.position.y + rectangle2.size.height;
    }

    static within(rectangle: Rectangle, boundingBox: Rectangle): boolean {
        return boundingBox.position.x < rectangle.position.x
            && rectangle.position.x + rectangle.size.width < boundingBox.position.x + boundingBox.size.width
            && boundingBox.position.y < rectangle.position.y
            && rectangle.position.y + rectangle.size.height < boundingBox.position.y + boundingBox.size.height;
    }
}