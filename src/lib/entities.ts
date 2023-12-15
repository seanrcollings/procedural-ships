import Two from "two.js";
import type { Shape } from "two.js/src/shape";
import type { Vector } from "two.js/src/vector";

export class Entity {
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

  get position() {
    return this._shape.position;
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

    // Reset acceleration for next frame
    this.acceleration.set(0, 0);
  }
}

interface StarParams {
  size: number;
}

export class StarEntity extends Entity {
  public static make({ size }: StarParams) {
    const star = new Two.Star(0, 0, size / 2, size);
    star.fill = "white";
    star.noStroke();
    return new StarEntity(star);
  }
}
