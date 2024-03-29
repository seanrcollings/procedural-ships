import Two from "two.js";
import type { StarEntity } from "./entities";
import type { Ship } from "./ship/ship";
import type { Coordinates } from "./types";

export class World {
  private two: Two;
  ships: Ship[];
  stars: StarEntity[];

  constructor(element: HTMLElement, params = {}) {
    this.ships = [];
    this.stars = [];
    this.two = new Two(params);
    this.two.appendTo(element);
  }

  get height() {
    return this.two.height;
  }

  get width() {
    return this.two.width;
  }

  public addShip(ship: Ship, position: Coordinates) {
    this.ships.push(ship);
    ship.position.set(position.x, position.y);
    this.two.add(ship.shape);
  }

  public addStar(star: StarEntity, position: Coordinates) {
    this.stars.push(star);
    star.position.set(position.x, position.y);
    this.two.add(star.shape);
  }

  public bind(
    event: string,
    callback: (frame: number, frametime: number) => void
  ) {
    this.two.bind(event, callback);
  }

  public play() {
    this.two.play();
  }

  public update() {
    this.two.update();
  }
}
