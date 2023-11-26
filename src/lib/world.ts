import Two from "two.js";
import type { Ship, StartEntity } from "./entities";

export class World {
  private two: Two;
  ships: Ship[];
  stars: StartEntity[];

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

  public addShip(ship: Ship) {
    this.ships.push(ship);
    this.two.add(ship.shape);
  }

  public addStar(star: StartEntity) {
    this.stars.push(star);
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
}
