import Two from "two.js";
import type { Shape } from "two.js/src/shape";
import type { Vector } from "two.js/src/vector";

const SHIP_COLOR = "gray";

class Entity {
  private _shape: Shape;
  mass: number;
  velocity: Vector;
  acceleration: Vector;

  constructor(shape: Shape, mass: number = 10) {
    this._shape = shape;
    this.mass = mass;
    this.velocity = new Two.Vector(0, 0);
    this.acceleration = new Two.Vector(0, 0);
  }

  get shape() {
    return this._shape;
  }

  get translation() {
    return this._shape.translation;
  }

  set translation(position: Vector) {
    this._shape.translation = position;
  }

  get rotation() {
    return this._shape.rotation;
  }

  set rotation(rotation: number) {
    this._shape.rotation = rotation;
  }

  applyForce(force: Vector) {
    // F = ma => a = F/m
    const acceleration = force.clone().divideScalar(this.mass);
    this.acceleration.add(acceleration);
  }

  update() {
    // Update velocity by acceleration
    this.velocity.add(this.acceleration);

    // Update position by velocity
    this.translation.add(this.velocity);

    // Reset acceleration
    this.acceleration.set(0, 0);
  }
}

interface ShipParams {
  x: number;
  y: number;
}

export class Ship extends Entity {
  public static make(params: ShipParams) {
    const ship = new Two.Group();
    ship.position.set(params.x, params.y);
    ship.scale = 0.2;

    const wing = new Two.Polygon(-25, 25, 30, 3);
    wing.fill = SHIP_COLOR;
    ship.add(wing);

    const wing2 = new Two.Polygon(25, 25, 30, 3);
    wing2.fill = SHIP_COLOR;
    ship.add(wing2);

    const flame = new Two.Path([
      new Two.Anchor(-25, 50),
      new Two.Anchor(25, 50),
      new Two.Anchor(0, 100),
    ]);
    flame.fill = "orange";
    ship.add(flame);

    const thruster = new Two.Path([
      new Two.Anchor(-25, 50),
      new Two.Anchor(25, 50),
      new Two.Anchor(35, 75),
      new Two.Anchor(-35, 75),
    ]);
    thruster.fill = SHIP_COLOR;
    ship.add(thruster);

    const nose = new Two.Polygon(0, -65, 30, 3);
    nose.fill = SHIP_COLOR;
    ship.add(nose);

    // Rectangle x and y is the center of the rectangle
    const body = new Two.Rectangle(0, 0, 50, 100);
    body.fill = SHIP_COLOR;
    ship.add(body);

    const viewport = new Two.Circle(0, 0, 10);
    viewport.fill = "white";
    ship.add(viewport);

    return new Ship(ship, Math.random() * 100);
  }
}
