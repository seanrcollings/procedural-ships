import Two from "two.js";
import type { Shape } from "two.js/src/shape";

// Possible colors the ship can be
const COLORS = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "violet",
  "gray",
];

class ShipComponent {
  private _shape: Shape;
  mass: number;

  constructor(shape: Shape, mass: number) {
    this._shape = shape;
    this.mass = mass;
  }

  get shape() {
    return this._shape;
  }
}

class ShipBody extends ShipComponent {
  public static make() {
    const body = new Two.Rectangle(0, 0, 50, 100);
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    body.fill = color;
    body.stroke = color;
    return new ShipBody(body, 10);
  }
}

class ShipWing extends ShipComponent {
  public static make() {
    const wing = new Two.Polygon(-25, 25, 30, 3);
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    wing.fill = color;
    wing.stroke = color;
    return new ShipWing(wing, 10);
  }
}
